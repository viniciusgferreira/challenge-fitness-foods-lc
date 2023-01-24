import { collectionProducts } from '../../../server.js';

export const setProduct = async (code, product) => {
  try {
    const query = { code: parseInt(code) };
    return await collectionProducts.replaceOne(query, product, { upsert: false });
  } catch (err) {
    console.log(err);
  }
};
