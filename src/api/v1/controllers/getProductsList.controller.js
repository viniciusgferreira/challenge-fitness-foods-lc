import { getProductsList } from '../services/getProductsList.js';


export async function controller_getProductsList(req, res) {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const products = await getProductsList(limit, page);
  if (products.length > 0) {
    res.json(products);
  } else {
    res.status(500).json({ 'msg': 'database empty' });
  }
}
