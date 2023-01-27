import { getProduct } from '../services/getProduct.js';
import { setProduct } from '../services/setProduct.js';

export async function controller_deleteProduct(req, res) {
  let { code } = req.params;
  code = parseInt(code);
  const product = await getProduct(code);
  if (product) {
    if (product.status == 'trash') {
      res.status(406).json({ 'msg': 'product already in trash' });
    } else {
      product.status = 'trash';
      const editedProduct = await setProduct(code, product);
      editedProduct.modifiedCount ? res.status(201).json({ 'msg': 'product sent to trash' }) : res.status(404).json({ 'msg': 'product not found' });
    }
  } else {
    res.status(404).json({ 'msg': 'product not found' });
  }
}
