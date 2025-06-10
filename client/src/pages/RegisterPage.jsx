<<<<<<< HEAD
import React, { useState } from 'react';
import './RegisterPage.css';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const users = [
    { email: 'admin@example.com', password: 'admin123', role: 'admin' },
    { email: 'user@example.com', password: 'user123', role: 'user' },
  ];

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Mật khẩu không khớp!');
      return;
    }
    const userExists = users.some(u => u.email === email);
    if (userExists) {
      setError('Email đã tồn tại!');
      return;
    }
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role: 'user' }),
      });
      if (response.ok) {
        setError('');
        alert('Đăng ký thành công! Vui lòng đăng nhập.');
        navigate('/login');
      } else {
        throw new Error('Đăng ký thất bại');
      }
    } catch (err) {
      setError('Đăng ký thất bại');
    }
  };

  const handleLoginRegister = () => {
    navigate('/login'); // Hoặc '/register' tùy ý
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="wider-header">
        <div className="header-top">
          <span className="header-top-text">Đăng ký tài khoản nhận ngay ưu đãi 20% đơn hàng đầu tiên</span>
          <button className="login-register-btn" onClick={handleLoginRegister}>Đăng nhập / Đăng ký</button>
        </div>
        <div className="header-main">
          <h1 className="logo">HUNIVA FASHION.</h1>
          <div className="header-buttons">
            <button className="nav-btn" onClick={() => navigate('/trangchu')}>Trang chủ</button>
            <button className="nav-btn" onClick={() => navigate('/gioithieu')}>Giới thiệu</button>
            <button className="nav-btn" onClick={() => navigate('/sanpham')}>Sản phẩm</button>
            <button className="nav-btn" onClick={() => navigate('/tintuc')}>Tin tức</button>
            <button className="nav-btn" onClick={() => navigate('/contact')}>Liên hệ</button>
          </div>
          <div className="header-icons">
            <span className="cursor-pointer hover:text-ff6b6b" aria-label="Tài khoản">👤</span>
            <span className="cursor-pointer hover:text-ff6b6b" aria-label="Giỏ hàng">🛒</span>
            <span className="cursor-pointer hover:text-ff6b6b" aria-label="Yêu thích">❤️</span>
            <span className="cursor-pointer hover:text-ff6b6b" aria-label="So sánh">🔄</span>
            <span className="cursor-pointer hover:text-ff6b6b" aria-label="Tìm kiếm">🔍</span>
          </div>
        </div>
      </header>
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="register-box fade-in relative">
          <button
            className="close-btn"
            onClick={() => navigate('/trangchu')}
            aria-label="Đóng"
          >
            ×
          </button>
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Đăng nhập/Đăng ký</h2>
          <p className="text-center text-gray-600 mb-4">Chào mừng đăng ký!</p>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Tên tài khoản hoặc email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ff6b6b"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Mật khẩu</label>
              <input
                id="password"
                type="password"
                placeholder="Mật khẩu *"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ff6b6b"
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">Xác nhận mật khẩu</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Xác nhận mật khẩu *"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ff6b6b"
                required
              />
            </div>
            <button
              onClick={handleRegister}
              className="w-full bg-ff6b6b text-white p-3 rounded-md hover:bg-ff4d4d transition pulse"
            >
              Tạo tài khoản
            </button>
            
            {error && (
              <p className="text-center text-ff6b6b text-sm shake">{error}</p>
            )}
          </div>
          <p className="text-center text-gray-600 mt-4">
            Bạn đã có tài khoản? <a href="#" className="text-ff6b6b hover:underline">Đăng nhập</a>
          </p>
        </div>
      </div>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <h1 className="logo">HUNIVA FASHION.</h1>
          </div>
          <div className="footer-info">
            <p>Địa chỉ: 107/23 Cạch Mạng Thăng 8, P.7, Q.Tân Bình, TP.HCM</p>
            <p>Số điện thoại: (84) 913-728-397</p>
            <p>Email: info@themonaglobal.com</p>
          </div>
          <div className="footer-hours">
            <p>Thứ hai - Thứ sáu: 09:00 - 18:00</p>
            <p>Thứ bảy: 09:00 - 15:00</p>
            <p>Chủ nhật: 09:00 - 12:00</p>
          </div>
          <div className="footer-payment">
            <img src="/visa.png" alt="Visa" className="payment-icon" />
            <img src="/mastercard.png" alt="Mastercard" className="payment-icon" />
            <img src="/paypal.png" alt="Paypal" className="payment-icon" />
          </div>
        </div>
      </footer>
=======
import React from 'react';
import './RegisterPage.css'; // Tạo file CSS nếu cần

const RegisterPage = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>This is the admin page.</p>
>>>>>>> dae1b6d2007ad233449e04af799bf4543caeadc9
    </div>
  );
};

<<<<<<< HEAD
export default RegisterPage;
=======
export default RegisterPage; // Export mặc định
>>>>>>> dae1b6d2007ad233449e04af799bf4543caeadc9
