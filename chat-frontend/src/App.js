// src/App.js
import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import axios from 'axios';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import ConversationList from './components/ConversationList.js';

const App = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  const userId = 'user1'; // Example user ID, use actual authenticated user ID in real-world app

  useEffect(() => {
    const socketConnection = socketIOClient('http://localhost:8000', {
      transports: ['websocket'], // Enforce WebSocket for real-time communication
    });

    setSocket(socketConnection);

    socketConnection.on('message', (newMessage) => {
      if (newMessage.conversationId === selectedConversation) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });

    // Fetch conversations when component mounts
    axios.get('http://localhost:8000/api/chat/conversations')
      .then((response) => {
        setConversations(response.data);
      })
      .catch((err) => {
        console.error('Error fetching conversations:', err);
      });

    return () => {
      socketConnection.disconnect();
    };
  }, [selectedConversation]);

  const joinConversation = (conversationId) => {
    setSelectedConversation(conversationId);
    socket.emit('joinConversation', conversationId);
    // Fetch messages for the selected conversation
    axios.get(`http://localhost:8000/api/chat/messages/${conversationId}`)
      .then((response) => {
        setMessages(response.data);
      })
      .catch((err) => {
        console.error('Error fetching messages:', err);
      });
  };

  const sendMessage = (message) => {
    const data = {
      conversationId: selectedConversation,
      senderId: userId,
      message,
    };

    // Emit the message to the server via socket
    socket.emit('message', data);

    // Also send it to the server for persistence
    axios.post('http://localhost:8000/api/chat/messages', data)
      .then((response) => {
        setMessages((prevMessages) => [...prevMessages, response.data]);
      })
      .catch((err) => {
        console.error('Error sending message:', err);
      });
  };

  return (
    <div className="App">
      <h1>Chat Application</h1>
      <div className="container">
        <ConversationList
          conversations={conversations}
          joinConversation={joinConversation}
        />
        {selectedConversation && (
          <div className="chat-box">
            <ChatWindow messages={messages} />
            <MessageInput sendMessage={sendMessage} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
