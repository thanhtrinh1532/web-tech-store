import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { CartProvider } from "./context/CartContext"
import Header from "./components/Header"
import CartPage from "./pages/CartPage"
import CheckoutPage from "./pages/CheckoutPage"
import HomePage from "./pages/HomePage"
import "./App.css"

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  )
}

export default App