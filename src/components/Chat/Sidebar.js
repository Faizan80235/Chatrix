import React, { useState } from 'react';
import { Button, InputGroup, FormControl, Spinner } from 'react-bootstrap';
import { LogOut, MessageCircle, Users, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import UserItem from './UserItem';
import axios from 'axios';

const Sidebar = ({ users, selectedUser, onUserSelect, currentUser }) => {
  const { logout } = useAuth();
  const { onlineUsers } = useSocket();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedUser, setSearchedUser] = useState(null);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  const getUserInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const isUserOnline = (userId) => {
    return onlineUsers.some(
      user => user.socketId &&
      (user.email === users.find(u => u._id === userId)?.email)
    );
  };

  // Search user by email from server
  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSearchedUser(null);

    if (!value) return;

    try {
      setLoadingSearch(true);
      const res = await axios.get(`/api/auth/search?email=${value}`);
      if (res.data && res.data.user) {
        setSearchedUser(res.data.user);
      }
    } catch (error) {
      console.error('User search failed:', error);
    } finally {
      setLoadingSearch(false);
    }
  };

  // Filtered users from local list
  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="chat-sidebar d-flex flex-column text-dark">
      {/* Sidebar Header */}
      <div className="sidebar-header p-3 border-bottom border-secondary">
        <div className="user-profile d-flex align-items-center">
          <div
            className="profile-avatar bg-light text-dark fw-bold me-2 d-flex align-items-center justify-content-center rounded-circle"
            style={{ width: 40, height: 40 }}
          >
            {getUserInitials(currentUser?.name || 'U')}
          </div>
          <div className="user-info flex-grow-1">
            <h6 className="mb-0 text-dark">{currentUser?.name}</h6>
            <small className="text-muted">{currentUser?.email}</small>
          </div>
          <Button
            variant="link"
            size="sm"
            className="text-dark p-1"
            onClick={handleLogout}
            title="Logout"
          >
            <LogOut size={18} className="text-dark" />
          </Button>
        </div>

        <div className="d-flex align-items-center text-muted mt-3">
          <MessageCircle size={16} className="me-2 text-dark" />
          <small>Messages</small>
        </div>
      </div>

      {/* 🔍 Search Bar */}
      <div className="p-2 border-bottom border-secondary">
        <InputGroup size="sm">
          <InputGroup.Text className="bg-light">
            <Search size={14} />
          </InputGroup.Text>
          <FormControl
            placeholder="Search by email..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </InputGroup>
      </div>

      {/* Users List */}
      <div className="users-list flex-grow-1 overflow-auto">
        {loadingSearch && (
          <div className="text-center text-muted p-3">
            <Spinner animation="border" size="sm" /> Searching...
          </div>
        )}

        {/* If searched user found but not in chat list */}
        {searchedUser && !users.find(u => u._id === searchedUser._id) && (
          <UserItem
            user={searchedUser}
            isSelected={false}
            isOnline={isUserOnline(searchedUser._id)}
            onClick={() => onUserSelect(searchedUser)}
            getUserInitials={getUserInitials}
          />
        )}

        {/* Show filtered chat users */}
        {filteredUsers.length === 0 && !searchedUser ? (
          <div className="text-center text-muted p-4">
            <Users size={48} className="mb-3 opacity-50 text-dark" />
            <p>{searchTerm ? 'No user found' : 'No users available'}</p>
          </div>
        ) : (
          filteredUsers.map(user => (
            <UserItem
              key={user._id}
              user={user}
              isSelected={selectedUser?._id === user._id}
              isOnline={isUserOnline(user._id)}
              onClick={() => onUserSelect(user)}
              getUserInitials={getUserInitials}
            />
          ))
        )}
      </div>

      {/* Online Users Count */}
      <div className="sidebar-footer p-3 border-top border-secondary">
        <div className="d-flex align-items-center text-muted">
          <div
            className="bg-success rounded-circle me-2"
            style={{ width: '8px', height: '8px' }}
          ></div>
          <small>{onlineUsers.length} users online</small>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
