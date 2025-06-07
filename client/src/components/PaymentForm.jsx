"use client"

import { useState } from "react"
import { useCart } from "../context/CartContext"
import "./PaymentForm.css"

const PaymentForm = ({ onOrderComplete }) => {
  const { clearCart } = useCart()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    paymentMethod: "cod",
    notes: "",
  })

  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ và tên"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại"
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Số điện thoại không hợp lệ"
    }

    if (!formData.address.trim()) {
      newErrors.address = "Vui lòng nhập địa chỉ"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Process order
    console.log("Order data:", formData)
    clearCart()
    onOrderComplete()
  }

  return (
    <div className="payment-form">
      <h3>Thông tin thanh toán</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h4>Thông tin giao hàng</h4>

          <div className="form-group">
            <label htmlFor="fullName">Họ và tên *</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className={errors.fullName ? "error" : ""}
              placeholder="Nhập họ và tên"
            />
            {errors.fullName && <span className="error-message">{errors.fullName}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? "error" : ""}
                placeholder="example@email.com"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Số điện thoại *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={errors.phone ? "error" : ""}
                placeholder="0123456789"
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="address">Địa chỉ *</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className={errors.address ? "error" : ""}
              placeholder="Số nhà, tên đường"
            />
            {errors.address && <span className="error-message">{errors.address}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">Tỉnh/Thành phố</label>
              <select id="city" name="city" value={formData.city} onChange={handleInputChange}>
                <option value="">Chọn tỉnh/thành phố</option>
                <option value="hanoi">Hà Nội</option>
                <option value="hcm">TP. Hồ Chí Minh</option>
                <option value="danang">Đà Nẵng</option>
                <option value="haiphong">Hải Phòng</option>
                <option value="cantho">Cần Thơ</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="district">Quận/Huyện</label>
              <select id="district" name="district" value={formData.district} onChange={handleInputChange}>
                <option value="">Chọn quận/huyện</option>
                <option value="district1">Quận 1</option>
                <option value="district2">Quận 2</option>
                <option value="district3">Quận 3</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h4>Phương thức thanh toán</h4>

          <div className="payment-methods">
            <label className="payment-method">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={formData.paymentMethod === "cod"}
                onChange={handleInputChange}
              />
              <div className="payment-info">
                <span className="payment-title">Thanh toán khi nhận hàng (COD)</span>
                <small>Thanh toán bằng tiền mặt khi nhận hàng</small>
              </div>
            </label>

            <label className="payment-method">
              <input
                type="radio"
                name="paymentMethod"
                value="bank"
                checked={formData.paymentMethod === "bank"}
                onChange={handleInputChange}
              />
              <div className="payment-info">
                <span className="payment-title">Chuyển khoản ngân hàng</span>
                <small>Chuyển khoản trực tiếp vào tài khoản ngân hàng</small>
              </div>
            </label>

            <label className="payment-method">
              <input
                type="radio"
                name="paymentMethod"
                value="momo"
                checked={formData.paymentMethod === "momo"}
                onChange={handleInputChange}
              />
              <div className="payment-info">
                <span className="payment-title">Ví MoMo</span>
                <small>Thanh toán qua ví điện tử MoMo</small>
              </div>
            </label>
          </div>
        </div>

        <div className="form-section">
          <div className="form-group">
            <label htmlFor="notes">Ghi chú đơn hàng</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
              rows="4"
            />
          </div>
        </div>

        <button type="submit" className="place-order-btn">
          ĐẶT HÀNG NGAY
        </button>
      </form>
    </div>
  )
}

export default PaymentForm