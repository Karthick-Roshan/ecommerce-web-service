const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Vendor = require('./Vendor'); // Import to define FK relation

const Product = sequelize.define('Product', {
  productId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  product_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  vendorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Vendor,
      key: 'vendorId'
    }
  }
}, {
  tableName: 'product',
  timestamps: false
});

// Relationship: One Vendor has many Products
Vendor.hasMany(Product, { foreignKey: 'vendorId' });
Product.belongsTo(Vendor, { foreignKey: 'vendorId' });

module.exports = Product;
