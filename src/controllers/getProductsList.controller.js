import { getProductsList } from '../services/getProductsList.js';


export async function controller_getProductsList(req, res) {
  const products = await getProductsList();
  !products ? res.status(400).json('no products in database') : res.json(products);
}
