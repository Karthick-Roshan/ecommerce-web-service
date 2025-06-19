const Vendor = require('../models/Vendor');
const Product = require('../models/Product');

exports.createVendorWithProducts = async (req, res) => {
  const { vendor, products } = req.body;

  try {
    // Insert or update vendor
    const [vendorRecord, created] = await Vendor.upsert(vendor);

    // Insert multiple products
    const productRecords = await Promise.all(
      products.map(product =>
        Product.create({ ...product, vendorId: vendor.vendorId })
      )
    );

    res.status(201).json({
      message: 'Vendor and products saved successfully',
      vendor: vendorRecord,
      products: productRecords
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
