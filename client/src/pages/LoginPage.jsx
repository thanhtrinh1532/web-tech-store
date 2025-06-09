import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(false);
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
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="wider-header">
        <div className="header-top">
          <span className="header-top-text">Đăng ký tài khoản nhận ngay ưu đãi 20% đơn hàng đầu tiên</span>
          <button className="login-register-btn" onClick={handleLoginRegister}>Đăng nhập / Đăng ký</button>
        </div>
        <div className="header-main">
          <h1 className="logo">coutura mona.</h1>
          <div className="header-buttons">
            <button className="nav-btn" onClick={() => navigate('/Home')}>Trang chủ</button>
            <button className="nav-btn" onClick={() => navigate('/gioithieu')}>Giới thiệu</button>
            <button className="nav-btn" onClick={() => navigate('/sanpham')}>Sản phẩm</button>
            <button className="nav-btn" onClick={() => navigate('/tintuc')}>Tin tức</button>
            <button className="nav-btn" onClick={() => navigate('/contact')}>Liên hệ</button>
          </div>
          <div className="header-icons">
            <span className="cursor-pointer hover:text-ff6b6b" aria-label="Tài khoản">👤</span>
            <span className="cursor-pointer hover:text-ff6b6b" aria-label="Giỏ hàng" onClick={() => navigate('/cart')}>🛒</span>
            <span className="cursor-pointer hover:text-ff6b6b" aria-label="Yêu thích">❤️</span>
            <span className="cursor-pointer hover:text-ff6b6b" aria-label="So sánh">🔄</span>
            <span className="cursor-pointer hover:text-ff6b6b" aria-label="Tìm kiếm">🔍</span>
          </div>
        </div>
      </header>
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
          <button
            className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-ff6b6b"
            onClick={() => navigate('/Home')}
            aria-label="Đóng"
            style={{ border: 'none' }}
          >
            ×
          </button>
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Chào mừng đăng nhập!</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="role" className="sr-only">Vai trò</label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ff6b6b"
                disabled={loading}
              >
                <option value="user">Người dùng</option>
                <option value="admin">Admin</option>
              </select>
            </div>
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
                disabled={loading}
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">Mật khẩu</label>
              <input
                id="password"
                type="password"
                placeholder="Mật khẩu *"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ff6b6b"
                required
                disabled={loading}
              />
              <button
                onClick={handleForgotPassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-ff6b6b hover:underline"
                disabled={loading}
                style={{ border: 'none' }}
              >
                Quên mật khẩu?
              </button>
            </div>
            <button
              onClick={handleLogin}
              className={`w-full bg-ff6b6b text-white p-3 rounded-md hover:bg-ff4d4d transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Đang xử lý...' : 'Đăng nhập'}
            </button>
            <p className="text-center text-sm text-gray-600">
              Không phải là thành viên?{' '}
              <a href="/register" className="text-ff6b6b hover:underline">Tạo tài khoản</a>
            </p>
            {error && (
              <p className="text-center text-ff6b6b text-sm">{error}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;