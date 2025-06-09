import React, { useState, useEffect } from 'react';
import './ContactPage.css';
import { useNavigate } from 'react-router-dom';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [mapCenter] = useState({ lat: 10.7769, lng: 106.7009 }); // Tọa độ TP.HCM
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn) setIsLoggedIn(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setResponse('Vui lòng đăng nhập để gửi liên hệ!');
      return;
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = await res.json();
      setResponse(data.message || 'Gửi liên hệ thành công');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err) {
      setResponse('Gửi liên hệ thất bại');
    }
  };

  return (
    <div className="contact-container">
      <header className="header">
        <div className="header-top">
          <span style={{ color: '#808080' }}>Sử dụng mã giảm giá 20% cho đơn hàng đầu tiên</span>
          <span className="login-status" onClick={() => navigate('/login')}>Đăng nhập / Đăng ký</span>
        </div>
        <div className="header-main">
          <h1 className="logo">coutura mona.</h1>
          <div className="header-buttons">
            <button className="nav-btn" onClick={() => navigate('/trangchu')}>Trang chủ</button>
            <button className="nav-btn" onClick={() => navigate('/gioithieu')}>Giới thiệu</button>
            <button className="nav-btn" onClick={() => navigate('/sanpham')}>Sản phẩm</button>
            <button className="nav-btn" onClick={() => navigate('/tintuc')}>Tin tức</button>
            <button className="nav-btn active">Liên hệ</button>
          </div>
          <div className="header-icons">
            <span onClick={() => { isLoggedIn ? navigate('/logout') : navigate('/login'); }}>👤</span>
            <span onClick={() => navigate('/cart')}>🛒</span>
            <span onClick={() => navigate('/wishlist')}>❤️</span>
            <span onClick={() => navigate('/refresh')}>🔄</span>
            <span onClick={() => navigate('/search')}>🔍</span>
          </div>
        </div>
      </header>
      <div className="contact-content">
        <h2>Liên hệ</h2>
        <div className="contact-map">
          <div className="map-placeholder" style={{ height: '300px', background: '#e0e0e0' }}>
            <p>Bản đồ: 107/23 Cạch Mạng Thăng 8, P.7, Tân Bình, TP.HCM</p>
          </div>
        </div>
        <div className="contact-info">
          <div className="info-item">
            <h3>Địa chỉ</h3>
            <p>107/23 Cạch Mạng Thăng 8, P.7, Tân Bình, TP.HCM</p>
          </div>
          <div className="info-item">
            <h3>Điện thoại</h3>
            <p>(+84) 0313-728-397</p>
          </div>
          <div className="info-item">
            <h3>Email</h3>
            <p>info@themonaglobal.com</p>
          </div>
          <div className="info-item">
            <h3>Mạng xã hội</h3>
            <p>Facebook | Instagram</p>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Họ và tên (*)" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" placeholder="Email (*)" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="text" placeholder="Chủ đề (*)" value={subject} onChange={(e) => setSubject(e.target.value)} required />
          <textarea placeholder="Nội dung (*)" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
          <button type="submit" className="submit-btn">Gửi</button>
        </form>
        {response && <p className="response">{response}</p>}
      </div>
    </div>
  );
};

export default ContactPage;