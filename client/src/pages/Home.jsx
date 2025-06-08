import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Home.css';

const Home = () => {
  const [products] = useState([
    // 6 female products
    { id: 1, name: "Váy maxi nữ", price: 800000, image: "https://via.placeholder.com/300", category: "nữ" },
    { id: 2, name: "Áo sơ mi nữ", price: 450000, image: "https://via.placeholder.com/300", category: "nữ" },
    { id: 3, name: "Áo croptop nữ", price: 300000, image: "https://via.placeholder.com/300", category: "nữ" },
    { id: 4, name: "Quần culottes nữ", price: 350000, image: "https://via.placeholder.com/300", category: "nữ" },
    { id: 5, name: "Đầm dự tiệc", price: 1200000, image: "https://via.placeholder.com/300", category: "nữ" },
    { id: 6, name: "Áo len nữ", price: 400000, image: "https://via.placeholder.com/300", category: "nữ" },
    // 6 male products
    { id: 7, name: "Áo thun nam", price: 250000, image: "https://via.placeholder.com/300", category: "nam" },
    { id: 8, name: "Quần jeans nam", price: 600000, image: "https://via.placeholder.com/300", category: "nam" },
    { id: 9, name: "Áo hoodie nam", price: 350000, image: "https://via.placeholder.com/300", category: "nam" },
    { id: 10, name: "Áo khoác nam", price: 1000000, image: "https://via.placeholder.com/300", category: "nam" },
    { id: 11, name: "Áo sơ mi nam", price: 400000, image: "https://via.placeholder.com/300", category: "nam" },
    { id: 12, name: "Quần short nam", price: 300000, image: "https://via.placeholder.com/300", category: "nam" },
    // 12 products for popular, best-seller, promotion (4 each)
    { id: 13, name: "Áo thun phổ biến", price: 200000, image: "https://via.placeholder.com/300", type: "popular" },
    { id: 14, name: "Quần jeans phổ biến", price: 550000, image: "https://via.placeholder.com/300", type: "popular" },
    { id: 15, name: "Áo khoác phổ biến", price: 900000, image: "https://via.placeholder.com/300", type: "popular" },
    { id: 16, name: "Váy phổ biến", price: 700000, image: "https://via.placeholder.com/300", type: "popular" },
    { id: 17, name: "Váy bán chạy", price: 700000, image: "https://via.placeholder.com/300", type: "bestseller" },
    { id: 18, name: "Áo croptop bán chạy", price: 280000, image: "https://via.placeholder.com/300", type: "bestseller" },
    { id: 19, name: "Quần culottes bán chạy", price: 320000, image: "https://via.placeholder.com/300", type: "bestseller" },
    { id: 20, name: "Áo thun bán chạy", price: 200000, image: "https://via.placeholder.com/300", type: "bestseller" },
    { id: 21, name: "Áo thun khuyến mãi", price: 150000, image: "https://via.placeholder.com/300", type: "promotion" },
    { id: 22, name: "Quần short khuyến mãi", price: 200000, image: "https://via.placeholder.com/300", type: "promotion" },
    { id: 23, name: "Đầm khuyến mãi", price: 600000, image: "https://via.placeholder.com/300", type: "promotion" },
    { id: 24, name: "Áo khoác khuyến mãi", price: 900000, image: "https://via.placeholder.com/300", type: "promotion" },
    // 12 newest products
    { id: 25, name: "Sản phẩm mới 1", price: 300000, image: "https://via.placeholder.com/300", type: "newest" },
    { id: 26, name: "Sản phẩm mới 2", price: 310000, image: "https://via.placeholder.com/300", type: "newest" },
    { id: 27, name: "Sản phẩm mới 3", price: 320000, image: "https://via.placeholder.com/300", type: "newest" },
    { id: 28, name: "Sản phẩm mới 4", price: 330000, image: "https://via.placeholder.com/300", type: "newest" },
    { id: 29, name: "Sản phẩm mới 5", price: 340000, image: "https://via.placeholder.com/300", type: "newest" },
    { id: 30, name: "Sản phẩm mới 6", price: 350000, image: "https://via.placeholder.com/300", type: "newest" },
    { id: 31, name: "Sản phẩm mới 7", price: 360000, image: "https://via.placeholder.com/300", type: "newest" },
    { id: 32, name: "Sản phẩm mới 8", price: 370000, image: "https://via.placeholder.com/300", type: "newest" },
    { id: 33, name: "Sản phẩm mới 9", price: 380000, image: "https://via.placeholder.com/300", type: "newest" },
    { id: 34, name: "Sản phẩm mới 10", price: 390000, image: "https://via.placeholder.com/300", type: "newest" },
    { id: 35, name: "Sản phẩm mới 11", price: 400000, image: "https://via.placeholder.com/300", type: "newest" },
    { id: 36, name: "Sản phẩm mới 12", price: 410000, image: "https://via.placeholder.com/300", type: "newest" },
  ]);

  const [isAdding, setIsAdding] = useState(null);
  const [imageLoaded, setImageLoaded] = useState({});
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const femaleProducts = products.filter(p => p.category === "nữ");
  const maleProducts = products.filter(p => p.category === "nam");
  const popularProducts = products.filter(p => p.type === "popular");
  const bestsellerProducts = products.filter(p => p.type === "bestseller");
  const promotionProducts = products.filter(p => p.type === "promotion");
  const newestProducts = products.filter(p => p.type === "newest");

  const handleAddToCart = (productId) => {
    setIsAdding(productId);
    setTimeout(() => {
      setIsAdding(null);
      alert(`Đã thêm sản phẩm ${productId} vào giỏ hàng thành công!`);
    }, 1000);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase().trim();
    if (query) {
      const results = products.filter(p => p.name.toLowerCase().includes(query));
      setSearchResults(results.length === 0 ? [{ id: 'not-found', name: 'Không tìm thấy sản phẩm', price: 0, image: '' }] : results);
    } else {
      setSearchResults([]);
    }
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleSelectProduct = (product) => {
    alert(`Chọn sản phẩm: ${product.name}`);
    handleCloseSearch();
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const renderProductGrid = (productList, isSmall = false) => (
    <div className={`products ${isSmall ? 'small' : ''}`}>
      {productList.map(product => (
        <div key={product.id} className="product-item">
          <div className="product-image">
            {!imageLoaded[product.id] && <div className="spinner"></div>}
            <img
              src={product.image}
              alt={product.name}
              onLoad={() => setImageLoaded(prev => ({ ...prev, [product.id]: true }))}
              style={{ display: imageLoaded[product.id] ? 'block' : 'none' }}
            />
          </div>
          <div className="cart-container">
            <button
              className="add-to-cart"
              onClick={() => !isAdding && handleAddToCart(product.id)}
              disabled={isAdding === product.id}
            >
              {isAdding === product.id ? 'Đang thêm...' : 'Thêm vào giỏ hàng'}
            </button>
          </div>
          <div className="product-info">
            <h4>{product.name}</h4>
            <p>{product.price.toLocaleString()} VND</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="home">
      <Header onSearchClick={() => setIsSearchOpen(true)} />
      {isSearchOpen && (
        <div className="search-bar-container">
          <div className="search-bar">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && <span className="clear-search" onClick={clearSearch}>X</span>}
              <button type="submit">Tìm</button>
            </form>
            <span className="close-search" onClick={handleCloseSearch}>X</span>
          </div>
          {searchResults.length > 0 && (
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
        <h3>Thời trang nữ</h3>
        <div className="gender-section female">
          <div className="gender-image">
            <img src="https://via.placeholder.com/400x600?text=Nữ" alt="Nữ giới" />
          </div>
          <div className="gender-products">
            {renderProductGrid(femaleProducts)}
          </div>
        </div>

        {/* 50% Discount Banner */}
        <div className="sale-banner-middle">
          <h2>GIẢM GIÁ 50% CHO TẤT CẢ SẢN PHẨM!</h2>
          <p>Nhanh tay đặt hàng ngay hôm nay!</p>
        </div>

        {/* Male Section */}
        <h3>Thời trang nam</h3>
        <div className="gender-section male">
          <div className="gender-products">
            {renderProductGrid(maleProducts)}
          </div>
          <div className="gender-image">
            <img src="https://via.placeholder.com/400x600?text=Nam" alt="Nam giới" />
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
            {renderProductGrid(popularProducts, true)}
          </div>
          <div className="category-column">
            <h3>Bán chạy</h3>
            {renderProductGrid(bestsellerProducts, true)}
          </div>
          <div className="category-column">
            <h3>Khuyến mãi</h3>
            {renderProductGrid(promotionProducts, true)}
          </div>
        </div>

        {/* Newest Products */}
        <h3>Mới nhất</h3>
        {renderProductGrid(newestProducts)}
      </div>
      <Footer />
    </div>
  );
};

export default Home;