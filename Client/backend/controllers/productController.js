const Product = require('../models/Product');
const Vendor = require('../models/Vendor');

// Get all products with vendor details
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{
        model: Vendor,
        attributes: ['owner_name', 'email', 'phone']
      }]
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id, {
      include: [{
        model: Vendor,
        attributes: ['owner_name', 'email', 'phone']
      }]
    });
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a single product
exports.createProduct = async (req, res) => {
  try {
    const { productId, product_name, quantity, price, vendorId } = req.body;
    
    const product = await Product.create({
      productId,
      product_name,
      quantity,
      price,
      vendorId
    });
    
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { product_name, quantity, price } = req.body;
    
    const [updated] = await Product.update(
      { product_name, quantity, price },
      { where: { productId: id } }
    );
    
    if (!updated) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    const updatedProduct = await Product.findByPk(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.destroy({
      where: { productId: id }
    });
    
    if (!deleted) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};