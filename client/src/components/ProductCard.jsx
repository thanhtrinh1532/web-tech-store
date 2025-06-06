import { Heart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import './ProductCard.css'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart() || {}

  const handleAddToCart = () => {
    if (addToCart) addToCart(product)
    else console.warn("addToCart function not found!")
  }

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image || "/placeholder.svg"} alt={product.name || "Sản phẩm"} />

        <div className="product-badges">
          {product.isHot && <span className="badge hot">HOT</span>}
          {product.isNew && <span className="badge new">PHỔ BIẾN</span>}
          {product.discount > 0 && <span className="badge discount">-{product.discount}%</span>}
          {product.limitedStock && <span className="badge limited">SỐ LƯỢNG ÍT</span>}
        </div>

        <div className="product-actions">
          <button 
            type="button"
            className="add-to-cart" 
            onClick={handleAddToCart}
          >
            Thêm vào giỏ
          </button>
          <button type="button" className="add-to-wishlist" aria-label="Thêm vào danh sách yêu thích">
            <Heart size={18} />
          </button>
        </div>
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-price">
          {product.discount > 0 ? (
            <>
              <span className="original-price">${product.price.toFixed(2)}</span>
              <span className="discounted-price">
                ${(product.price * (1 - product.discount / 100)).toFixed(2)}
              </span>
            </>
          ) : (
            <span>${product.price.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
