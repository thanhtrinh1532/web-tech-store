// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ContactPage from './pages/ContactPage';
import OrderPage from './pages/OrderPage';
import AdminPage from './pages/AdminPage';
import { CartProvider } from './context/CartContext';
import './App.css';

function App() {
  return (
    <CartProvider> {/* Bao bọc toàn bộ ứng dụng bằng CartProvider */}
      <Router>
        <div className="app">
          <header>
            <nav>
              <Link to="/">Home</Link> | <Link to="/products">Products</Link> | <Link to="/cart">Cart</Link> | 
              <Link to="/checkout">Checkout</Link> | <Link to="/login">Login</Link> | <Link to="/register">Register</Link> | 
              <Link to="/contact">Contact</Link> | <Link to="/orders">Orders</Link> | <Link to="/admin">Admin</Link>
            </nav>
          </header>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/orders" element={<OrderPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;