const express = require('express');
const router = express.Router();
const controller = require('../controllers/combinedController');

router.post('/vendor-product', controller.createVendorWithProducts); // ✅ correct

module.exports = router;
