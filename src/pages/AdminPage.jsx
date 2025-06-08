import React, { useState, useEffect } from 'react';
import './AdminPage.css';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });
  const [role, setRole] = useState(localStorage.getItem('role') || 'user');

  useEffect(() => {
    fetch('/api/admin/products').then(res => res.json()).then(setProducts);
    fetch('/api/admin/orders').then(res => res.json()).then(setOrders);
  }, []);

  const handleAddProduct = async () => {
    if (role !== 'admin') return;
    const response = await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    });
    if (response.ok) {
      const addedProduct = await response.json();
      setProducts([...products, addedProduct]);
      setNewProduct({ name: '', price: '' });
    }
  };

  const handleUpdateProduct = async (id, updatedProduct) => {
    if (role !== 'admin') return;
    const response = await fetch(`/api/admin/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct),
    });
    if (response.ok) {
      setProducts(products.map(p => p.id === id ? updatedProduct : p));
    }
  };

  const handleDeleteProduct = async (id) => {
    if (role !== 'admin') return;
    const response = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
    if (response.ok) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="admin-container">
      <h2>Quản lý Admin</h2>
      {role === 'admin' ? (
        <div className="product-form">
          <input placeholder="Tên sản phẩm" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
          <input placeholder="Giá" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
          <button onClick={handleAddProduct} className="add-btn">Thêm sản phẩm <span>➕</span></button>
        </div>
      ) : (
        <p>Bạn không có quyền truy cập tính năng này!</p>
      )}
      {role === 'admin' && (
        <div className="product-list">
          <h3>Danh sách sản phẩm</h3>
          {products.map(p => (
            <div key={p.id} className="product-item">
              <input value={p.name} onChange={(e) => handleUpdateProduct(p.id, { ...p, name: e.target.value })} />
              <input value={p.price} onChange={(e) => handleUpdateProduct(p.id, { ...p, price: e.target.value })} />
              <button onClick={() => handleDeleteProduct(p.id)} className="delete-btn">Xóa <span>❌</span></button>
            </div>
          ))}
        </div>
      )}
      <div className="orders-list">
        <h3>Danh sách đơn hàng</h3>
        {orders.map(order => <p key={order.id} className="order-item">{order.id}</p>)}
      </div>
    </div>
  );
};

export default AdminPage;