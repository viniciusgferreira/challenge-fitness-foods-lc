import { collectionProducts } from '../../../utils/mongodbUtil.js';

export const getProductsList = async () => {

  try {
    return await collectionProducts.find().toArray();
  } catch (err) {
    console.log(err);
    return null;
  }
};
