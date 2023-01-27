import { database } from '../../../server.js';

export const getProductsList = async () => {

  try {
    return await database.collection('products').find().toArray();
  } catch (err) {
    console.log(err);
    return null;
  }
};
