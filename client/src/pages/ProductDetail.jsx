import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './ProductDetail.css';

/**
 * ProductDetail component displays detailed information for a single product.
 */
const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Temporary product data
  const products = [
    { id: 1, name: "Steady coats", price: 129000, image: "https://via.placeholder.com/300", description: "Lorem ipsum is simply dummy text of the printing and typesetting industry.", status: "có sẵn" },
    { id: 2, name: "Áo thun nam đen", price: 250000, image: "https://via.placeholder.com/300", category: "nam", status: "có sẵn", description: "Áo thun nam chất liệu cotton cao cấp, thoáng mát." },
    { id: 3, name: "Áo sơ mi nữ trắng", price: 450000, image: "https://via.placeholder.com/300", category: "nữ", status: "sale", description: "Áo sơ mi nữ phong cách tối giản." },
    { id: 4, name: "Quần jeans nam", price: 600000, image: "https://via.placeholder.com/300", category: "nam", status: "đặt trước", description: "Quần jeans nam form chuẩn." },
    { id: 5, name: "Váy maxi nữ", price: 800000, image: "https://via.placeholder.com/300", category: "nữ", status: "có sẵn", description: "Váy maxi nữ dài nhẹ nhàng." },
    // Thêm dữ liệu giả
    ...Array.from({ length: 45 }, (_, i) => ({
      id: 6 + i,
      name: `Sản phẩm ${6 + i}`,
      price: 200000 + (i * 10000),
      image: "https://via.placeholder.com/300",
      status: ["có sẵn", "sale", "đặt trước"][i % 3],
      description: `Mô tả cho sản phẩm ${6 + i}.`,
    })),
  ];

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(productId));
    setProduct(foundProduct || null);
  }, [productId]);

  const handleAddToCart = useCallback(() => {
    if (!isAdding) {
      setIsAdding(true);
      setTimeout(() => {
        setIsAdding(false);
        alert(`Đã thêm ${product.name} vào giỏ hàng thành công!`);
      }, 1000);
    }
  }, [isAdding, product]);

  const handleBuyNow = useCallback(() => {
    alert(`Mua ngay ${product.name}!`);
  }, [product]);

  const toggleFavorite = useCallback(() => {
    setIsFavorited(prev => !prev);
  }, []);

  if (!product) {
    return (
      <div className="home">
        <Header />
        <div className="product-detail">
          <p>Sản phẩm không tồn tại.</p>
          <Link to="/products">Quay lại danh sách sản phẩm</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="home">
      <Header />
      <div className="product-detail">
        <div className="product-detail-container">
          <div className="product-image">
            {!imageLoaded && <div className="spinner" />}
            <img
              src={product.image}
              alt={product.name}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
              style={{ display: imageLoaded ? 'block' : 'none' }}
            />
            <span className={`heart-icon ${isFavorited ? 'favorited' : ''}`} onClick={toggleFavorite}>
              ♥
            </span>
          </div>
          <div className="product-info">
            <h1>{product.name}</h1>
            <p className="price">{product.price.toLocaleString()}đ</p>
            <p className="status">Hurry! Over 3 people have this in their carts</p>
            <p className="description">{product.description}</p>
            <button
              className="add-to-cart"
              onClick={handleAddToCart}
              disabled={isAdding}
            >
              {isAdding ? 'Đang thêm...' : 'Thêm vào giỏ hàng'}
            </button>
            <button className="buy-now" onClick={handleBuyNow}>
              Mua ngay
            </button>
            <Link to="/products" className="back-link">Quay lại danh sách sản phẩm</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;