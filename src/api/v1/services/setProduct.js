import { collectionProducts } from '../../../utils/mongodbUtil.js';

export const setProduct = async (code, product) => {
  try {
    const query = { code: parseInt(code) };
    return await collectionProducts.replaceOne(query, product, { upsert: true });
  } catch (err) {
    console.log(err);
  }
};
