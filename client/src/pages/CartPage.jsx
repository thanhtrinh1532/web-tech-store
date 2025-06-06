import { useCart } from "../context/CartContext"
import CartSteps from "../components/CartSteps"
import CartItem from "../components/CartItem"
import CartSummary from "../components/CartSummary"
import EmptyCart from "../components/EmptyCart"
import "./CartPage.css"

const CartPage = () => {
  const { items, clearCart } = useCart()

  // Xử lý tiếp tục mua sắm
  const handleContinueShopping = () => {
    console.log("Tiếp tục mua sắm")
    window.location.href = "/";
    // Logic chuyển về trang sản phẩm
  }

  // Xử lý cập nhật giỏ hàng
  const handleUpdateCart = () => {
    alert("Giỏ hàng đã được cập nhật!")
    // Logic cập nhật giỏ hàng (có thể gọi API)
  }

  // Xử lý xóa toàn bộ giỏ hàng
  const handleClearCart = () => {
    if (window.confirm("Bạn có chắc muốn xóa toàn bộ giỏ hàng?")) {
      clearCart()
    }
  }

  return (
    <div className="cart-page">
      <div className="container">
        {/* Các bước mua hàng */}
        <CartSteps currentStep={1} />

        {items.length === 0 ? (
          /* Hiển thị khi giỏ hàng trống */
          <EmptyCart />
        ) : (
          /* Hiển thị khi có sản phẩm trong giỏ */
          <div className="cart-content">
            <div className="cart-items">
              {/* Header của bảng */}
              <div className="cart-header">
                <div className="product-col">Sản phẩm</div>
                <div className="price-col">Giá</div>
                <div className="quantity-col">Số lượng</div>
                <div className="total-col">Tổng</div>
                <div className="action-col">Thao tác</div>
              </div>

              {/* Danh sách sản phẩm */}
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}

              {/* Các nút hành động */}
              <div className="cart-actions">
                <div className="left-actions">
                  <button 
                    className="continue-shopping"
                    onClick={handleContinueShopping}
                  >
                    ← Tiếp tục mua sắm
                  </button>
                </div>
                
                <div className="right-actions">
                  <button 
                    className="clear-cart"
                    onClick={handleClearCart}
                  >
                    Xóa giỏ hàng
                  </button>
                  <button 
                    className="update-cart"
                    onClick={handleUpdateCart}
                  >
                    Cập nhật giỏ hàng
                  </button>
                </div>
              </div>
            </div>

            {/* Tổng kết đơn hàng */}
            <CartSummary />
          </div>
        )}
      </div>
    </div>
  )
}

export default CartPage