const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Vendor = sequelize.define('Vendor', {
  vendorId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false // You must provide this manually
  },
  owner_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'vendor',
  timestamps: false
});

module.exports = Vendor;
