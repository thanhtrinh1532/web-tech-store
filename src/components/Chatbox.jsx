import React, { useState } from 'react';
import './Chatbox.css';

const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const handleSend = async () => {
    if (!message) return;
    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    setChat([...chat, { user: message, ai: data.response || 'Không nhận được phản hồi' }]);
    setMessage('');
  };

  return (
    <div className="chatbox-container">
      <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>💬</button>
      {isOpen && (
        <div className="chatbox">
          <div className="chat-messages">
            {chat.map((msg, i) => (
              <div key={i} className="message">
                <p><strong>Bạn:</strong> {msg.user}</p>
                <p><strong>AI:</strong> {msg.ai}</p>
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Nhập tin nhắn..." />
            <button onClick={handleSend}>Gửi</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbox;