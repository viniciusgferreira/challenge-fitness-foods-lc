import fs from 'fs';
import * as readline from 'readline/promises';


export async function get100ProductsFromFile(extractedfilename) {
  const tmpDir = process.cwd() + '/src/utils/tmp/';

  let products = [];
  let lineCounter = 0;


  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: fs.createReadStream(tmpDir + extractedfilename)
    });

    rl.on('line', (obj) => {
      if (lineCounter < 100) {
        lineCounter++;
        products.push(JSON.parse(obj));
      } else {
        rl.close();
        rl.removeAllListeners();
      }
    });

    rl.on('close', () => {
      return resolve(products);
    });

  });
}
