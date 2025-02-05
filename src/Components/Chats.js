import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCog,
  faSignOutAlt,
  faPaperPlane,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";

// Chat Page Component
export default function ChatPage() {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 flex flex-col">
        <div className="p-4 bg-gray-900 border-b border-gray-700 text-center">
          <h2 className="text-lg font-bold">Chatrix</h2>
        </div>
        <div className="flex-1">
          <Link to="/profile" style={{textDecoration:"none"}}>
            <SidebarItem icon={faUser} text="Profile" />
          </Link>
          <a to="/settings">
            <SidebarItem icon={faCog} text="Settings" />
          </a>
          <Link to="/logout" style={{textDecoration:"none"}}>
            <SidebarItem icon={faSignOutAlt}  text="Logout" />
          </Link>
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-4 bg-gray-800 border-b border-gray-700 flex items-center justify-between">
          <h3 className="text-lg font-semibold">""</h3>
          <span className="text-sm text-gray-400">Online</span>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-900">
          <ChatMessage text="Ab is ko start kar dete hai" type="sent" />
          <ChatMessage text="Maze ka project hai" type="received" />
        </div>

        {/* Input Box */}
        <div className="p-4 bg-gray-800 border-t border-gray-700 flex items-center">
          <button className="p-2 text-gray-400 hover:text-white">
          </button>
          <input
            type="text"
            placeholder="Type a message"
            className="flex-1 bg-gray-700 p-2 mx-2 rounded-lg focus:outline-none"
          />
          <button className="p-2 text-gray-400 hover:text-white">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
    </div>
  );
}

// Sidebar Item Component
function SidebarItem({ icon, text }) {
  return (
    <div className="p-4 flex items-center space-x-3 hover:bg-gray-700 cursor-pointer">
      <FontAwesomeIcon icon={icon} className="text-gray-400" />
      <span className="text-white">{text}</span>
    </div>
  );
}

// Chat Message Component
function ChatMessage({ text, type }) {
  const messageStyle =
    type === "sent" ? "bg-blue-600 self-end" : "bg-gray-700 self-start";
  return (
    <div className={`p-3 rounded-lg mb-2 max-w-sm ${messageStyle}`}>
      {text}
    </div>
  );
}
