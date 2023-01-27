import { mongodbClient } from './mongodbUtil.js';

export async function importFromFiles(productsToImport) {
  const mongodbUtilConnection = await mongodbClient.connect();
  console.log('importing products to database...');
  try {
    // IMPORT EACH PRODUCT
    let importedCount = 0;
    for (let i = 0; i < productsToImport.length; i++) {
      const query = { code: parseInt(productsToImport[i].code) };
      const result = await mongodbUtilConnection.db('fitnessfoodsdb').collection('products').replaceOne(query, productsToImport[i], { upsert: true });
      if (result.modifiedCount == 1) {
        importedCount++;
      }
    }

    console.log('products sucessfully imported: ' + importedCount);
    mongodbUtilConnection.close();
    return importedCount;
  } catch (error) {
    return error;
  }

}
