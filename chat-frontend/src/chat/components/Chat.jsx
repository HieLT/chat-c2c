import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import LeftSider from './LeftSider';
import RightSider from './RightSider';
import Middle from './Middle';
import '../../App.css';


const socket = io('http://localhost:8080',{query: {
  "user_id": '6744596b725264deb4c1e01c'
}} ); // Socket.io connection
const Chat = () => {
  const [user] = useState({
    _id: '6744596b725264deb4c1e01c',
    name: "Le Van A",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    followers: 1200,
    posts: 87,
  });
  const [conversations, setConversations] = useState([]);
  const [chosenConversation, setChosenConversation] = useState({});
  const [firstTime, setFirstTime] = useState(true);


  useEffect(() => {
    // Register the user
    socket.on('getConversations', (res) => {
      setConversations(res);
    });

    socket.on('err', (error) => {
      console.error('Error fetching conversations:', error);
    });
  }, []);

  useEffect(() => {
    if(firstTime && conversations?.length>0){
      setFirstTime(false);
      setChosenConversation(conversations[0]);
    }
  }, [conversations]);

  // Handle choosing a receiver for the chat
  const handleChosenConversation = (conversation) => {
    setChosenConversation(conversation);
  };

  return (
    <div className="flex max-h-screen bg-gray-100 text-gray-800">
      {/* Left Sidebar */}
      <LeftSider
        user={user}
        conversations={conversations}
        chosenConversation={chosenConversation}
        handleChosenConversation={handleChosenConversation}
      />

      {/* Middle Section (Chat Area) */}
      <Middle 
        user={user}
        chosenConversation={chosenConversation}
        socket={socket}
      />

      {/* Right Sidebar */}
      <RightSider
        user={user}
        chosenConversation={chosenConversation}
      />
    </div>
  );
};

export default Chat;
