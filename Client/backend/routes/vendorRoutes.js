const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');

router.post('/vendors', vendorController.createVendor);
router.get('/vendors', vendorController.getAllVendors);

module.exports = router;
