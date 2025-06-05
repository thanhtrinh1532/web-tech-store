import React, { useState } from 'react';

function Contact() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Giả lập gửi tin nhắn thành công
    setSuccess(true);
    setName('');
    setMessage('');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h2>Liên hệ với chúng tôi</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tên của bạn"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br />
        <textarea
          placeholder="Tin nhắn"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        /><br />
        <button type="submit">Gửi</button>
      </form>
      {success && <p style={{ color: 'green' }}>Tin nhắn đã được gửi thành công!</p>}
    </div>
  );
}

export default Contact;
