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
    <CartProvider>
      <Router>
        <div className="app">
          {/* Header và Navigation có thể được đặt ở đây nếu muốn hiển thị trên mọi trang */}
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:productId" element={<ProductDetail />} />
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