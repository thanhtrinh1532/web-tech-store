const express = require('express');
   const cors = require('cors');
   const dotenv = require('dotenv');
   dotenv.config();

   const productRoutes = require('./routes/productRoutes');
   const userRoutes = require('./routes/userRoutes');
   const orderRoutes = require('./routes/orderRoutes');
   const cartRoutes = require('./routes/cartRoutes');
   const contactRoutes = require('./routes/contactRoutes');
   const adminRoutes = require('./routes/adminRoutes');
   const aiRoutes = require('./routes/aiRoutes');

   const app = express();

   app.use(cors());
   app.use(express.json());

   app.use('/api/products', productRoutes);
   app.use('/api/users', userRoutes);
   app.use('/api/orders', orderRoutes);
   app.use('/api/cart', cartRoutes);
   app.use('/api/contacts', contactRoutes);
   app.use('/api/admin', adminRoutes);
   app.use('/api/ai', aiRoutes);

   const PORT = process.env.PORT || 5000;
   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));