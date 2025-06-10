import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isShrunk, setIsShrunk] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchBarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsShrunk(window.scrollY > 50);
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
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchOpen]);

  const handleSearch = useCallback(async (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost/api/products.php?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      setSearchResults(data.error ? [{ id: 'error', name: 'Lỗi kết nối cơ sở dữ liệu', price: 0, image: '' }]
        : data.length === 0 ? [{ id: 'not-found', name: 'Không tìm thấy sản phẩm', price: 0, image: '' }] : data);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([{ id: 'error', name: 'Lỗi khi tìm kiếm, vui lòng thử lại', price: 0, image: '' }]);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery]);

  const handleSelectProduct = useCallback((product) => {
    if (product.id !== 'not-found' && product.id !== 'error') {
      alert(`Chọn sản phẩm: ${product.name}`);
      setIsSearchOpen(false);
      setSearchQuery('');
      setSearchResults([]);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults([]);
  }, []);

  const renderedResults = useMemo(() => (
    isLoading ? (
      <p style={{ textAlign: 'center', color: '#333' }}>Đang tìm kiếm...</p>
    ) : searchResults.length > 0 && (
      <div className="search-results">
        {searchResults.map(result => (
          <div
            key={result.id}
            className={`search-result-item ${result.id === 'not-found' || result.id === 'error' ? 'error' : ''}`}
            onClick={() => handleSelectProduct(result)}
          >
            {result.id !== 'not-found' && result.id !== 'error' && (
              <img src={result.image} alt={result.name} />
            )}
            <div>
              <h4>{result.name}</h4>
              {result.price > 0 && <p>{result.price.toLocaleString()} VND</p>}
              {result.category && <p style={{ color: '#666', fontSize: '14px' }}>Danh mục: {result.category}</p>}
            </div>
          </div>
        ))}
      </div>
    )
  ), [isLoading, searchResults, handleSelectProduct]);

  return (
    <header className={`header ${isShrunk ? 'shrunk' : ''}`}>
      <div className="header-container">
        <div className="logo">
          <Link to="/">HUNIVA Fashion</Link>
        </div>
        <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span><span></span><span></span>
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
                  placeholder="Tìm kiếm sản phẩm hoặc danh mục..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && <span className="clear-search" onClick={clearSearch}>X</span>}
              </div>
              <button type="submit" className="search-icon" disabled={isLoading}>
                <span className="icon">🔍</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;