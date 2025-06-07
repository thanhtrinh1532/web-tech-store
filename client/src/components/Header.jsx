import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isShrunk, setIsShrunk] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <Link to="/">Tech Store</Link>
        </div>
        <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={`nav ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            <li><Link to="/">Trang chủ</Link></li>
            <li><Link to="/products">Sản phẩm</Link></li>
            <li><Link to="/news">Tin tức</Link></li>
            <li><Link to="/contact">Liên hệ</Link></li>
          </ul>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Tìm kiếm..." />
          <button>🔍</button>
        </div>
        <div className="user-actions">
          <Link to="/cart">
            <span className="icon cart-icon">🛒</span>
            <span className="count">{cartCount}</span>
          </Link>
          <Link to="/wishlist">
            <span className="icon wishlist-icon">❤️</span>
            <span className="count">{wishlistCount}</span>
          </Link>
          <Link to="/login">Tài khoản</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;