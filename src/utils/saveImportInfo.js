import { mongodbClient } from './mongodbUtil.js';


export async function saveImportInfo(importObj) {

  const mongodbUtilConnection = await mongodbClient.connect();
  console.log('saving import info in database');
  const inserted = await mongodbUtilConnection.db('fitnessfoodsdb').collection('imports').insertOne(importObj);
  mongodbUtilConnection.close();
  return inserted;
}
