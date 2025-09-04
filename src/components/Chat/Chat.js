import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './Sidebar';
import ChatArea from './Chatarea';
import { useSocket } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';
import { API_ENDPOINTS } from '../config/Api';
import ConnectionStatus from './ConnectionStatus';

const Chat = () => {
  const { user, api } = useAuth();
  const { connected, clearMessages } = useSocket();
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Load chat history when a user is selected
  useEffect(() => {
    if (selectedUser) {
      loadChatHistory(selectedUser.id);
    } else {
      setChatHistory([]);
      clearMessages();
    }
  }, [selectedUser, clearMessages]);

  const fetchUsers = async () => {
    try {
      const response = await api.get(API_ENDPOINTS.CHAT.USERS);
      if (response.data.success) {
        setUsers(response.data.users);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const loadChatHistory = async (userId) => {
    try {
      setLoading(true);
      const response = await api.get(`${API_ENDPOINTS.CHAT.MESSAGES}/${userId}`);
      if (response.data.success) {
        setChatHistory(response.data.messages);
        // Mark messages as read
        await markMessagesAsRead(userId);
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
      setChatHistory([]);
    } finally {
      setLoading(false);
    }
  };

  const markMessagesAsRead = async (userId) => {
    try {
      await api.put(`${API_ENDPOINTS.CHAT.MARK_READ}/${userId}`);
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleBackToUsers = () => {
    setSelectedUser(null);
  };

  return (
    <div className="chat-container">
      <Container fluid className="h-100 p-0">
        <Row className="h-100 g-0">
          {/* Sidebar - Hidden on mobile when user is selected */}
          <Col 
            lg={4} 
            xl={3} 
            className={`${selectedUser ? 'd-none d-lg-block' : ''}`}
          >
            <Sidebar
              users={users}
              selectedUser={selectedUser}
              onUserSelect={handleUserSelect}
              currentUser={user}
            />
          </Col>
          
          {/* Chat Area - Full width on mobile when user is selected */}
          <Col 
            lg={8} 
            xl={9} 
            className={`${!selectedUser ? 'd-none d-lg-block' : ''}`}
          >
            <ChatArea
              selectedUser={selectedUser}
              chatHistory={chatHistory}
              loading={loading}
              onBackToUsers={handleBackToUsers}
              currentUser={user}
            />
          </Col>
        </Row>
      </Container>
      
      <ConnectionStatus connected={connected} />
    </div>
  );
};

export default Chat;