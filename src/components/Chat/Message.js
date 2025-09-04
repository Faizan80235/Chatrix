import React from 'react';
import { Badge } from 'react-bootstrap';
import { Check, CheckCheck } from 'lucide-react';

const Message = ({ message, isOwn, isConsecutive }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const shouldShowDateSeparator = (currentMessage, previousMessage) => {
    if (!previousMessage) return true;
    
    const currentDate = new Date(currentMessage.timestamp).toDateString();
    const previousDate = new Date(previousMessage.timestamp).toDateString();
    
    return currentDate !== previousDate;
  };

  return (
    <>
      <div className={`message-container d-flex ${isOwn ? 'message-sent' : 'message-received'}`}>
        <div className="message-bubble">
          <div className="message-content">
            {message.message}
          </div>
          <div className="message-time d-flex align-items-center justify-content-end">
            <small>{formatTime(message.timestamp)}</small>
            {isOwn && (
              <div className="ms-1">
                {message.isRead ? (
                  <CheckCheck size={14} className="text-primary" />
                ) : (
                  <Check size={14} className="opacity-75" />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;