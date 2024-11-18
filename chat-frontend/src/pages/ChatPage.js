import React, { useState, useEffect } from 'react';
import ChatWindow from '../components/ChatWindow';
import { useSocket } from '../hooks/useSocket';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const socket = useSocket('http://localhost:8000'); 

  useEffect(() => {
    if (socket) {
      socket.on('message', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }
  }, [socket]);

  const handleSendMessage = (content) => {
    const message = { sender: 'User', content }; 
    socket.emit('message', message);
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return <ChatWindow messages={messages} onSend={handleSendMessage} />;
};

export default ChatPage;
