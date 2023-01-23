import { Router } from 'express';

export const router = Router();

// GET API INFO
router.get('/', (req, res) => {
  res.send('ok');
});

// GET PRODUCT BY CODE
//router.get('/products/:code', getProductByCode);

// GET PRODUCT BY CODE
//router.get('/products', getAllProducts);
