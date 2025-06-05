import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import Chatbox from './components/Chatbox';

function App() {
  return (
    <Router>
      <div>
        <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Chào bạn đến với Web Tech Store!</h1>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
        <Chatbox />
      </div>
    </Router>
  );
}

export default App;
