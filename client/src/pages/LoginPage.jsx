import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import Chatbox from '../components/Chatbox';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Vui lòng nhập email và mật khẩu!');
      setLoading(false);
      return;
    }
    if (!isValidEmail(email)) {
      setError('Email không hợp lệ!');
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự!');
      setLoading(false);
      return;
    }
    if (role !== 'user' && role !== 'admin') {
      setError('Vai trò không hợp lệ!');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });
      const data = await response.json();

      if (response.ok) {
        setError('');
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', data.user || email);
        localStorage.setItem('role', data.role);
        localStorage.setItem('token', data.token || '');
        if (data.role === 'admin') navigate('/admin-dashboard');
        else if (data.role === 'user') navigate('/user-dashboard');
        else navigate('/Home');
      } else {
        setError(data.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin!');
      }
    } catch (err) {
      setError('Lỗi kết nối server. Vui lòng thử lại sau!');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    if (!email) {
      setError('Vui lòng nhập email để khôi phục mật khẩu!');
      return;
    }
    alert(`Yêu cầu khôi phục mật khẩu đã được gửi đến ${email}. Vui lòng kiểm tra email!`);
  };

  const handleLoginRegister = () => {
    navigate('/register');
  };

  const handleCloseForm = () => {
    setShowLoginForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ff6b6b to-gray-200 flex flex-col">
      <header className="wider-header">
        <div className="header-top bg-ff6b6b text-white">
          <span className="header-top-text">Đăng ký tài khoản nhận ngay ưu đãi 20% đơn hàng đầu tiên</span>
          <button className="login-register-btn" onClick={handleLoginRegister}>Đăng nhập / Đăng ký</button>
        </div>
        <div className="header-main bg-white shadow-md">
          <h1 className="logo text-4xl font-extrabold text-ff6b6b">HUNIVA FASHION.</h1>
          <div className="header-buttons">
            <button className="nav-btn" onClick={() => navigate('/Home')}>Trang chủ</button>
            <button className="nav-btn" onClick={() => navigate('/gioithieu')}>Giới thiệu</button>
            <button className="nav-btn" onClick={() => navigate('/sanpham')}>Sản phẩm</button>
            <button className="nav-btn" onClick={() => navigate('/tintuc')}>Tin tức</button>
            <button className="nav-btn" onClick={() => navigate('/contact')}>Liên hệ</button>
          </div>
          <div className="header-icons">
            <span className="cursor-pointer hover:text-ff6b6b transition" aria-label="Tài khoản">👤</span>
            <span className="cursor-pointer hover:text-ff6b6b transition" aria-label="Giỏ hàng" onClick={() => navigate('/cart')}>🛒</span>
            <span className="cursor-pointer hover:text-ff6b6b transition" aria-label="Yêu thích">❤️</span>
            <span className="cursor-pointer hover:text-ff6b6b transition" aria-label="So sánh">🔄</span>
            <span className="cursor-pointer hover:text-ff6b6b transition" aria-label="Tìm kiếm">🔍</span>
          </div>
        </div>
      </header>
      <div className="flex-grow flex items-center justify-center p-6">
        {showLoginForm && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm border-4 border-double border-ff6b6b">
            <button
              className="absolute top-4 right-4 text-3xl text-gray-600 hover:text-ff6b6b transition"
              onClick={handleCloseForm}
              aria-label="Đóng"
              style={{ border: 'none' }}
            >
              ×
            </button>
            <h2 className="text-4xl font-extrabold text-ff6b6b text-center mb-10">Chào mừng đăng nhập!</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="role" className="block text-base font-semibold text-gray-700 mb-3">Vai trò</label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-ff6b6b focus:border-transparent transition"
                  disabled={loading}
                >
                  <option value="user">Người dùng</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <label htmlFor="email" className="block text-base font-semibold text-gray-700 mb-3">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Tên tài khoản hoặc email *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-ff6b6b focus:border-transparent transition"
                  required
                  disabled={loading}
                />
              </div>
              <div className="relative">
                <label htmlFor="password" className="block text-base font-semibold text-gray-700 mb-3">Mật khẩu</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Mật khẩu *"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-ff6b6b focus:border-transparent transition"
                  required
                  disabled={loading}
                />
                <button
                  onClick={handleForgotPassword}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-base text-ff6b6b hover:underline transition"
                  disabled={loading}
                  style={{ border: 'none' }}
                >
                  Quên mật khẩu?
                </button>
              </div>
              <button
                onClick={handleLogin}
                className={`w-full bg-ff6b6b text-white py-3 rounded-xl hover:bg-ff4d4d transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? 'Đang xử lý...' : 'Đăng nhập'}
              </button>
              <p className="text-center text-base text-gray-600">
                Không phải là thành viên?{' '}
                <a href="/register" className="text-ff6b6b hover:underline font-semibold transition">Tạo tài khoản</a>
              </p>
              {error && (
                <p className="text-center text-ff6b6b text-base font-semibold">{error}</p>
              )}
            </div>
          </div>
        )}
      </div>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <h1 className="logo text-2xl font-extrabold text-ff6b6b">HUNIVA FASHION.</h1>
          </div>
          <div className="footer-info">
            <p className="text-gray-600">Địa chỉ: 107/23 Cạch Mạng Thăng 8, P.7, Q.Tân Bình, TP.HCM</p>
            <p className="text-gray-600">Số điện thoại: (84) 913-728-397</p>
            <p className="text-gray-600">Email: info@themonaglobal.com</p>
          </div>
          <div className="footer-hours">
            <p className="text-gray-600">Thứ hai - Thứ sáu: 09:00 - 18:00</p>
            <p className="text-gray-600">Thứ bảy: 09:00 - 15:00</p>
            <p className="text-gray-600">Chủ nhật: 09:00 - 12:00</p>
          </div>
          <div className="footer-payment">
            <img src="/visa.png" alt="Visa" className="payment-icon" />
            <img src="/mastercard.png" alt="Mastercard" className="payment-icon" />
            <img src="/paypal.png" alt="Paypal" className="payment-icon" />
          </div>
        </div>
      </footer>
      <Chatbox onClose={() => {}} />
    </div>
  );
};

export default LoginPage;