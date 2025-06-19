const Vendor = require('../models/Vendor');

exports.createVendor = async (req, res) => {
  try {
    const { vendorId, owner_name, email, phone, address } = req.body;

    const vendor = await Vendor.create({ vendorId, owner_name, email, phone, address });
    res.status(201).json(vendor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all vendors
exports.getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.findAll();
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
