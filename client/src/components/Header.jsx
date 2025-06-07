import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import "./Header.css"

const Header = () => {
  const { getTotalItems } = useCart()

  return (
    <header className="header">
      <div className="header-top">
        <p>Đăng ký tài khoản nhận ngay ưu đãi 20% đơn hàng đầu tiên</p>
        <div className="auth-links">
          <span>Đăng nhập / Đăng ký</span>
        </div>
      </div>

      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="logo">
            <h2>coutura mona</h2>
          </Link>

          <ul className="nav-menu">
            <li>
              <Link to="/">Trang chủ</Link>
            </li>
            <li>
              <a href="#about">Giới thiệu</a>
            </li>
            <li>
              <a href="#products">Sản phẩm</a>
            </li>
            <li>
              <a href="#news">Tin tức</a>
            </li>
            <li>
              <a href="#contact">Liên hệ</a>
            </li>
          </ul>

          <div className="nav-icons">
            <Link to="/cart" className="cart-icon">
              🛒 ({getTotalItems()})
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header