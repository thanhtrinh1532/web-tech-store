"use client"
import { useCart } from "../context/CartContext"
import "./OrderSummary.css"

const OrderSummary = () => {
  const { cart, getSubtotal, getShippingFee, getFinalTotal } = useCart()

  return (
    <div className="order-summary">
      <h3>Thông tin đơn hàng</h3>

      <div className="order-items">
        {cart.items.map((item) => (
          <div key={item.id} className="order-item">
            <img src={item.image || "/placeholder.svg?height=60&width=60"} alt={item.name} className="item-image" />
            <div className="item-details">
              <h4>{item.name}</h4>
              <p className="item-quantity">Số lượng: {item.quantity}</p>
              <p className="item-price">{item.price.toLocaleString("vi-VN")}₫</p>
            </div>
            <div className="item-total">{(item.price * item.quantity).toLocaleString("vi-VN")}₫</div>
          </div>
        ))}
      </div>

      <div className="order-totals">
        <div className="total-row">
          <span>Tạm tính:</span>
          <span>{getSubtotal().toLocaleString("vi-VN")}₫</span>
        </div>
        <div className="total-row">
          <span>Phí vận chuyển:</span>
          <span>
            {getShippingFee() === 0 ? (
              <span className="free-shipping">Miễn phí</span>
            ) : (
              `${getShippingFee().toLocaleString("vi-VN")}₫`
            )}
          </span>
        </div>
        <div className="total-row final-total">
          <strong>
            <span>Tổng cộng:</span>
            <span>{getFinalTotal().toLocaleString("vi-VN")}₫</span>
          </strong>
        </div>
      </div>

      <div className="order-note">
        <p>
          <small>* Giá đã bao gồm VAT</small>
        </p>
      </div>
    </div>
  )
}

export default OrderSummary