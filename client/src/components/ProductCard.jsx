// src/components/ProductCard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product, isAdding, handleAddToCart, imageLoaded, setImageLoaded }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleCartClick = () => {
    handleAddToCart(product.id);
  };

  const toggleFavorite = (e) => {
    e.preventDefault();
    setIsFavorited(!isFavorited);
  };

  const formatPrice = (price) => `${price.toLocaleString()}đ`;

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image">
          {!imageLoaded[product.id] && <div className="spinner" />}
          <img
            src={product.image}
            alt={product.name}
            onLoad={() => setImageLoaded(prev => ({ ...prev, [product.id]: true }))}
            onError={() => setImageLoaded(prev => ({ ...prev, [product.id]: true }))}
            style={{ display: imageLoaded[product.id] ? 'block' : 'none' }}
          />
          <span className={`heart-icon ${isFavorited ? 'favorited' : ''}`} onClick={toggleFavorite}>
            ♥
          </span>
          <div className="product-actions">
            <button
              className="add-to-cart"
              onClick={(e) => { e.preventDefault(); handleCartClick(); }}
              disabled={isAdding === product.id}
            >
              {isAdding === product.id ? 'Đang thêm...' : 'Thêm vào giỏ'}
            </button>
          </div>
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">{formatPrice(product.price)}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;