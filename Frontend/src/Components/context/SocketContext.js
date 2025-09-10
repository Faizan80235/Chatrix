import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const { user } = useAuth();
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);

  useEffect(() => {
    if (user) {
      // Initialize socket connection
      const newSocket = io('http://localhost:5000', {
        auth: {
          token: localStorage.getItem('token')
        }
      });

      // Connection event handlers
      newSocket.on('connect', () => {
        console.log('Connected to server');
        setConnected(true);
      });

      newSocket.on('disconnect', () => {
        console.log('Disconnected from server');
        setConnected(false);
      });

      newSocket.on('connect_error', (error) => {
        console.error('Connection error:', error);
        setConnected(false);
        toast.error('Failed to connect to server');
      });

      // User management events
      newSocket.on('users_online', (users) => {
        setOnlineUsers(users);
      });

      // Message events
      newSocket.on('receive_message', (message) => {
        setMessages(prev => [...prev, {
          ...message,
          type: 'received'
        }]);
        
        // Show notification for new message
        if (Notification.permission === 'granted') {
          new Notification(`New message from ${message.sender.email}`, {
            body: message.message,
            icon: '/favicon.ico'
          });
        }
      });

      newSocket.on('message_sent', (message) => {
        setMessages(prev => [...prev, {
          ...message,
          type: 'sent'
        }]);
      });

      // Typing indicators
      newSocket.on('user_typing', (data) => {
        setTypingUsers(prev => {
          if (!prev.find(u => u.userId === data.userId)) {
            return [...prev, data];
          }
          return prev;
        });
      });

      newSocket.on('user_stopped_typing', (data) => {
        setTypingUsers(prev => prev.filter(u => u.userId !== data.userId));
      });

      // Error handling
      newSocket.on('error', (error) => {
        console.error('Socket error:', error);
        toast.error(error.message || 'An error occurred');
      });

      setSocket(newSocket);

      // Request notification permission
      if (Notification.permission === 'default') {
        Notification.requestPermission();
      }

      // Cleanup on unmount
      return () => {
        newSocket.disconnect();
      };
    }
  }, [user]);

  const sendMessage = (receiverId, message) => {
    if (socket && connected) {
      socket.emit('send_message', {
        receiverId,
        message: message.trim()
      });
    }
  };

  const startTyping = (receiverId) => {
    if (socket && connected) {
      socket.emit('typing_start', { receiverId });
    }
  };

  const stopTyping = (receiverId) => {
    if (socket && connected) {
      socket.emit('typing_stop', { receiverId });
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const value = {
    socket,
    connected,
    onlineUsers,
    messages,
    typingUsers,
    sendMessage,
    startTyping,
    stopTyping,
    clearMessages
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};