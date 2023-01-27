import * as zlib from 'zlib';
import fs from 'fs';

export async function extractFile(filename) {
  const tmpDir = process.cwd() + '/src/utils/tmp/';

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
