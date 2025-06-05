import React, { useState } from 'react';
import './Chatbox.css';

function Chatbox() {
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const toggleChat = () => setVisible(!visible);
  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, fromUser: true }]);
      setInput('');
    }
  };

  return (
    <div>
      <button onClick={toggleChat}>Chat</button>
      {visible && (
        <div className="chatbox">
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <p key={idx} className={msg.fromUser ? 'user' : 'bot'}>
                {msg.text}
              </p>
            ))}
          </div>
          <input value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhắn gì đó..." />
          <button onClick={sendMessage}>Gửi</button>
        </div>
      )}
    </div>
  );
}

export default Chatbox;
