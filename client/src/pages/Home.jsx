import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Home.css';

const Home = () => {
  const [products] = useState([
    { id: 1, name: "Sản phẩm 1", price: 1000000, image: "https://via.placeholder.com/300" },
    { id: 2, name: "Sản phẩm 2", price: 2000000, image: "https://via.placeholder.com/300" },
    { id: 3, name: "Sản phẩm 3", price: 3000000, image: "https://via.placeholder.com/300" },
    { id: 4, name: "Sản phẩm 4", price: 1500000, image: "https://via.placeholder.com/300" },
    { id: 5, name: "Sản phẩm 5", price: 2500000, image: "https://via.placeholder.com/300" },
    { id: 6, name: "Sản phẩm 6", price: 3500000, image: "https://via.placeholder.com/300" },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAdding, setIsAdding] = useState(null);
  const [imageLoaded, setImageLoaded] = useState({});

  const productsPerPage = 12;
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + productsPerPage);

  const handleAddToCart = (productId) => {
    setIsAdding(productId);
    setTimeout(() => {
      setIsAdding(null);
      alert(`Đã thêm sản phẩm ${productId} vào giỏ hàng thành công!`);
    }, 1000);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    currentProducts.forEach(product => {
      const img = new Image();
      img.src = product.image;
      img.onload = () => setImageLoaded(prev => ({ ...prev, [product.id]: true }));
      img.onerror = () => setImageLoaded(prev => ({ ...prev, [product.id]: true }));
    });
  }, [currentProducts]);

  return (
    <div className="home">
      <Header />
      <div className="banner">
        <div className="banner-content">
          <h2>Ưu đãi đặc biệt - Giảm ngay 20% đơn hàng đầu tiên!</h2>
          <button className="shop-now">Mua sắm ngay</button>
        </div>
      </div>
      <div className="product-list">
        <div className="breadcrumbs">
          <span>Trang chủ</span> - <span>Sản phẩm nổi bật</span>
        </div>
        <h3>Sản phẩm nổi bật</h3>
        <div className="products">
          {currentProducts.map(product => (
            <div key={product.id} className="product-item">
              <div className="product-image">
                {!imageLoaded[product.id] && (
                  <div className="spinner"></div>
                )}
                <img
                  src={product.image || "https://via.placeholder.com/300"}
                  alt={product.name}
                  onLoad={() => setImageLoaded(prev => ({ ...prev, [product.id]: true }))}
                  onError={() => setImageLoaded(prev => ({ ...prev, [product.id]: true }))}
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
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Trước
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Sau
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;