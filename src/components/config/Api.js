// API Configuration
export const API_BASE_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const SOCKET_URL =
  process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    PROFILE: '/api/auth/profile'
  },
  CHAT: {
    USERS: '/api/chat/users',
    MESSAGES: '/api/chat/messages',
    SEND: '/api/chat/send',
    CONVERSATIONS: '/api/chat/conversations',
    MARK_READ: '/api/chat/mark-read'
  }
};
