const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

// DB Models
const sequelize = require('./config/db');
const Vendor = require('./models/Vendor');     
const Product = require('./models/Product');    

// Routes
const vendorRoutes = require('./routes/vendorRoutes');
const combinedRoutes = require('./routes/combinedRoutes');
const productRoutes = require('./routes/productRoutes');

// Middleware
app.use(cors()); // Enable CORS for frontend
app.use(express.json());

// API Routes
app.use('/api', vendorRoutes);
app.use('/api', combinedRoutes);
app.use('/api', productRoutes);

// Sync DB and start server
sequelize.sync().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
  });
});