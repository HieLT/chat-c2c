// src/components/ChatWindow.js
import React from 'react';

const ChatWindow = ({ messages }) => {
  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className="message">
            <strong>{message.sender}</strong>: {message.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;
