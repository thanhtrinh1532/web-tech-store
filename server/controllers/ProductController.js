// server/controllers/ProductController.js
const Product = require('../models/Product');

const ProductController = {
  // Lấy tất cả sản phẩm
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.getAll();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching products', details: error.message });
    }
  },

  // Lấy sản phẩm theo ID
  getProductById: async (req, res) => {
    try {
      const product = await Product.getById(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching product', details: error.message });
    }
  },

  // Lấy sản phẩm theo danh mục
  getProductsByCategory: async (req, res) => {
    try {
      const products = await Product.getByCategory(req.params.categoryId);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching products by category', details: error.message });
    }
  },

  // Tạo sản phẩm mới
  createProduct: async (req, res) => {
    try {
      const { name, description, thumbnail, price, quantity, category_id, view } = req.body;
      if (!name || !price || !category_id) {
        return res.status(400).json({ error: 'Name, price, and category_id are required' });
      }
      const newProduct = await Product.create(name, description, thumbnail, price, quantity, category_id, view || 0);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: 'Error creating product', details: error.message });
    }
  },

  // Cập nhật sản phẩm
  updateProduct: async (req, res) => {
    try {
      const { name, description, thumbnail, price, quantity, category_id, view } = req.body;
      const success = await Product.update(req.params.id, name, description, thumbnail, price, quantity, category_id, view);
      if (!success) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error updating product', details: error.message });
    }
  },

  // Xóa sản phẩm
  deleteProduct: async (req, res) => {
    try {
      const success = await Product.delete(req.params.id);
      if (!success) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting product', details: error.message });
    }
  },
};

module.exports = ProductController;