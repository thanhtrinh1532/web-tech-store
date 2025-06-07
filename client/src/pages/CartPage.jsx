"use client"

import { useCart } from "../context/CartContext"
import { Link, useNavigate } from "react-router-dom"
import EmptyCart from "../components/EmptyCart"
import ProductRecommendations from "../components/ProductRecommendations"
import "./CartPage.css"

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, getSubtotal, getShippingFee, getFinalTotal } = useCart()
  const navigate = useNavigate()

  if (cart.items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-header">
          <h1>Giỏ hàng</h1>
          <div className="breadcrumb">
            <Link to="/">Trang chủ</Link> / <span>Giỏ hàng</span>
          </div>
        </div>
        <EmptyCart />
        <ProductRecommendations />
      </div>
    )
  }

  const handleProceedToCheckout = () => {
    navigate("/checkout")
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Giỏ hàng</h1>
        <div className="breadcrumb">
          <Link to="/">Trang chủ</Link> / <span>Giỏ hàng</span>
        </div>
      </div>

      <div className="cart-content">
        <div className="cart-table-container">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Tạm tính</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {cart.items.map((item) => (
                <tr key={item.id} className="cart-item-row">
                  <td className="product-info">
                    <div className="product-details">
                      <img
                        src={item.image || "/placeholder.svg?height=80&width=80"}
                        alt={item.name}
                        className="product-image"
                      />
                      <div className="product-text">
                        <h3>{item.name}</h3>
                        <p className="product-sku">SKU: {item.sku || `SP${item.id.toString().padStart(3, "0")}`}</p>
                      </div>
                    </div>
                  </td>
                  <td className="product-price">
                    <span className="price">{item.price.toLocaleString("vi-VN")}₫</span>
                  </td>
                  <td className="product-quantity">
                    <div className="quantity-controls">
                      <button className="quantity-btn minus" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                        className="quantity-input"
                        min="1"
                      />
                      <button className="quantity-btn plus" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        +
                      </button>
                    </div>
                  </td>
                  <td className="product-subtotal">
                    <span className="subtotal">{(item.price * item.quantity).toLocaleString("vi-VN")}₫</span>
                  </td>
                  <td className="product-actions">
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)} title="Xóa sản phẩm">
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-actions">
            <Link to="/" className="continue-shopping-btn">
              ← Tiếp tục mua sắm
            </Link>
            <button className="update-cart-btn">Cập nhật giỏ hàng</button>
          </div>
        </div>

        <div className="cart-summary">
          <div className="summary-card">
            <h3>Tổng giỏ hàng</h3>

            <div className="summary-row">
              <span>Tạm tính:</span>
              <span>{getSubtotal().toLocaleString("vi-VN")}₫</span>
            </div>

            <div className="summary-row">
              <span>Phí vận chuyển:</span>
              <span>
                {getShippingFee() === 0 ? (
                  <span className="free-shipping">Miễn phí</span>
                ) : (
                  `${getShippingFee().toLocaleString("vi-VN")}₫`
                )}
              </span>
            </div>

            {getShippingFee() === 0 && (
              <div className="shipping-note">
                <small>🎉 Bạn được miễn phí vận chuyển!</small>
              </div>
            )}

            <div className="summary-row total-row">
              <strong>
                <span>Tổng cộng:</span>
                <span>{getFinalTotal().toLocaleString("vi-VN")}₫</span>
              </strong>
            </div>

            <button className="checkout-btn" onClick={handleProceedToCheckout}>
              CHI TIẾT THANH TOÁN
            </button>

            <div className="payment-methods">
              <p>Phương thức thanh toán được chấp nhận:</p>
              <div className="payment-icons">
                <span className="payment-icon">💳</span>
                <span className="payment-icon">🏦</span>
                <span className="payment-icon">📱</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage