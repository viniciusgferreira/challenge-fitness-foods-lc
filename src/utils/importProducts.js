import * as https from 'https';
import fs from 'fs';
import path from 'path';
import * as readline from 'readline/promises';

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
        list.push(baseURL + line);
      });

      readInterface.on('close', () => {
        resolve(list);
      });

    } catch (err) {
      reject(err);
    }
  });
}

function createDownloadRequests(list) {
  const requests = [];
  for (let i = 0; i < list.length; i++) {
    requests.push(downloadFile(list[i]));
  }
  return requests;
}

export default async function importProducts() {

  try {
    console.log('Initiating scheduled import to update Products database');
    // DOWNLOAD INDEX FILE
    await downloadFile(baseURL + indexFile);
    const list = await getListToDownload(indexFile, baseURL);
    // DOWNLOAD ALL FILES
    const requests = createDownloadRequests(list);
    await Promise.all(requests);


  } catch (err) {
    console.log(err.message);
  }


  //extractFiles();
  //lookForChanges();
  //addToDatabase();

}
