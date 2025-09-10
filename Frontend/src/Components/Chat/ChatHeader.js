import React from 'react';
import { Button, Badge } from 'react-bootstrap';
import { ArrowLeft, User, Circle } from 'lucide-react';
import { useSocket } from '../../context/SocketContext';

const ChatHeader = ({ user, onBackToUsers }) => {
  const { onlineUsers } = useSocket();

  const getUserInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const isUserOnline = () => {
    return onlineUsers.some(onlineUser => 
      onlineUser.email === user.email
    );
  };

  const formatLastSeen = (lastSeen) => {
    if (!lastSeen) return '';
    
    const now = new Date();
    const lastSeenDate = new Date(lastSeen);
    const diffInMinutes = Math.floor((now - lastSeenDate) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Active now';
    if (diffInMinutes < 60) return `Active ${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `Active ${Math.floor(diffInMinutes / 60)}h ago`;
    return `Last seen ${lastSeenDate.toLocaleDateString()}`;
  };

  return (
    <div className="chat-header">
      <div className="d-flex align-items-center">
        {/* Back Button - Visible on mobile */}
        <Button
          variant="link"
          className="d-lg-none p-2 me-2 text-muted"
          onClick={onBackToUsers}
        >
          <ArrowLeft size={20} />
        </Button>

        {/* User Avatar */}
        <div className="user-avatar me-3" style={{ width: '45px', height: '45px' }}>
          {user.name ? getUserInitials(user.name) : <User size={20} />}
        </div>

        {/* User Info */}
        <div className="flex-grow-1">
          <div className="d-flex align-items-center mb-1">
            <h5 className="mb-0 me-2">{user.name}</h5>
            {isUserOnline() ? (
              <Badge bg="success" className="d-flex align-items-center">
                <Circle size={8} className="me-1" fill="currentColor" />
                Online
              </Badge>
            ) : (
              <Badge bg="secondary" className="d-flex align-items-center">
                <Circle size={8} className="me-1" />
                Offline
              </Badge>
            )}
          </div>
          <p className="mb-0 text-muted small">
            {isUserOnline() ? 'Active now' : formatLastSeen(user.lastSeen)}
          </p>
        </div>

        {/* Additional Actions */}
        <div className="d-flex align-items-center">
          {/* You can add more header actions here like video call, voice call, etc. */}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;