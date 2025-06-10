// controllers/CartController.js
const { Cart } = require('../models/Cart');
const { sequelize } = require('../config/db.js');

const CartController = {
  // Lấy giỏ hàng của người dùng
  getCart: async (req, res) => {
    try {
      const userId = parseInt(req.params.userId, 10);
      
      if (!userId || isNaN(userId)) {
        return res.status(400).json({ error: 'User ID không hợp lệ' });
      }

      const cartItems = await Cart.getByUserId(userId);
      
      res.status(200).json({
        success: true,
        data: cartItems,
        total: cartItems.length
      });
    } catch (error) {
      console.error('Lỗi trong getCart:', error);
      res.status(500).json({ 
        error: 'Lỗi khi lấy giỏ hàng', 
        details: error.message 
      });
    }
  },

  // Thêm sản phẩm vào giỏ hàng
  addToCart: async (req, res) => {
    try {
      const { user_id, product_id, quantity } = req.body;
      
      if (!user_id || !product_id || !quantity) {
        return res.status(400).json({ 
          error: 'Yêu cầu user_id, product_id và quantity' 
        });
      }

      if (!Number.isInteger(user_id) || !Number.isInteger(product_id) || !Number.isInteger(quantity) || quantity <= 0) {
        return res.status(400).json({ 
          error: 'user_id, product_id và quantity phải là số nguyên dương' 
        });
      }

      const cartItem = await Cart.addItem(user_id, product_id, quantity);
      
      res.status(201).json({
        success: true,
        data: cartItem,
        message: 'Thêm sản phẩm vào giỏ hàng thành công'
      });
    } catch (error) {
      console.error('Lỗi trong addToCart:', error);
      res.status(500).json({ 
        error: 'Lỗi khi thêm vào giỏ hàng', 
        details: error.message 
      });
    }
  },

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  updateCartItem: async (req, res) => {
    try {
      const cartId = parseInt(req.params.id, 10);
      const { quantity } = req.body;
      
      if (isNaN(cartId) || !quantity || !Number.isInteger(quantity) || quantity <= 0) {
        return res.status(400).json({ 
          error: 'Yêu cầu cartId và quantity hợp lệ' 
        });
      }

      const success = await Cart.updateItem(cartId, quantity);
      
      if (!success) {
        return res.status(404).json({ 
          error: 'Không tìm thấy mục giỏ hàng' 
        });
      }

      res.status(200).json({ 
        success: true,
        message: 'Cập nhật mục giỏ hàng thành công'
      });
    } catch (error) {
      console.error('Lỗi trong updateCartItem:', error);
      res.status(500).json({ 
        error: 'Lỗi khi cập nhật mục giỏ hàng', 
        details: error.message 
      });
    }
  },

  // Xóa sản phẩm khỏi giỏ hàng
  removeFromCart: async (req, res) => {
    try {
      const cartId = parseInt(req.params.id, 10);
      
      if (isNaN(cartId)) {
        return res.status(400).json({ 
          error: 'Cart ID không hợp lệ' 
        });
      }

      const success = await Cart.removeItem(cartId);
      
      if (!success) {
        return res.status(404).json({ 
          error: 'Không tìm thấy mục giỏ hàng' 
        });
      }

      res.status(200).json({ 
        success: true,
        message: 'Xóa mục giỏ hàng thành công'
      });
    } catch (error) {
      console.error('Lỗi trong removeFromCart:', error);
      res.status(500).json({ 
        error: 'Lỗi khi xóa mục giỏ hàng', 
        details: error.message 
      });
    }
  },

  // Xóa toàn bộ giỏ hàng của người dùng
  clearCart: async (req, res) => {
    try {
      const userId = parseInt(req.params.userId, 10);
      
      if (isNaN(userId)) {
        return res.status(400).json({ 
          error: 'User ID không hợp lệ' 
        });
      }

      const success = await Cart.clear(userId);
      
      if (!success) {
        return res.status(404).json({ 
          error: 'Giỏ hàng không tồn tại hoặc đã trống' 
        });
      }

      res.status(200).json({ 
        success: true,
        message: 'Xóa toàn bộ giỏ hàng thành công'
      });
    } catch (error) {
      console.error('Lỗi trong clearCart:', error);
      res.status(500).json({ 
        error: 'Lỗi khi xóa giỏ hàng', 
        details: error.message 
      });
    }
  },

  // Lấy số lượng sản phẩm trong giỏ hàng
  getCartCount: async (req, res) => {
    try {
      const userId = parseInt(req.params.userId, 10);
      
      if (isNaN(userId)) {
        return res.status(400).json({ 
          error: 'User ID không hợp lệ' 
        });
      }

      const count = await Cart.getCartCount(userId);
      
      res.status(200).json({
        success: true,
        count
      });
    } catch (error) {
      console.error('Lỗi trong getCartCount:', error);
      res.status(500).json({ 
        error: 'Lỗi khi lấy số lượng giỏ hàng', 
        details: error.message 
      });
    }
  }
};

module.exports = CartController;