# Chat Application Frontend

A modern, responsive React chat application with real-time messaging capabilities.

## 🚀 Features

- **Real-time messaging** with Socket.IO
- **User authentication** (login/register)
- **Responsive design** with Bootstrap
- **Online/offline status** indicators
- **Typing indicators**
- **Message read receipts**
- **Mobile-friendly** interface
- **Beautiful UI** with Lucide React icons

## 📁 Project Structure

```
src/
├── components/
│   ├── Auth/
│   │   ├── Login.js
│   │   └── Register.js
│   └── Chat/
│       ├── Chat.js
│       ├── Sidebar.js
│       ├── UserItem.js
│       ├── ChatArea.js
│       ├── ChatHeader.js
│       ├── MessageList.js
│       ├── Message.js
│       ├── MessageInput.js
│       └── ConnectionStatus.js
├── context/
│   ├── AuthContext.js
│   └── SocketContext.js
├── App.js
├── App.css
└── index.js
```

## 🛠 Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Backend URL
Update the Socket.IO connection URL in `src/context/SocketContext.js`:
```javascript
const newSocket = io('http://localhost:5000', {
  // your backend URL
});
```

### 3. Start Development Server
```bash
npm start
```

The app will open at `http://localhost:3000`

## 🔧 Key Dependencies

- **React 18** - UI library
- **React Router DOM** - Client-side routing
- **Bootstrap** - CSS framework
- **React Bootstrap** - Bootstrap components for React
- **Socket.IO Client** - Real-time communication
- **Axios** - HTTP client
- **Lucide React** - Modern icons
- **React Toastify** - Notifications

## 💡 Component Overview

### Authentication Components
- **Login.js** - User login form with validation
- **Register.js** - User registration form with validation

### Chat Components
- **Chat.js** - Main chat container and state management
- **Sidebar.js** - User list and navigation
- **UserItem.js** - Individual user list item
- **ChatArea.js** - Main chat interface
- **ChatHeader.js** - Chat header with user info
- **MessageList.js** - Container for all messages
- **Message.js** - Individual message component
- **MessageInput.js** - Message composition area
- **ConnectionStatus.js** - Connection indicator

### Context Providers
- **AuthContext.js** - Authentication state and methods
- **SocketContext.js** - Socket.IO connection and real-time features

## 🎨 Styling Features

- **Responsive design** - Works on desktop, tablet, and mobile
- **Modern UI** - Clean and intuitive interface
- **Smooth animations** - Typing indicators and transitions
- **Bootstrap integration** - Consistent styling framework
- **Custom CSS** - Enhanced visual elements

## 📱 Mobile Responsiveness

- **Adaptive layout** - Sidebar collapses on mobile
- **Touch-friendly** - Large touch targets
- **Optimized performance** - Efficient rendering
- **Progressive Web App ready** - Can be installed on mobile devices

## 🔐 Security Features

- **JWT token authentication**
- **Automatic token refresh**
- **Protected routes**
- **Input validation**
- **XSS protection**

## 🚀 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 📋 Environment Setup

Make sure your backend is running on `http://localhost:5000` or update the URLs in:
- `SocketContext.js` for Socket.IO connection
- `package.json` proxy setting for API calls

## 🤝 Usage

1. **Register** a new account or **login** with existing credentials
2. **Select a user** from the sidebar to start chatting
3. **Type messages** in the input area and press Enter to send
4. **See real-time updates** when users come online/offline
5. **View typing indicators** when someone is typing
6. **Get notifications** for new messages

## 🔄 Real-time Features

- Instant message delivery
- Online/offline status updates
- Typing indicators
- Message read receipts
- Connection status monitoring
- Automatic reconnection

The frontend seamlessly integrates with the backend to provide a complete real-time chat experience!