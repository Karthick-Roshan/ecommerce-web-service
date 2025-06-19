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

// ✅ GET all vendors with products
exports.getAllVendorProducts = async (req, res) => {
  try {
    const data = await Vendor.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ GET vendor by ID with products
exports.getVendorProductsById = async (req, res) => {
  const vendorId = req.params.id;
  try {
    const vendor = await Vendor.findOne({
      where: { vendorId },
      include: [{ model: Product }]
    });

    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    res.status(200).json(vendor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
