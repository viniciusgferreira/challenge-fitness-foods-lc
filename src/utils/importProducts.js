import fs from 'fs';
import * as readline from 'readline/promises';
import { createProductObj } from '../api/v1/models/createProductObj.js';
import { saveImportInfo } from './saveImportInfo.js';
import { importFromFiles } from './importFromFiles.js';
import { downloadFile } from './downloadFile.js';
import { extractFile } from './extractFile.js';
import { cleanFiles } from './cleanFiles.js';
import { get100ProductsFromFile } from './get100ProductsFromFile.js';

const tmpDir = process.cwd() + '/src/utils/tmp/';
const baseURL = 'https://challenges.coode.sh/food/data/json/';
const indexFile = 'index.txt';

export default async function importProducts() {
  const importInfo = {};

  // SET TIME OF IMPORT
  const imported_t = new Date().toISOString();

  try {
    console.log('Initiating scheduled import to update Products database');
    console.log('imported time: ' + imported_t);

    // DOWNLOAD INDEX FILE
    await downloadFile(baseURL + indexFile);
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
    console.log('getting products ready to import...');
    for (let i = 0; i < extractedList.length; i++) {
      const productsPerFile = await get100ProductsFromFile(extractedList[i]);
      for (let i = 0; i < productsPerFile.length; i++) {
        productsPerFile[i].imported_t = imported_t;
        productsPerFile[i].status = 'published';
        const prodObj = await createProductObj(productsPerFile[i]);
        productsToImport.push(prodObj);
      }
    }
    console.log(productsToImport.length + ' total products to be imported');

    // UPDATE TO DB IF EXISTS OR CREATE NEW PRODUCT
    await importFromFiles(productsToImport);

    // SAVE IMPORT INFO
    importInfo.imported_t = imported_t;
    importInfo.imported_files = list;
    await saveImportInfo(importInfo);

    // ERASE ALL FILES
    cleanFiles();
    console.log('End of import cron job');
  } catch (err) {
    console.log(err.message);
  }
}

function createDownloadRequests(list) {
  const requests = [];
  for (let i = 0; i < list.length; i++) {
    requests.push(downloadFile(baseURL + list[i]));
  }
  return requests;
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

