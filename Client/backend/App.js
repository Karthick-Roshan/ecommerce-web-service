const express = require('express');
const app = express();
require('dotenv').config();

// DB Models
const sequelize = require('./config/db');
const Vendor = require('./models/Vendor');      // Already imported
const Product = require('./models/Product');    // ✅ Add this line here

// Routes
const vendorRoutes = require('./routes/vendorRoutes');
const combinedRoutes = require('./routes/combinedRoutes');

app.use(express.json());
app.use('/api', vendorRoutes);
app.use('/api', combinedRoutes);

// Sync DB and start server
sequelize.sync().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
  });
});
