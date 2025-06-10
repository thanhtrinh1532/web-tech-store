import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import './Home.css';

/**
 * Home component displays the main page with product sections (female, male, popular, etc.).
 * Includes search functionality and product grid rendering using ProductCard.
 */
const Home = () => {
  const [products] = useState([
    // Female products
    { id: 1, name: "Váy maxi nữ", price: 800000, image: "https://via.placeholder.com/300", category: "nữ" },
    { id: 2, name: "Áo sơ mi nữ", price: 450000, image: "https://via.placeholder.com/300", category: "nữ" },
    { id: 3, name: "Áo croptop nữ", price: 300000, image: "https://via.placeholder.com/300", category: "nữ" },
    { id: 4, name: "Quần culottes nữ", price: 350000, image: "https://via.placeholder.com/300", category: "nữ" },
    { id: 5, name: "Áo hoodie nữ", price: 1200000, image: "https://via.placeholder.com/300", category: "nữ" },
    { id: 6, name: "Áo len nữ", price: 400000, image: "https://via.placeholder.com/300", category: "nữ" },
    // Male products
    { id: 7, name: "Áo thun nam", price: 250000, image: "https://via.placeholder.com/300", category: "nam" },
    { id: 8, name: "Quần jeans nam", price: 600000, image: "https://via.placeholder.com/300", category: "nam" },
    { id: 9, name: "Áo hoodie nam", price: 350000, image: "https://via.placeholder.com/300", category: "nam" },
    { id: 10, name: "Áo khoác nam", price: 1000000, image: "https://via.placeholder.com/300", category: "nam" },
    { id: 11, name: "Áo sơ mi nam", price: 400000, image: "https://via.placeholder.com/300", category: "nam" },
    { id: 12, name: "Quần short nam", price: 300000, image: "https://via.placeholder.com/300", category: "nam" },
    // Popular, bestseller, promotion
    { id: 13, name: "Áo thun phổ biến", price: 200000, image: "https://via.placeholder.com/300", type: "popular" },
    { id: 14, name: "Quần jeans phổ biến", price: 550000, image: "https://via.placeholder.com/300", type: "popular" },
    { id: 15, name: "Áo khoác phổ biến", price: 900000, image: "https://via.placeholder.com/300", type: "popular" },
    { id: 16, name: "Váy bán chạy", price: 700000, image: "https://via.placeholder.com/300", type: "bestseller" },
    { id: 17, name: "Áo croptop bán chạy", price: 280000, image: "https://via.placeholder.com/300", type: "bestseller" },
    { id: 18, name: "Quần culottes bán chạy", price: 320000, image: "https://via.placeholder.com/300", type: "bestseller" },
    { id: 19, name: "Áo thun khuyến mãi", price: 150000, image: "https://via.placeholder.com/300", type: "promotion" },
    { id: 20, name: "Quần short khuyến mãi", price: 200000, image: "https://via.placeholder.com/300", type: "promotion" },
    { id: 21, name: "Đầm khuyến mãi", price: 600000, image: "https://via.placeholder.com/300", type: "promotion" },
    // Newest products
    { id: 22, name: "Sản phẩm mới 1", price: 300000, image: "https://via.placeholder.com/300", type: "newest" },
    { id: 23, name: "Sản phẩm mới 2", price: 310000, image: "https://via.placeholder.com/300", type: "newest" },
    { id: 24, name: "Sản phẩm mới 3", price: 320000, image: "https://via.placeholder.com/300", type: "newest" },
    { id: 25, name: "Sản phẩm mới 4", price: 330000, image: "https://via.placeholder.com/300", type: "newest" },
    { id: 26, name: "Sản phẩm mới 5", price: 340000, image: "https://via.placeholder.com/300", type: "newest" },
    { id: 27, name: "Sản phẩm mới 6", price: 350000, image: "https://via.placeholder.com/300", type: "newest" },
    { id: 28, name: "Sản phẩm mới 7", price: 360000, image: "https://via.placeholder.com/300", type: "newest" },
    { id: 29, name: "Sản phẩm mới 8", price: 370000, image: "https://via.placeholder.com/300", type: "newest" },
    { id: 30, name: "Sản phẩm mới 9", price: 380000, image: "https://via.placeholder.com/300", type: "newest" },
    { id: 31, name: "Sản phẩm mới 10", price: 390000, image: "https://via.placeholder.com/300", type: "newest" },
  ]);

  const [isAdding, setIsAdding] = useState(null);
  const [imageLoaded, setImageLoaded] = useState({});
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const searchBarRef = useRef(null);

  // Memoized product filters
  const femaleProducts = useMemo(() => products.filter(p => p.category === "nữ").slice(0, 6), [products]);
  const maleProducts = useMemo(() => products.filter(p => p.category === "nam").slice(0, 6), [products]);
  const popularProducts = useMemo(() => products.filter(p => p.type === "popular").slice(0, 3), [products]);
  const bestsellerProducts = useMemo(() => products.filter(p => p.type === "bestseller").slice(0, 3), [products]);
  const promotionProducts = useMemo(() => products.filter(p => p.type === "promotion").slice(0, 3), [products]);
  const newestProducts = useMemo(() => products.filter(p => p.type === "newest").slice(0, 10), [products]);

  // Handle add to cart
  const handleAddToCart = useCallback((productId) => {
    setIsAdding(productId);
    setTimeout(() => {
      setIsAdding(null);
      alert(`Đã thêm sản phẩm ${productId} vào giỏ hàng thành công!`);
    }, 1000);
  }, []);

  // Handle search
  const handleSearch = useCallback((e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) {
      setSearchResults([]);
      return;
    }
    const normalizedQuery = query.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const results = products.filter(p =>
      p.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(normalizedQuery)
    );
    setSearchResults(results.length === 0 ? [{ id: 'not-found', name: 'Không tìm thấy sản phẩm', price: 0, image: '' }] : results);
  }, [searchQuery, products]);

  // Close search bar
  const handleCloseSearch = useCallback(() => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  }, []);

  // Handle product selection from search
  const handleSelectProduct = useCallback((product) => {
    if (product.id !== 'not-found') {
      alert(`Chọn sản phẩm: ${product.name}`);
      handleCloseSearch();
    }
  }, [handleCloseSearch]);

  // Clear search input
  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults([]);
  }, []);

  // Handle scroll for header
  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside search bar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        handleCloseSearch();
      }
    };
    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchOpen, handleCloseSearch]);

  // Render product grid
  const renderProductGrid = useCallback((productList, columns = 1) => (
    <div className="products" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {productList.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          isAdding={isAdding}
          handleAddToCart={handleAddToCart}
          imageLoaded={imageLoaded}
          setImageLoaded={setImageLoaded}
        />
      ))}
    </div>
  ), [isAdding, handleAddToCart, imageLoaded, setImageLoaded]);

  return (
    <div className="home">
      <Header onSearchClick={() => setIsSearchOpen(true)} scrollPosition={scrollPosition} />
      {isSearchOpen && (
        <div className="search-bar-container" ref={searchBarRef}>
          <div className="close-search" onClick={handleCloseSearch}>X</div>
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
      <div className="banner">
        <div className="banner-content">
          <h2>ƯU ĐÃI ĐẶC BIỆT!</h2>
          <button className="shop-now">Mua sắm ngay</button>
        </div>
      </div>
      <div className="product-list">
        {/* Female Section */}
        <div className="gender-section">
          <div className="gender-image">
            <img src="https://coutura.monamedia.net/wp-content/uploads/2017/01/fashion-1-women.jpg" alt="Nữ giới" />
          </div>
          <div className="gender-products-female">
            <h3 className="left">Thời trang nữ</h3>
            <hr />
            {renderProductGrid(femaleProducts, 3)}
          </div>
        </div>
        {/* 50% Discount Banner */}
        <div className="sale-banner-middle">
          <h2>GIẢM GIÁ 50% CHO TẤT CẢ SẢN PHẨM!</h2>
          <p>Nhanh tay đặt hàng ngay hôm nay!</p>
        </div>
        {/* Male Section */}
        <div className="gender-section">
          <div className="gender-products-male">
            <h3 className="right">Thời trang nam</h3>
            <hr />
            {renderProductGrid(maleProducts, 3)}
          </div>
          <div className="gender-image">
            <img src="https://coutura.monamedia.net/wp-content/uploads/2017/01/fashion-1-men.jpg" alt="Nam giới" />
          </div>
        </div>
        {/* 20% Discount Banner */}
        <div className="sale-banner-middle">
          <h2>GIẢM GIÁ 20% CHO TÀI KHOẢN MỚI</h2>
          <p>Đăng ký ngay hôm nay để nhận ưu đãi đặc biệt!</p>
        </div>
        {/* Popular, Bestseller, Promotion Sections */}
        <div className="category-sections">
          <div className="category-column">
            <h3>Phổ biến</h3>
            {renderProductGrid(popularProducts, 1)}
          </div>
          <div className="category-column">
            <h3>Bán chạy</h3>
            {renderProductGrid(bestsellerProducts, 1)}
          </div>
          <div className="category-column">
            <h3>Khuyến mãi</h3>
            {renderProductGrid(promotionProducts, 1)}
          </div>
        </div>
        {/* Newest Products */}
        <h3>Mới nhất</h3>
        {renderProductGrid(newestProducts, 5)}
      </div>
      <Footer />
    </div>
  );
};

export default Home;