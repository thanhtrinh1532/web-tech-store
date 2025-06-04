const db = require('../config/db');

   const Product = {
     getAll: (callback) => {
       db.query('SELECT * FROM products', callback);
     }
   };

   module.exports = Product;