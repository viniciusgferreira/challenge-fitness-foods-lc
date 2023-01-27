import { database } from '../../../server.js';

export const setProduct = async (code, product) => {
  try {
    const query = { code: parseInt(code) };
    return await database.collection('products').replaceOne(query, product, { upsert: true });
  } catch (err) {
    console.log(err);
  }
};
