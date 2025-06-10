<<<<<<< HEAD
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
=======
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import './App.css';
>>>>>>> dae1b6d2007ad233449e04af799bf4543caeadc9

function App() {
  return (
    <Router>
<<<<<<< HEAD
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
=======
      <div className="app">
        <header>
          <nav>
            <a href="/">Home</a> | <a href="/products">Products</a> | <a href="/cart">Cart</a> | 
            <a href="/checkout">Checkout</a> | <a href="/login">Login</a> | <a href="/register">Register</a> | 
            <a href="/contact">Contact</a> | <a href="/orders">Orders</a> | <a href="/admin">Admin</a>
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
>>>>>>> dae1b6d2007ad233449e04af799bf4543caeadc9
    </Router>
  );
}

export default App;