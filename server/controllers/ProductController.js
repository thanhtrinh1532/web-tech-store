const Product = require('../models/Product');

   exports.getProducts = (req, res) => {
     Product.getAll((err, results) => {
       if (err) return res.status(500).json({ error: err });
       res.json(results);
     });
   };