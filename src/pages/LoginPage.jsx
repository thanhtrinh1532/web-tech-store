import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
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
        localStorage.setItem('role', data.role);
        if (data.role === 'admin') navigate('/admin-dashboard');
        else navigate('/user-dashboard');
      } else {
        setError(data.message || 'Đăng nhập thất bại. Vui lòng thử lại!');
      }
    } catch (err) {
      setError('Lỗi kết nối. Vui lòng thử lại sau!');
    }
  };

  const handleForgotPassword = () => {
    alert('Gửi yêu cầu khôi phục mật khẩu qua email!');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="w-full bg-white shadow-sm">
        <div className="flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">coutura mona.</h1>
          <div className="flex space-x-4">
            <button className="text-gray-700 hover:text-blue-600 transition" onClick={() => navigate('/Home')}>Trang chủ</button>
            <button className="text-gray-700 hover:text-blue-600 transition" onClick={() => navigate('/gioithieu')}>Giới thiệu</button>
            <button className="text-gray-700 hover:text-blue-600 transition" onClick={() => navigate('/sanpham')}>Sản phẩm</button>
            <button className="text-gray-700 hover:text-blue-600 transition" onClick={() => navigate('/tintuc')}>Tin tức</button>
            <button className="text-gray-700 hover:text-blue-600 transition" onClick={() => navigate('/contact')}>Liên hệ</button>
          </div>
          <div className="flex space-x-3 text-xl">
            <span className="cursor-pointer hover:text-blue-600" aria-label="Tài khoản">👤</span>
            <span className="cursor-pointer hover:text-blue-600" aria-label="Giỏ hàng">🛒</span>
            <span className="cursor-pointer hover:text-blue-600" aria-label="Yêu thích">❤️</span>
            <span className="cursor-pointer hover:text-blue-600" aria-label="So sánh">🔄</span>
            <span className="cursor-pointer hover:text-blue-600" aria-label="Tìm kiếm">🔍</span>
          </div>
        </div>
      </header>
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md fade-in relative">
          <button
            className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-red-600"
            onClick={() => navigate('/Home')}
            aria-label="Đóng"
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
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
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
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                onClick={handleForgotPassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-blue-600 hover:underline"
              >
                Quên mật khẩu?
              </button>
            </div>
            <button
              onClick={handleLogin}
              className="w-full bg-red-500 text-white p-3 rounded-md hover:bg-red-600 transition pulse"
            >
              Đăng nhập
            </button>
            <p className="text-center text-sm text-gray-600">
              Không phải là thành viên?{' '}
              <a href="/register" className="text-red-500 hover:underline">Tạo tài khoản</a>
            </p>
            {error && (
              <p className="text-center text-red-600 text-sm shake">{error}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;