import React, { useState, useEffect } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [isLimitReached, setIsLimitReached] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn) setIsLoggedIn(true);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3); // 3 slides
    }, 5000);
    // Tải dữ liệu sản phẩm
    const productData = [
      { id: 1, name: 'Classic Knit Coat', price: '620,000đ', img: 'p1.jpg' },
      { id: 2, name: 'Jacket with Slogan', price: '780,000đ', img: 'p2.jpg' },
      { id: 3, name: 'T-shirt with Ruffled Skirt', price: '590,000đ', img: 'p3.jpg' },
      { id: 4, name: 'Yellow Puffy Dress', price: '960,000đ', img: 'p4.jpg' },
    ];
    setProducts(productData);
    return () => clearInterval(timer);
  }, []);

  const slides = [
    { id: 1, title: 'Autumn & Winter 2024', desc: 'Khám phá bộ sưu tập mới', img: 'slide1.jpg' },
    { id: 2, title: 'Spring Summer 2024', desc: 'Phong cách mùa hè rực rỡ', img: 'slide2.jpg' },
    { id: 3, title: 'New Arrivals', desc: 'Sản phẩm hot nhất', img: 'slide3.jpg' },
  ];

  const handleViewMore = () => {
    navigate('/sanpham');
  };

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    if (cartCount >= 5) {
      setIsLimitReached(true);
      return;
    }
    setCartCount(cartCount + 1);
    alert(`Đã thêm ${product.name} vào giỏ hàng!`);
    // Gọi API thêm vào giỏ hàng tại đây nếu cần
  };

  const handleProductDetail = (id) => {
    navigate(`/product/${id}`);
  };

  const navigateToPage = (path) => {
    if (isLoggedIn || path === '/contact') {
      navigate(path);
    } else {
      navigate('/login');
    }
  };

  const closeLimitModal = () => {
    setIsLimitReached(false);
  };

  return (
    <div className="home-container">
      <header className="header">
        <div className="header-top">
          <span style={{ color: '#808080' }}>Sử dụng mã giảm giá 20% cho đơn hàng đầu tiên</span>
          <span className="login-status" onClick={() => navigateToPage('/login')}>Đăng nhập / Đăng ký</span>
        </div>
        <div className="header-main">
          <h1 className="logo">coutura mona.</h1>
          <div className="header-buttons">
            <button className="nav-btn" onClick={() => navigateToPage('/trangchu')}>Trang chủ</button>
            <button className="nav-btn" onClick={() => navigateToPage('/gioithieu')}>Giới thiệu</button>
            <button className="nav-btn" onClick={() => navigateToPage('/sanpham')}>Sản phẩm</button>
            <button className="nav-btn" onClick={() => navigateToPage('/tintuc')}>Tin tức</button>
            <button className="nav-btn" onClick={() => navigateToPage('/contact')}>Liên hệ</button>
          </div>
          <div className="header-icons">
            <span onClick={() => navigateToPage('/login')}>👤</span>
            <span onClick={() => navigateToPage('/cart')} className="cart-icon">{cartCount > 0 && <span className="cart-count">{cartCount}</span>}</span>
            <span onClick={() => navigateToPage('/wishlist')}>❤️</span>
            <span onClick={() => navigateToPage('/refresh')}>🔄</span>
            <span onClick={() => navigateToPage('/search')}>🔍</span>
          </div>
        </div>
      </header>
      <div className="carousel">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.img})` }}
          >
            <div className="slide-content">
              <h2>{slide.title}</h2>
              <p>{slide.desc}</p>
              <button className="view-more" onClick={handleViewMore}>Xem thêm</button>
            </div>
          </div>
        ))}
        <button className="prev" onClick={() => setCurrentSlide((prev) => (prev - 1 + 3) % 3)}>❮</button>
        <button className="next" onClick={() => setCurrentSlide((prev) => (prev + 1) % 3)}>❯</button>
      </div>
      <div className="product-section">
        <h2>Sản phẩm mới</h2>
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.img} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p className="product-price">{product.price}</p>
              <div className="product-actions">
                <button className="detail-btn" onClick={() => handleProductDetail(product.id)}>Xem chi tiết</button>
                <button className="add-cart-btn" onClick={() => handleAddToCart(product)}>Thêm vào giỏ</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isLimitReached && (
        <div className="limit-modal">
          <div className="modal-content">
            <h3>Giới hạn giỏ hàng</h3>
            <p>Bạn đã đạt giới hạn 5 sản phẩm trong giỏ hàng!</p>
            <button className="close-modal" onClick={closeLimitModal}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;