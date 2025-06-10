// models/Cart.js
const { sequelize } = require('../config/db.js');
const { DataTypes } = require('sequelize');

// Kiểm tra kết nối Sequelize
if (!sequelize || typeof sequelize.define !== 'function') {
  throw new Error('Sequelize instance is not properly configured in db.js');
}

// Định nghĩa model Cart
const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'carts',
  timestamps: false
});

// Thêm các phương thức static
Cart.getByUserId = async function (userId) {
  return await this.findAll({
    where: { user_id: userId }
  });
};

Cart.addItem = async function (user_id, product_id, quantity) {
  return await this.create({
    user_id,
    product_id,
    quantity
  });
};

Cart.updateItem = async function (cartId, quantity) {
  const [updatedRows] = await this.update(
    { quantity },
    { where: { id: cartId } }
  );
  return updatedRows > 0;
};

Cart.removeItem = async function (cartId) {
  const deletedRows = await this.destroy({
    where: { id: cartId }
  });
  return deletedRows > 0;
};

Cart.clear = async function (userId) {
  const deletedRows = await this.destroy({
    where: { user_id: userId }
  });
  return deletedRows > 0;
};

Cart.getCartCount = async function (userId) {
  return await this.count({
    where: { user_id: userId }
  });
};

module.exports = { Cart };