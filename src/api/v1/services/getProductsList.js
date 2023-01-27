import { database } from '../../../server.js';

export const getProductsList = async (limit, page) => {

  try {
    return await database.collection('products').find().limit(limit).skip((page - 1) * limit).toArray();
  } catch (err) {
    console.log(err);
    return null;
  }
};
