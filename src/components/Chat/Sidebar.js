import React from 'react';
import { Button } from 'react-bootstrap';
import { LogOut, MessageCircle, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import UserItem from './UserItem';

const Sidebar = ({ users, selectedUser, onUserSelect, currentUser }) => {
  const { logout } = useAuth();
  const { onlineUsers } = useSocket();

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

      {/* Users List */}
      <div className="users-list flex-grow-1 overflow-auto">
        {users.length === 0 ? (
          <div className="text-center text-muted p-4">
            <Users size={48} className="mb-3 opacity-50 text-dark" />
            <p>No users available</p>
          </div>
        ) : (
          users.map(user => (
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
