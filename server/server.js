const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/db');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// // Middleware
// app.use(cors()); // Enable CORS for cross-origin requests
// app.use(express.json()); // Parse JSON request bodies
// app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');
const contactRoutes = require('./routes/contactRoutes');
const adminRoutes = require('./routes/adminRoutes');
const aiRoutes = require('./routes/aiRoutes');

// Route middleware
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
// app.use('/api/cart', cartRoutes);
// app.use('/api/contact', contactRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/ai', aiRoutes);

// // Basic route for testing
// app.get('/', (req, res) => {
//   res.json({ message: 'Welcome to the Tech Store API' });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: 'Something went wrong!', details: err.message });
// });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Test database connection
db.query('SELECT 1 + 1 AS solution')
  .then(([rows]) => {
    console.log('Database connection test successful:', rows[0].solution);
  })
  .catch(err => {
    console.error('Database connection test failed:', err);
  });