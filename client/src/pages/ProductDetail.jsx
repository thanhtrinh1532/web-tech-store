import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost/api/products.php?id=${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Fetch product error:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product && selectedSize && selectedColor) {
      alert(`Đã thêm ${quantity} ${product.name} (Size: ${selectedSize}, Color: ${selectedColor}) vào giỏ hàng!`);
    } else {
      alert('Vui lòng chọn kích thước và màu sắc!');
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-detail-page">
      <Header />
      <div className="product-detail-container">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="price">{product.price.toLocaleString()}đ</p>
          <p className="buyers">Hurry up! {product.buyers || 0} people have been bought this</p>
          <div className="options">
            <div className="size-option">
              <h3>Size</h3>
              <div className="size-buttons">
                {(product.sizes || []).map(size => (
                  <button
                    key={size}
                    className={selectedSize === size ? 'active' : ''}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="color-option">
              <h3>Color</h3>
              <div className="color-buttons">
                {(product.colors || []).map(color => (
                  <button
                    key={color}
                    className={`color-btn ${selectedColor === color ? 'active' : ''}`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    onClick={() => setSelectedColor(color)}
                  ></button>
                ))}
              </div>
            </div>
          </div>
          <div className="quantity">
            <h3>Số lượng</h3>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            />
          </div>
          <button className="buy-now" onClick={handleAddToCart}>
            Mua ngay
          </button>
          <div className="description">
            <h3>Chi tiết sản phẩm</h3>
            <p>{product.description || 'Không có mô tả'}</p>
          </div>
          <div className="social-icons">
            <span>📩</span>
            <span>💾</span>
            <span>👍</span>
            <span>👎</span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;