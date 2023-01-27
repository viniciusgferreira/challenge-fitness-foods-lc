import * as https from 'https';
import fs from 'fs';
import path from 'path';
import * as readline from 'readline/promises';
import * as zlib from 'zlib';
import { createProductObj } from '../api/v1/models/createProductObj.js';
import { saveImportInfo } from './saveImportInfo.js';
import { importFromFiles } from './importFromFiles.js';

const tmpDir = process.cwd() + '/src/utils/tmp/';
const baseURL = 'https://challenges.coode.sh/food/data/json/';
const indexFile = 'index.txt';
const importInfo = {};

// SET TIME OF IMPORT
const imported_t = new Date().toISOString();

//await importProducts(); // APAGAR


async function downloadFile(url) {
  const filename = path.basename(url);
  const fileStream = fs.createWriteStream(tmpDir + filename);
  console.log(`trying to download ${filename}`);

  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode >= 400) {
        console.log('failed to download: ' + response.statusMessage);
        fs.unlink(filename, (err) => {
          if (err) throw err;
        });
        return reject;
      }

      response.pipe(fileStream);

      response.on('end', () => {
        console.log(`${filename} dowloaded sucessfully.`);
        return resolve(true);
      });

      response.on('error', (err) => {
        console.log(err);
        return reject(err);
      });
    });
  });

}


async function getListToDownload(file) {
  const list = [];
  return new Promise((resolve, reject) => {

    try {
      const readInterface = readline.createInterface({
        input: fs.createReadStream(tmpDir + file)
      });

      readInterface.on('line', function (line) {
        list.push(line);
      });

      readInterface.on('close', () => {
        return resolve(list);
      });

    } catch (err) {
      return reject(err);
    }
  });
}

function createDownloadRequests(list) {
  const requests = [];
  for (let i = 0; i < list.length; i++) {
    requests.push(downloadFile(baseURL + list[i]));
  }
  return requests;
}

async function extractFile(filename) {

  const inputFile = fs.createReadStream(tmpDir + filename);
  const outputFile = fs.createWriteStream(tmpDir + filename.substring(0, filename.length - 3));

  return new Promise((resolve) => {
    inputFile.pipe(zlib.createGunzip()).pipe(outputFile);

    outputFile.on('finish', () => {
      console.log(filename + ' finished extraction');
      return resolve(true);
    });

  });

}

async function get100ProductsFromFile(extractedfilename) {
  let products = [];
  let lineCounter = 0;


  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: fs.createReadStream(tmpDir + extractedfilename)
    });

    rl.on('line', (obj) => {
      if (lineCounter < 4) {
        lineCounter++;
        products.push(JSON.parse(obj));
        console.log('lendo linha');
      } else {
        console.log('close linha');
        rl.close();
        rl.removeAllListeners();
      }
    });

    rl.on('close', () => {
      console.log('close event');
      return resolve(products);
    });

  });
}

export default async function importProducts() {

  try {
    console.log('Initiating scheduled import to update Products database');
    console.log('imported time: ' + imported_t);

    // DOWNLOAD INDEX FILE
    //await downloadFile(baseURL + indexFile);
    const list = await getListToDownload(indexFile, baseURL);
    // DOWNLOAD ALL FILES
    const requests = createDownloadRequests(list);
    await Promise.all(requests);

    // EXTRACT FILES
    const requestExtraction = [];
    const extractedList = [];
    for (let i = 0; i < list.length; i++) {
      console.log('extracting ' + list[i]);
      requestExtraction.push(extractFile(list[i]));
      // REMOVE .gz extension from list
      extractedList.push(list[i].substring(0, list[i].length - 3));
    }
    await Promise.all(requestExtraction);
    console.log('extraction complete');

    // GET 100 PRODUCTS
    let productsToImport = [];
    for (let i = 0; i < extractedList.length; i++) {
      console.log('getting first 100 products from ' + extractedList[i]);
      const productsPerFile = await get100ProductsFromFile(extractedList[i]);
      console.log('finished get 100 from ' + extractedList[i]);
      for (let i = 0; i < productsPerFile.length; i++) {
        productsPerFile[i].imported_t = imported_t;
        productsPerFile[i].status = 'published';
        const prodObj = await createProductObj(productsPerFile[i]);
        productsToImport.push(prodObj);
      }
    }
    console.log(productsToImport.length + ' products to be imported');

    // UPDATE TO DB IF EXISTS OR CREATE NEW PRODUCT
    await importFromFiles(productsToImport);

    // SAVE IMPORT INFO
    importInfo.imported_t = imported_t;
    importInfo.imported_files = list;
    await saveImportInfo(importInfo);

    console.log('End of import');
  } catch (err) {
    console.log(err.message);
  }
}
