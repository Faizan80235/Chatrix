import React, { useState, useRef, useEffect } from 'react';
import { Smile, Send } from 'lucide-react';
import { useSocket } from '../context/SocketContext';

const MessageInput = ({ onSendMessage, selectedUser, disabled }) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { startTyping, stopTyping } = useSocket();

  const inputRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    if (selectedUser && !disabled) {
      inputRef.current?.focus();
    }
  }, [selectedUser, disabled]);

  useEffect(() => {
    if (message.trim() && !isTyping && selectedUser) {
      setIsTyping(true);
      startTyping(selectedUser._id || selectedUser.id);
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      if (isTyping && selectedUser) {
        setIsTyping(false);
        stopTyping(selectedUser._id || selectedUser.id);
      }
    }, 1000);

    return () => {
      clearTimeout(typingTimeoutRef.current);
    };
  }, [message, isTyping, selectedUser, startTyping, stopTyping]);

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
      if (isTyping && selectedUser) {
        setIsTyping(false);
        stopTyping(selectedUser._id || selectedUser.id);
      }
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
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  };

  return (
    <form className="custom-chat-input" onSubmit={handleSubmit}>
      {/* Emoji Button */}
      <button
        type="button"
        className="emoji-button"
        title="Add emoji"
        disabled={disabled || !selectedUser}
      >
        <Smile size={22} />
      </button>

      {/* Message Input */}
      <textarea
        ref={inputRef}
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
        className="input-field"
        maxLength={1000}
      />

      {/* Send Button */}
      <button
        type="submit"
        className="send-button"
        title="Send"
        disabled={!message.trim() || disabled || !selectedUser}
      >
        <Send size={20} />
      </button>
    </form>
  );
};

export default MessageInput;
