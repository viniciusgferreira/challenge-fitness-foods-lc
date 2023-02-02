import fs from 'fs';
import path from 'path';

export function cleanFiles() {
  const tmpDir = process.cwd() + '/src/utils/tmp/';
  const indexFile = process.env.INDEX_FILE;

  fs.unlinkSync(tmpDir + indexFile);
  const jsonsInDir = fs.readdirSync(tmpDir).filter(file => path.extname(file) === '.json');
  jsonsInDir.forEach(filename => {
    fs.unlinkSync(tmpDir + filename);
  });

  const gzInDir = fs.readdirSync(tmpDir).filter(file => path.extname(file) === '.gz');
  gzInDir.forEach(filename => {
    fs.unlinkSync(tmpDir + filename);
  });
}
