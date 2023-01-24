import { collectionProducts } from '../server.js';

export const getProduct = async (code) => {

  const query = { code: parseInt(code) };
  try {
    return await collectionProducts.findOne(query);
  } catch (err) {
    console.log(err);
    return null;
  }
};
