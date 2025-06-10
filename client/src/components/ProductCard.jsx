import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

/**
 * ProductCard component displays a product with image, name, price, and optional status.
 * Clicking on image, name, or price navigates to the product detail page.
 * The "Add to Cart" button appears on hover above the name and triggers the provided callback.
 * Heart icon toggles favorite status (white with black border when not favorited, red when favorited).
 * @param {Object} product - Product data (id, name, price, image, status)
 * @param {number|null} isAdding - ID of the product being added to cart, or null
 * @param {Function} handleAddToCart - Callback to handle adding product to cart
 * @param {Object} imageLoaded - Object tracking image load status
 * @param {Function} setImageLoaded - Function to update image load status
 */
const ProductCard = ({ product, isAdding, handleAddToCart, imageLoaded, setImageLoaded }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = () => {
    setIsFavorited(prev => !prev);
  };

  return (
    <div className="product-item">
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
          <span
            className={`heart-icon ${isFavorited ? 'favorited' : ''}`}
            onClick={e => {
              e.preventDefault(); // Ngăn chuyển hướng khi click trái tim
              toggleFavorite();
            }}
          >
            ♥
          </span>
        </div>
        <div className="product-info">
          <button
            className="add-to-cart"
            onClick={e => {
              e.preventDefault(); // Ngăn chuyển hướng khi click nút
              !isAdding && handleAddToCart(product.id);
            }}
            disabled={isAdding === product.id}
          >
            {isAdding === product.id ? 'Đang thêm...' : 'Thêm vào giỏ hàng'}
          </button>
          <h4>{product.name}</h4>
          <p className="price">{product.price.toLocaleString()} VND</p>
          {product.status && <p className="status">Tình trạng: {product.status}</p>}
        </div>
      </Link>
    </div>
  );
};

export default memo(ProductCard);