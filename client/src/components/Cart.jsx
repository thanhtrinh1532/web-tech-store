"use client"

import { useState } from "react"
import EmptyCart from "./EmptyCart"
import CartItem from "./CartItem"
import CartSummary from "./CartSummary"

const Cart = ({ cartItems, removeFromCart, updateQuantity, clearCart, cartTotal }) => {
  const [couponCode, setCouponCode] = useState("")

  const handleUpdateCart = () => {
    // In a real app, you might want to sync with backend here
    alert("Giỏ hàng đã được cập nhật!")
  }

  const handleApplyCoupon = (e) => {
    e.preventDefault()
    if (couponCode.trim()) {
      alert(`Mã giảm giá "${couponCode}" đã được áp dụng!`)
      // In a real app, you would validate and apply the coupon here
    }
  }

  if (cartItems.length === 0) {
    return <EmptyCart />
  }

  return (
    <div className="cart-container">
      <h1>Giỏ hàng</h1>

      <div className="cart-content">
        <div className="cart-items">
          <table className="cart-table">
            <thead>
              <tr>
                <th></th>
                <th>Sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Tổng</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />
              ))}
            </tbody>
          </table>

          <div className="cart-actions">
            <div className="coupon-form">
              <input
                type="text"
                placeholder="Mã giảm giá"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button onClick={handleApplyCoupon}>Áp dụng</button>
            </div>
            <button className="update-cart" onClick={handleUpdateCart}>
              Cập nhật giỏ hàng
            </button>
          </div>
        </div>

        <CartSummary cartTotal={cartTotal} />
      </div>
    </div>
  )
}

export default Cart
