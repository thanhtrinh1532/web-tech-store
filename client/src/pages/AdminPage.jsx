import React, { useState, useEffect } from 'react';
import './AdminPage.css';
import { getPOST } from '../../services/api';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });
  const [role, setRole] = useState(localStorage.getItem('role') || 'user');
  const [activeTab, setActiveTab] = useState('account'); // Tab mặc định

  useEffect(() => {
    fetch('/api/admin/products').then(res => res.json()).then(setProducts);
    fetch('/api/admin/orders').then(res => res.json()).then(setOrders);
  }, []);

  const handleAddProduct = async () => {
    if (role !== 'admin') return;
    // const response = await fetch('/api/admin/products', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json', },
    //   body: JSON.stringify(newProduct),
    // });
    // if (response.ok) {
    //   const addedProduct = await response.json();
    //   setProducts([...products, addedProduct]);
    //   setNewProduct({ name: '', price: '' });
    // }
    const response = await getPOST('/api/admin/products', newProduct)
    console.log({ response })

    if (response) {
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

  const userId = localStorage.getItem('user') || 'tv1790389'; // Giả định userId từ localStorage

  return (
    <div className="admin-container">
      <header className="header">
        <div className="header-top">
          <span style={{ color: '#808080' }}>Sử dụng mã giảm giá 20% cho đơn hàng đầu tiên</span>
          <span className="login-status" onClick={() => {}}>Tài khoản</span>
        </div>
        <div className="header-main">
          <h1 className="logo">HUNIVA FASHION.</h1>
          <div className="header-buttons">
            <button className="nav-btn" onClick={() => window.location.href = '/Home'}>Trang chủ</button>
            <button className="nav-btn" onClick={() => window.location.href = '/gioithieu'}>Giới thiệu</button>
            <button className="nav-btn" onClick={() => window.location.href = '/sanpham'}>Sản phẩm</button>
            <button className="nav-btn" onClick={() => window.location.href = '/tintuc'}>Tin tức</button>
            <button className="nav-btn" onClick={() => window.location.href = '/contact'}>Liên hệ</button>
          </div>
          <div className="header-icons">
            <span className="cursor-pointer" aria-label="Tài khoản">👤</span>
            <span className="cursor-pointer" aria-label="Giỏ hàng">🛒</span>
            <span className="cursor-pointer" aria-label="Yêu thích">❤️</span>
            <span className="cursor-pointer" aria-label="So sánh">🔄</span>
            <span className="cursor-pointer" aria-label="Tìm kiếm">🔍</span>
          </div>
        </div>
      </header>
      <div className="account-section">
        <h2 className="account-title">My account</h2>
        <p className="account-subtitle">Trang chủ</p>
        <div className="welcome-box">
          <div className="welcome-info">
            <img src="/placeholder.jpg" alt="User profile" className="user-image" />
            <div>
              <p>Welcome</p>
              <p>{userId}</p>
            </div>
          </div>
          <p className="welcome-message">
            Xin chào {userId} (không phải tài khoản {userId}? Hãy thoát ra để đăng nhập vào tài khoản khác)
          </p>
          <p className="welcome-message">
            Tùy chỉnh tài khoản của bạn với thông tin đơn hàng, quản lý địa chỉ giao hàng, và sửa mật khẩu hoặc thông tin tài khoản.
          </p>
        </div>
        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === 'account' ? 'active' : ''}`}
            onClick={() => setActiveTab('account')}
          >
            Trang tài khoản
          </button>
          <button
            className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            Đơn hàng
          </button>
          <button
            className={`tab-btn ${activeTab === 'address' ? 'active' : ''}`}
            onClick={() => setActiveTab('address')}
          >
            Tài khoản
          </button>
          <button
            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Địa chỉ
          </button>
        </div>
        {role === 'admin' && activeTab === 'account' && (
          <div className="admin-content">
            <div className="product-form">
              <input placeholder="Tên sản phẩm" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
              <input placeholder="Giá" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
              <button onClick={handleAddProduct} className="add-btn">Thêm sản phẩm <span>➕</span></button>
            </div>
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
          </div>
        )}
        {role === 'admin' && activeTab === 'orders' && (
          <div className="orders-list">
            <h3>Đơn hàng</h3>
            {orders.map(order => <p key={order.id} className="order-item">{order.id}</p>)}
          </div>
        )}
        {activeTab === 'address' && (
          <div className="address-content">
            <h3>Địa chỉ</h3>
            <div className="address-info">
              <p>Địa chỉ: 107/23 Cạch Mạng Thăng 8, P.7, Q.Tân Bình, TP.HCM</p>
              <p>Số điện thoại: (84) 913-728-397</p>
              <p>Email: info@themonaglobal.com</p>
            </div>
            <div className="address-form">
              <input type="text" placeholder="Nhập địa chỉ Email..." className="address-input" />
              <button className="address-submit">ĐẶT LẠI</button>
            </div>
            <div className="address-details">
              <p>Thứ hai - Thứ sáu: 09:00 - 18:00</p>
              <p>Thứ bảy: 09:00 - 15:00</p>
              <p>Chủ nhật: 09:00 - 12:00</p>
            </div>
          </div>
        )}
        {activeTab === 'profile' && (
          <div className="profile-content">
            <h3>Tài khoản</h3>
            <div className="profile-info">
              <p>Địa chỉ: 107/23 Cạch Mạng Thăng 8, P.7, Q.Tân Bình, TP.HCM</p>
              <p>Số điện thoại: (84) 913-728-397</p>
              <p>Email: info@themonaglobal.com</p>
            </div>
            <div className="profile-form">
              <input type="text" placeholder="Nhập thông tin tài khoản..." className="profile-input" />
              <button className="profile-submit">Chọn ngay</button>
            </div>
            <div className="profile-details">
              <p>Thứ hai - Thứ sáu: 09:00 - 18:00</p>
              <p>Thứ bảy: 09:00 - 15:00</p>
              <p>Chủ nhật: 09:00 - 12:00</p>
            </div>
          </div>
        )}
      </div>
      <div className="promo-banner">
        <img src="/summer-sale.jpg" alt="Summer Sale" className="banner-image" />
        <button className="banner-button">Chọn ngay</button>
      </div>
    </div>
  );
};

export default AdminPage;