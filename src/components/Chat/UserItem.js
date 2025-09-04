import React from 'react';
import { Badge } from 'react-bootstrap';

const UserItem = ({ user, isSelected, isOnline, onClick, getUserInitials }) => {
  const formatLastSeen = (lastSeen) => {
    if (!lastSeen) return '';
    
    const now = new Date();
    const lastSeenDate = new Date(lastSeen);
    const diffInMinutes = Math.floor((now - lastSeenDate) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return lastSeenDate.toLocaleDateString();
  };

  return (
    <div 
      className={`user-item ${isSelected ? 'active' : ''}`}
      onClick={onClick}
    >
      <div className="user-avatar">
        {getUserInitials(user.name)}
      </div>
      
      <div className="user-info flex-grow-1">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="mb-0">{user.name}</h6>
          {isOnline && (
            <Badge bg="success" className="rounded-pill">
              Online
            </Badge>
          )}
        </div>
        <div className="user-status">
          <small>{user.email}</small>
          {!isOnline && (
            <div className="text-muted">
              <small>Last seen {formatLastSeen(user.lastSeen)}</small>
            </div>
          )}
        </div>
      </div>
      
      {isOnline && <div className="online-indicator"></div>}
    </div>
  );
};

export default UserItem;