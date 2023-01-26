/* eslint-disable no-async-promise-executor */

import { collectionImport } from './mongodbUtil.js';

export async function saveImportInfo(importObj) {

  console.log('saving import info in database');
  return await collectionImport.insertOne(importObj);

}
