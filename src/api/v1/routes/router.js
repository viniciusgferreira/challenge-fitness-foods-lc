import { Router } from 'express';
import { controller_deleteProduct } from '../controllers/deleteProduct.controller.js';
import { controller_getApiStatus } from '../controllers/getApiStatus.controller.js';
import { controller_getProductByCode } from '../controllers/getProductByCode.controller.js';
import { controller_getProductsList } from '../controllers/getProductsList.controller.js';
import { controller_setProduct } from '../controllers/setProduct.controller.js';

export const router = Router();

// GET API INFO
router.get('/', controller_getApiStatus);

// GET PRODUCT BY CODE
router.get('/products/:code', controller_getProductByCode);

// GET PRODUCTS LIST
router.get('/products', controller_getProductsList);

// ADD NEW PRODUCT
router.put('/products/:code', controller_setProduct);

// MOVE PRODUCT TO TRASH
router.delete('/products/:code', controller_deleteProduct);
