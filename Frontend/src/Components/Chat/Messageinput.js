import React, { useState, useRef, useEffect } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { Send, Smile } from 'lucide-react';
import { useSocket } from '../../context/SocketContext';

const MessageInput = ({ onSendMessage, selectedUser, disabled }) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { startTyping, stopTyping } = useSocket();
  const inputRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Focus input when user is selected
  useEffect(() => {
    if (selectedUser && !disabled) {
      inputRef.current?.focus();
    }
  }, [selectedUser, disabled]);

  // Handle typing indicators
  useEffect(() => {
    if (message.trim() && !isTyping && selectedUser) {
      setIsTyping(true);
      startTyping(selectedUser._id || selectedUser.id);
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      if (isTyping && selectedUser) {
        setIsTyping(false);
        stopTyping(selectedUser._id || selectedUser.id);
      }
    }, 1000);

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [message, isTyping, selectedUser, startTyping, stopTyping]);

  // Clean up typing indicator on component unmount
  useEffect(() => {
    return () => {
      if (isTyping && selectedUser) {
        stopTyping(selectedUser._id || selectedUser.id);
      }
    };
  }, [isTyping, selectedUser, stopTyping]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      
      // Stop typing indicator
      if (isTyping && selectedUser) {
        setIsTyping(false);
        stopTyping(selectedUser._id || selectedUser.id);
      }
      
      // Keep focus on input
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="chat-input-area">
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          {/* Message Input */}
          <Form.Control
            ref={inputRef}
            as="textarea"
            rows={1}
            placeholder={
              selectedUser 
                ? `Type a message to ${selectedUser.name}...` 
                : 'Select a user to start messaging...'
            }
            value={message}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            disabled={disabled || !selectedUser}
            className="message-input"
            style={{ 
              resize: 'none',
              minHeight: '45px',
              maxHeight: '120px'
            }}
          />
          
          {/* Send Button */}
          <Button
            type="submit"
            className="send-button"
            disabled={!message.trim() || disabled || !selectedUser}
            title="Send message"
          >
            <Send size={18} />
          </Button>
        </InputGroup>
        
        {/* Additional Actions Row */}
        <div className="d-flex align-items-center justify-content-between mt-2">
          <div className="d-flex align-items-center">
            {/* Emoji Button - Can be expanded later */}
            <Button
              variant="link"
              size="sm"
              className="text-muted p-1"
              disabled={disabled || !selectedUser}
              title="Add emoji"
            >
              <Smile size={16} />
            </Button>
          </div>
          
          {/* Character Count */}
          {message.length > 800 && (
            <small className={`text-${message.length > 950 ? 'danger' : 'warning'}`}>
              {message.length}/1000
            </small>
          )}
        </div>
      </Form>
    </div>
  );
};

export default MessageInput;