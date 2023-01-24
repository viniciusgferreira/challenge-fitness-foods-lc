import { getProductsList } from '../services/getProductsList.js';


export async function controller_getProductsList(req, res) {
  const products = await getProductsList();
  if (products.length > 0) {
    res.json(products);
  } else {
    res.status(500).json({ 'msg': 'database empty' });
  }
}
