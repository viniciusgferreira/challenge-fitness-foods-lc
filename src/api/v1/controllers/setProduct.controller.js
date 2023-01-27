import { setProduct } from '../services/setProduct.js';

export async function controller_setProduct(req, res) {
  let { code } = req.params;
  code = parseInt(code);
  const product = req.body;
  const editedProduct = await setProduct(code, product);
  !editedProduct.modifiedCount ? res.status(404).json({ 'msg': 'product not found' }) : res.status(201).json({ 'msg': 'product sucessfully edited' });
}
