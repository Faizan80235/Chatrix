import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './Messageinput';
import { useSocket } from '../context/SocketContext';

const ChatArea = ({ selectedUser, chatHistory, loading, onBackToUsers, currentUser }) => {
  const { messages, sendMessage, typingUsers } = useSocket();
  const [allMessages, setAllMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // Combine chat history with real-time messages
  useEffect(() => {
    if (selectedUser) {
      // Filter real-time messages for current conversation
      const realtimeMessages = messages.filter(msg => 
        (msg.sender?.id === selectedUser._id || msg.receiver?.id === selectedUser._id) ||
        (msg.sender?.id === selectedUser.id || msg.receiver?.id === selectedUser.id)
      );
      
      // Convert chat history to consistent format
      const formattedHistory = chatHistory.map(msg => ({
        id: msg._id,
        message: msg.message,
        timestamp: msg.timestamp,
        type: msg.sender._id === currentUser.id ? 'sent' : 'received',
        sender: msg.sender,
        receiver: msg.receiver
      }));
      
      // Combine and sort by timestamp
      const combined = [...formattedHistory, ...realtimeMessages];
      const sorted = combined.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      
      // Remove duplicates based on message ID
      const unique = sorted.filter((msg, index, arr) => 
        index === arr.findIndex(m => m.id === msg.id)
      );
      
      setAllMessages(unique);
    } else {
      setAllMessages([]);
    }
  }, [chatHistory, messages, selectedUser, currentUser]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (message) => {
    if (selectedUser && message.trim()) {
      sendMessage(selectedUser._id || selectedUser.id, message);
    }
  };

  const isUserTyping = () => {
    return typingUsers.some(user => 
      user.userId === (selectedUser?._id || selectedUser?.id)
    );
  };

  if (!selectedUser) {
    return (
      <div className="chat-main">
        <div className="empty-state">
          <MessageCircle className="empty-state-icon" />
          <h4>Welcome to Chat</h4>
          <p>Select a user from the sidebar to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-main">
      {/* Chat Header */}
      <ChatHeader 
        user={selectedUser} 
        onBackToUsers={onBackToUsers}
      />

      {/* Messages Area */}
      <div className="chat-messages">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-center">
              <div className="spinner-border text-primary mb-3" />
              <p className="text-muted">Loading messages...</p>
            </div>
          </div>
        ) : (
          <>
            <MessageList 
              messages={allMessages}
              currentUserId={currentUser.id}
            />
            
            {/* Typing Indicator */}
            {isUserTyping() && (
              <div className="typing-indicator">
                <div className="typing-dots">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
                <small className="ms-2 text-muted">
                  {selectedUser.name} is typing...
                </small>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Message Input */}
      <MessageInput 
        onSendMessage={handleSendMessage}
        selectedUser={selectedUser}
        disabled={loading}
      />
    </div>
  );
};

export default ChatArea;