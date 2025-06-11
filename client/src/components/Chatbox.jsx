import React, { useState, useEffect } from 'react';
import './Chatbox.css';

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false); // Mặc định ẩn chatbox
  const [isMinimized, setIsMinimized] = useState(true); // Mặc định là nút tròn

  useEffect(() => {
    // Mở chatbox khi component mount lần đầu
    setIsOpen(true);
    setIsMinimized(false);
    setMessages([{ text: 'Chào bạn! Tôi có thể giúp gì cho bạn?', sender: 'bot' }]);
  }, []);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { text: inputMessage, sender: 'user' }]);
      setInputMessage('');
      setTimeout(() => {
        setMessages(prev => [...prev, { text: 'Cảm ơn bạn! Tôi đã nhận được tin nhắn.', sender: 'bot' }]);
      }, 1000);
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setIsMinimized(!isMinimized);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(true);
  };

  if (isMinimized && !isOpen) {
    return (
      <div className="chatbox-toggle" onClick={handleToggle}>
        💬
      </div>
    );
  }

  if (!isOpen) return null;

  return (
    <div className="chatbox-container">
      <div className="chatbox-header">
        <h3>Trò chuyện với chúng tôi</h3>
        <button onClick={handleClose} className="close-btn">×</button>
      </div>
      <div className="chatbox-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chatbox-input">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Nhập tin nhắn..."
        />
        <button onClick={handleSendMessage}>Gửi</button>
      </div>
    </div>
  );
};

export default Chatbox;