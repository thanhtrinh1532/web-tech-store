"use client"

import { useState } from "react"
import { useCart } from "../context/CartContext"
import { Link } from "react-router-dom"
import CheckoutSteps from "../components/CheckoutSteps"
import PaymentForm from "../components/PaymentForm"
import OrderSummary from "../components/OrderSummary"
import "./CheckoutPage.css"

const CheckoutPage = () => {
  const { cart, getFinalTotal } = useCart()
  const [orderCompleted, setOrderCompleted] = useState(false)

  const handleOrderComplete = () => {
    setOrderCompleted(true)
  }

  if (cart.items.length === 0 && !orderCompleted) {
    return (
      <div className="checkout-page">
        <div className="empty-checkout">
          <h2>Không có sản phẩm nào trong giỏ hàng</h2>
          <p>Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.</p>
          <Link to="/" className="return-home-btn">
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    )
  }

  if (orderCompleted) {
    return (
      <div className="checkout-page">
        <div className="order-success">
          <div className="success-icon">✅</div>
          <h2>Đặt hàng thành công!</h2>
          <p>Cảm ơn bạn đã mua hàng. Chúng tôi sẽ liên hệ với bạn sớm nhất.</p>
          <div className="success-actions">
            <Link to="/" className="return-home-btn">
              Quay lại trang chủ
            </Link>
            <Link to="/cart" className="view-cart-btn">
              Xem giỏ hàng
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <h1>Thanh toán</h1>
        <div className="breadcrumb">
          <Link to="/">Trang chủ</Link> / <Link to="/cart">Giỏ hàng</Link> / <span>Thanh toán</span>
        </div>
      </div>

      <CheckoutSteps currentStep={2} />

      <div className="checkout-content">
        <div className="checkout-grid">
          <PaymentForm onOrderComplete={handleOrderComplete} />
          <OrderSummary />
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage