import React from 'react';
import Login from '../components/Login';

function LoginPage() {
  const handleLoginSuccess = () => {
    alert('Đăng nhập thành công!');
    // Có thể dùng navigate('/') nếu muốn về trang chính
  };

  return <Login onLogin={handleLoginSuccess} />;
}

export default LoginPage;
