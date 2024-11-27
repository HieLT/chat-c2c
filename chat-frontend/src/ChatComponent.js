import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';

// Replace with your server's address
const socket = io('http://localhost:8080', {
  // transports: ['websocket']
});

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [senderId, setSenderId] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Prompt for userId to simulate user registration
    const currentUser = prompt();
    setUserId(currentUser);
    socket.emit('register', currentUser); // Register user with socket

    // Listen for incoming messages
    socket.on('receive_message', (data) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { senderId: data.senderId, message: data.message }
      ]);
    });

    // // Fetch existing conversation messages when the component is mounted
    // const fetchMessages = async () => {
    //   try {
    //     const response = await axios.get(`http://localhost:8000/chat/messages`, {
    //       params: { senderId: currentUser, recipientId: '2' } // Use appropriate recipientId
    //     });
    //     setMessages(response.data);
    //   } catch (err) {
    //     console.error('Error fetching messages:', err);
    //   }
    // };

    // fetchMessages();
    return () => {
      socket.disconnect()
    }
  }, []);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Emit the message to the server
      socket.emit('message', {
        senderId: userId,
        recipientId:recipientId,
        message
      });
      setMessages([...messages, { senderId: userId, message: message }])
      setMessage(''); // Clear the input field
    }
  };

  return (
    <div>
      <h2>Chat</h2>

      {/* User Input for recipientId */}
      <input
        type="text"
        value={recipientId}
        onChange={(e) => setRecipientId(e.target.value)}
        placeholder="Enter recipient ID"
      />

      {/* Displaying the chat messages */}
      <div style={{ height: '300px', overflowY: 'scroll' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <strong>{msg.senderId}: </strong>
            <span>{msg.message}</span>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatComponent;
