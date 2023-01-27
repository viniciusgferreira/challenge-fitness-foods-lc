import { database } from '../../../server.js';

export const getProduct = async (code) => {

  const query = { code: code };
  try {
    return await database.collection('products').findOne(query);
  } catch (err) {
    console.log(err);
    return null;
  }
};
