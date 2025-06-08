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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="w-full bg-white shadow-sm">
        <div className="flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">coutura mona.</h1>
          <div className="flex space-x-4">
            <button className="text-gray-700 hover:text-blue-600 transition" onClick={() => navigate('/trangchu')}>Trang chủ</button>
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
            onClick={() => navigate('/trangchu')}
            aria-label="Đóng"
          >
            ×
          </button>
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Đăng ký tài khoản</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              onClick={handleRegister}
              className="w-full bg-red-500 text-white p-3 rounded-md hover:bg-red-600 transition pulse"
            >
              Đăng ký
            </button>
            <p className="text-center text-sm text-gray-600">
              Đã có tài khoản?{' '}
              <a href="/login" className="text-red-500 hover:underline">Đăng nhập</a>
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

export default RegisterPage;