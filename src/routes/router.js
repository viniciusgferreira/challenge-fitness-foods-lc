import { Router } from 'express';
import { controller_getProductByCode } from '../controllers/getProductByCode.controller.js';
import { controller_getProductsList } from '../controllers/getProductsList.controller.js';
import { setProduct } from '../controllers/setProduct.controller.js';

export const router = Router();

// GET API INFO
router.get('/', (req, res) => {
  res.send('ok');
});

// GET PRODUCT BY CODE
router.get('/products/:code', controller_getProductByCode);

// GET PRODUCTS LIST
router.get('/products', controller_getProductsList);

// ADD NEW PRODUCT
router.put('/products/:code', setProduct);
