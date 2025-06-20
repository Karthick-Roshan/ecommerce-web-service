const express = require('express');
const router = express.Router();
const controller = require('../controllers/combinedController');

router.post('/vendor-product', controller.createVendorWithProducts);
router.get('/vendor-product', controller.getAllVendorProducts);
router.get('/vendor-product/:id', controller.getVendorProductsById); 

module.exports = router;
