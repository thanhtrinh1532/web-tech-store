import { Link } from "react-router-dom"
import "./EmptyCart.css"

const EmptyCart = () => {
  return (
    <div className="empty-cart">
      <div className="empty-cart-icon">🛒</div>
      <h2>Your cart is currently empty.</h2>
      <p>Before proceed to checkout you must add some products to shopping cart.</p>
      <p>You will find a lot of interesting products on our "Shop" page.</p>
      <Link to="/" className="return-to-shop-btn">
        RETURN TO SHOP
      </Link>
    </div>
  )
}

export default EmptyCart

