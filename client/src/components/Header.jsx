import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ onSearchClick }) => {
  const [isShrunk, setIsShrunk] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0); // Số lượng giỏ hàng
  const [wishlistCount, setWishlistCount] = useState(0); // Số lượng yêu thích

  useEffect(() => {
    const handleScroll = () => {
      setIsShrunk(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isShrunk ? 'shrunk' : ''}`}>
      <div className="header-container">
        <div className="logo">
          <Link to="/">HUNIVA Fashion</Link>
        </div>
        <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            <li><Link to="/">Trang chủ</Link></li>
            <li><Link to="/">Giới thiệu</Link></li>
            <li><Link to="/products">Sản phẩm</Link></li>
            <li><Link to="/news">Tin tức</Link></li>
            <li><Link to="/contact">Liên hệ</Link></li>
          </ul>
        </nav>
        <div className="user-actions">
          <Link to="/cart" className="icon-button">
            <span className="icon">🛒</span>
            <span className="count">{cartCount}</span>
          </Link>
          <Link to="/wishlist" className="icon-button">
            <span className="icon">❤️</span>
            <span className="count">{wishlistCount}</span>
          </Link>
          <button className="icon-button" onClick={onSearchClick}>
            <span className="icon">🔍</span>
          </button>
          <Link to="/login" className="account-link">Tài khoản</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;