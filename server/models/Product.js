const db = require('../config/db');

const Product = {
  // Lấy tất cả sản phẩm
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM products');
    return rows;
  },

  // Lấy sản phẩm theo ID
  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
  },

  // Lấy sản phẩm theo danh mục
  getByCategory: async (category_id) => {
    const [rows] = await db.query('SELECT * FROM products WHERE category_id = ?', [category_id]);
    return rows;
  },

  // Thêm sản phẩm
  create: async (name, description, thumbnail, price, quantity, category_id, view) => {
    const [result] = await db.query(
      'INSERT INTO products (name, description, thumbnail, price, quantity, category_id, view) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, description, thumbnail, price, quantity, category_id, view]
    );
    return { id: result.insertId, name, description, thumbnail, price, quantity, category_id, view };
  },

  // Cập nhật sản phẩm
  update: async (id, name, description, thumbnail, price, quantity, category_id, view) => {
    const [result] = await db.query(
      'UPDATE products SET name = ?, description = ?, thumbnail = ?, price = ?, quantity = ?, category_id = ?, view = ? WHERE id = ?',
      [name, description, thumbnail, price, quantity, category_id, view, id]
    );
    return result.affectedRows > 0;
  },

  // Xóa sản phẩm
  delete: async (id) => {
    const [result] = await db.query('DELETE FROM products WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },
};

module.exports = Product;