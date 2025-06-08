import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Home.css';

const Home = () => {
  // Tạo danh sách sản phẩm đủ để hiển thị (4 mới + 12 thường)
  const [products] = useState([
    // 4 sản phẩm mới
    { id: 1, name: "Sản phẩm mới 1", price: 1100000, image: "https://via.placeholder.com/300" },
    { id: 2, name: "Sản phẩm mới 2", price: 1200000, image: "https://via.placeholder.com/300" },
    { id: 3, name: "Sản phẩm mới 3", price: 1300000, image: "https://via.placeholder.com/300" },
    { id: 4, name: "Sản phẩm mới 4", price: 1400000, image: "https://via.placeholder.com/300" },
    // 12 sản phẩm thường
    { id: 9, name: "Sản phẩm thường 1", price: 2000000, image: "https://via.placeholder.com/300" },
    { id: 10, name: "Sản phẩm thường 2", price: 2100000, image: "https://via.placeholder.com/300" },
    { id: 11, name: "Sản phẩm thường 3", price: 2200000, image: "https://via.placeholder.com/300" },
    { id: 12, name: "Sản phẩm thường 4", price: 2300000, image: "https://via.placeholder.com/300" },
    { id: 13, name: "Sản phẩm thường 5", price: 2400000, image: "https://via.placeholder.com/300" },
    { id: 14, name: "Sản phẩm thường 6", price: 2500000, image: "https://via.placeholder.com/300" },
    { id: 15, name: "Sản phẩm thường 7", price: 2600000, image: "https://via.placeholder.com/300" },
    { id: 16, name: "Sản phẩm thường 8", price: 2700000, image: "https://via.placeholder.com/300" },
    { id: 17, name: "Sản phẩm thường 9", price: 2800000, image: "https://via.placeholder.com/300" },
    { id: 18, name: "Sản phẩm thường 10", price: 2900000, image: "https://via.placeholder.com/300" },
    { id: 19, name: "Sản phẩm thường 11", price: 3000000, image: "https://via.placeholder.com/300" },
    { id: 20, name: "Sản phẩm thường 12", price: 3100000, image: "https://via.placeholder.com/300" },
  ]);

  const [isAdding, setIsAdding] = useState(null);
  const [imageLoaded, setImageLoaded] = useState({});

  // Tách sản phẩm: 4 sản phẩm mới (1 hàng x 4 cột)
  const newProducts = products.slice(0, 4); 
  // 12 sản phẩm thường (3 hàng x 4 cột)
  const regularProducts = products.slice(4, 16); 

  const handleAddToCart = (productId) => {
    setIsAdding(productId);
    setTimeout(() => {
      setIsAdding(null);
      alert(`Đã thêm sản phẩm ${productId} vào giỏ hàng thành công!`);
    }, 1000);
  };
  
  const renderProductGrid = (productList) => (
    <div className="products">
      {productList.map(product => (
        <div key={product.id} className="product-item">
          <div className="product-image">
            {!imageLoaded[product.id] && <div className="spinner"></div>}
            <img
              src={product.image || "https://via.placeholder.com/300"}
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
      <Header />
      <div className="banner">
        <div className="banner-content">
          <h2>ƯU ĐÃI ĐẶC BIỆT!</h2>
          <button className="shop-now">Mua sắm ngay</button>
        </div>
      </div>
      <div className="product-list">
        {/* === Khu vực 1: Sản phẩm mới (1 hàng x 4 cột) === */}
        <h3>Sản phẩm mới</h3>
        {renderProductGrid(newProducts)}

        {/* === Khu vực 2: Banner sale === */}
        <div className="sale-banner-middle">
            <h2>GIẢM GIÁ SỐC - LÊN TỚI 50%</h2>
            <p>Áp dụng cho hàng ngàn sản phẩm. Cơ hội có hạn!</p>
        </div>

        {/* === Khu vực 3: Sản phẩm thường (3 hàng x 4 cột) === */}
        <h3>Sản phẩm nổi bật</h3>
        {renderProductGrid(regularProducts)}
        
      </div>
      <Footer />
    </div>
  );
};

export default Home;