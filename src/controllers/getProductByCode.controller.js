import { getProduct } from '../services/getProduct.js';


export async function controller_getProductByCode(req, res) {
  const { code } = req.params;
  const product = await getProduct(code);
  !product ? res.status(400).json('product not found') : res.json(product);
}
