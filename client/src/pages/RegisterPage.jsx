import React from 'react';
import Register from '../components/Register';

function RegisterPage() {
  const handleRegisterSuccess = (email) => {
    alert(`Đăng ký thành công cho ${email}!`);
    // Sau này có thể chuyển hướng về trang chủ hoặc đăng nhập
  };

  return <Register onRegister={handleRegisterSuccess} />;
}

export default RegisterPage;
