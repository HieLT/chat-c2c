import React from 'react';

const MessageList = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.map((msg, index) => (
        <div key={index} className="message">
          <strong>{msg.sender}: </strong>
          <span>{msg.content}</span>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
