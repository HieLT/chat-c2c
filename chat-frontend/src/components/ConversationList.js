// src/components/ConversationList.js
import React from 'react';

const ConversationList = ({ conversations, joinConversation }) => {
  return (
    <div className="conversation-list">
      <h2>Conversations</h2>
      <ul>
        {conversations.map((conversation) => (
          <li key={conversation._id} onClick={() => joinConversation(conversation._id)}>
            Conversation with {conversation.participants.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversationList;
