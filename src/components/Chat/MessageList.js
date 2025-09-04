import React from 'react';
import Message from './Message';

const MessageList = ({ messages, currentUserId }) => {
  if (!messages || messages.length === 0) {
    return (
      <div className="empty-state">
        <div className="text-center text-muted">
          <h5>No messages yet</h5>
          <p>Start the conversation by sending your first message!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="messages-container">
      {messages.map((message, index) => {
        const isConsecutive = 
          index > 0 && 
          messages[index - 1].type === message.type &&
          (new Date(message.timestamp) - new Date(messages[index - 1].timestamp)) < 300000; // 5 minutes

        return (
          <Message
            key={message.id || index}
            message={message}
            isOwn={message.type === 'sent' || message.sender?.id === currentUserId}
            isConsecutive={isConsecutive}
          />
        );
      })}
    </div>
  );
};

export default MessageList;