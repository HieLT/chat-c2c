// src/components/MessageInput.js
import React, { useState } from 'react';

const MessageInput = ({ sendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(message);  // Send message to parent component or server
      setMessage('');  // Clear input after sending
    }
  };

  return (
    <div className="message-input">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSend();  // Send message when Enter is pressed
          }
        }}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default MessageInput;
