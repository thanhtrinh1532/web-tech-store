import "./EmptyCart.css"

const EmptyCart = () => {
  const handleReturnToShop = () => {
    // Logic để quay lại trang shop
    console.log("Quay lại trang shop")
  }

  return (
    <div className="empty-cart">
      {/* Icon giỏ hàng trống */}
      <div className="empty-cart-icon">
        <div className="cart-outline">
          <div className="cart-handle"></div>
          <div className="cart-body">
            <div className="sad-face">☹️</div>
          </div>
        </div>
      </div>

      {/* Thông báo */}
      <h2>Your cart is currently empty.</h2>
      <p>Before proceed to checkout you must add some products to shopping cart.</p>
      <p>You will find a lot of interesting products on our "Shop" page.</p>

      {/* Nút quay lại shop */}
      <button className="return-to-shop" onClick={handleReturnToShop}>
        RETURN TO SHOP
      </button>
    </div>
  )
}

export default EmptyCart