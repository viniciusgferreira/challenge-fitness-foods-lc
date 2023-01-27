import { mongodbClient } from './mongodbUtil.js';

export async function importFromFiles(productsToImport) {
  const mongodbUtilConnection = await mongodbClient.connect();

  try {
    // IMPORT EACH PRODUCT
    console.log(productsToImport[0].code);
    const result = await mongodbUtilConnection.db('fitnessfoodsdb').collection('products').insertMany(productsToImport);
    console.log('Inserted documents: ' + result.insertedCount);
    mongodbUtilConnection.close();
    return result;
  } catch (error) {
    return error;
  }

}
