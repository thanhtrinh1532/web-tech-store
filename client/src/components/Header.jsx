import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ onSearchClick, products = [] }) => {
  const [isShrunk, setIsShrunk] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchBarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsShrunk(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setIsSearchOpen(false);
        setSearchQuery('');
        setSearchResults([]);
      }
    };

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      const normalizedQuery = query.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
      const results = products.filter(p => {
        const normalizedName = p.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
        return normalizedName.includes(normalizedQuery);
      });
      setSearchResults(results.length === 0 ? [{ id: 'not-found', name: 'Không tìm thấy sản phẩm', price: 0, image: '' }] : results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectProduct = (product) => {
    alert(`Chọn sản phẩm: ${product.name}`);
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

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
            <li><Link to="/about">Giới thiệu</Link></li>
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
          <button className="icon-button" onClick={() => setIsSearchOpen(true)}>
            <span className="icon">🔍</span>
          </button>
          <Link to="/login" className="account-link">Tài khoản</Link>
        </div>
      </div>
      {isSearchOpen && (
        <div className="search-bar-container" ref={searchBarRef}>
          <div className="close-search" onClick={() => {
            setIsSearchOpen(false);
            setSearchQuery('');
            setSearchResults([]);
          }}>X</div>
          <div className="search-bar">
            <form onSubmit={handleSearch}>
              <div className="search-input-wrapper">
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && <span className="clear-search" onClick={clearSearch}>X</span>}
              </div>
              <button type="submit" className="search-icon">
                <span className="icon">🔍</span>
              </button>
            </form>
          </div>
          {searchResults.length > 0 && (
            <div className="search-results-container">
              <div className="search-results">
                {searchResults.map(result => (
                  result.id === 'not-found' ? (
                    <p key="not-found" style={{ textAlign: 'center', color: 'red' }}>{result.name}</p>
                  ) : (
                    <div key={result.id} className="search-result-item" onClick={() => handleSelectProduct(result)}>
                      <img src={result.image} alt={result.name} />
                      <div>
                        <h4>{result.name}</h4>
                        <p>{result.price.toLocaleString()} VND</p>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;