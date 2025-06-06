const db = require('../config/db');

const Order = {
  // Lấy tất cả đơn hàng
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM orders');
    return rows;
  },

  // Lấy đơn hàng theo ID
  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM orders WHERE id = ?', [id]);
    return rows[0];
  },

  // Lấy đơn hàng theo user_id
  getByUserId: async (user_id) => {
    const [rows] = await db.query('SELECT * FROM orders WHERE user_id = ?', [user_id]);
    return rows;
  },

  // Thêm đơn hàng
  create: async (code, status, user_id) => {
    const [result] = await db.query(
      'INSERT INTO orders (code, status, user_id) VALUES (?, ?, ?)',
      [code, status, user_id]
    );
    return { id: result.insertId, code, status, user_id };
  },

  // Cập nhật đơn hàng
  update: async (id, code, status) => {
    const [result] = await db.query(
      'UPDATE orders SET code = ?, status = ? WHERE id = ?',
      [code, status, id]
    );
    return result.affectedRows > 0;
  },

  // Xóa đơn hàng
  delete: async (id) => {
    const [result] = await db.query('DELETE FROM orders WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },
};

module.exports = Order;