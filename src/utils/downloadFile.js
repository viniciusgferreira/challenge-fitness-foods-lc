import * as https from 'https';
import fs from 'fs';
import path from 'path';

export async function downloadFile(url) {
  const tmpDir = process.cwd() + '/src/utils/tmp/';
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
