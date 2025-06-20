const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET /api/products - Get all products
router.get('/products', productController.getAllProducts);

// GET /api/products/:id - Get single product
router.get('/products/:id', productController.getProductById);

// POST /api/products - Create new product
router.post('/products', productController.createProduct);

// PUT /api/products/:id - Update product
router.put('/products/:id', productController.updateProduct);

// DELETE /api/products/:id - Delete product
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;