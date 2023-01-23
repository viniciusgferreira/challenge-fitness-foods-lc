import * as https from 'https';
import fs from 'fs';
import path from 'path';
import * as readline from 'readline/promises';
import * as zlib from 'zlib';

const baseURL = 'https://challenges.coode.sh/food/data/json/';
const indexFile = 'index.txt';


await importProducts(); // APAGAR


async function downloadFile(url) {
  const filename = path.basename(url);
  const fileStream = fs.createWriteStream(filename);
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

function lookForChanges() {

}

function extractFiles() {

}
function addToDatabase() {

}

async function getListToDownload(file) {
  const list = [];
  return new Promise((resolve, reject) => {

    try {
      const readInterface = readline.createInterface({
        input: fs.createReadStream(file)
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

  const inputFile = fs.createReadStream(filename);
  const outputFile = fs.createWriteStream(filename.substring(0, filename.length - 3));

  return new Promise((resolve) => {
    inputFile.pipe(zlib.createGunzip()).pipe(outputFile);

    outputFile.on('finish', () => {
      console.log(filename + ' finished extraction');
      return resolve(true);
    });

  });

}

function import100Products(file) {
  file = file.substring(0, file.length - 3);

  return new Promise((resolve, reject) => {

    const importedTime = new Date().toISOString();
    let productCounter = 0;
    try {
      const readInterface = readline.createInterface({
        input: fs.createReadStream(file)
      });

      readInterface.on('line', function (product) {
        console.log('importing 100 products of ' + file);
        product.imported_t = importedTime;
        console.log(product);
        productCounter++;
        if (productCounter >= 100) { readInterface.close(); }
      });

      readInterface.on('close', () => {
        resolve(true);
      });

    } catch (err) {
      reject(err);
    }
  });
}

export default async function importProducts() {

  try {
    console.log('Initiating scheduled import to update Products database');
    // DOWNLOAD INDEX FILE
    //await downloadFile(baseURL + indexFile);
    const list = await getListToDownload(indexFile, baseURL);
    // DOWNLOAD ALL FILES
    const requests = createDownloadRequests(list);
    await Promise.all(requests);

    // EXTRACT FILES
    const requestExtraction = [];
    for (let i = 0; i < list.length; i++) {
      console.log('extracting ' + list[i]);
      requestExtraction.push(extractFile(list[i]));
    }

    await Promise.all(requestExtraction);
    console.log('extraction complete');
  } catch (err) {
    console.log(err.message);
  }


  await import100Products(indexFile);




  console.log('end of import');
  //lookForChanges();
  //addToDatabase();

}
