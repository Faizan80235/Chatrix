import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import io from "socket.io-client";

//Connect to backend socket
const socket = io("http://localhost:5000"); // Make sure backend is running

export default function ChatPage() {
  // logged-in User
  const user = JSON.parse(localStorage.getItem("user"));

  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]); //  Corrected: initialized as array
  const [chatMessages, setChatMessages] = useState([]);
  const [receiver, setReceiver] = useState(null);

  //  Fetch all users except current user
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:5000/api/users/${user._id}`);
        const data = await res.json();
        setUsers(data.data); // Make sure backend returns array
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };
    fetchUsers();
  }, [user._id]);

  //  Fetch messages for selected user
  const handleSelectUser = async (selectedUser) => {
    setReceiver(selectedUser); //  Set receiver (corrected)
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/messages/${user._id}/${selectedUser._id}`
      );

      const data = await response.json();
      if (response.ok) {
        setChatMessages(data.data);
      } else {
        console.log("Failed to fetch messages:", data.message);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  //  Real-time message receiving
  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("Real-time message received:", data);
      if (
        (data.sender_id === receiver?._id && data.receiver_id === user._id) ||
        (data.sender_id === user._id && data.receiver_id === receiver?._id)
      ) {
        setChatMessages((prevMessages) => [...prevMessages, data]);
      }
    });

    return () => {
      socket.off("receive_message");
    };
  }, [receiver, user._id]);
  //  Send message
  const handleSendMessage = async () => {
    if (!message.trim() || !receiver) return;

    const newMessage = {
      sender_id: user._id,
      receiver_id: receiver._id,
      message: message,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMessage),
      });

      const data = await response.json();

      if (response.ok) {
        setChatMessages([...chatMessages, data.data]);
        socket.emit("send_message", data.data);
        setMessage("");
      } else {
        console.error("Failed to send message:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/*  Users List (30%) */}
      <div className="w-[30%] border-r border-gray-800 overflow-y-auto">
        <div className="p-4 bg-gray-800 font-semibold text-lg">Chats</div>
        {users.length > 0 ? (
          users.map((u) => (
            <div
              key={u._id}
              onClick={() => handleSelectUser(u)}
              className={`p-4 cursor-pointer hover:bg-gray-700 flex items-center gap-2 ${
                receiver?._id === u._id ? "bg-gray-700" : ""
              }`}
            >
              <div>{u.name}</div>
            </div>
          ))
        ) : (
          <div className="p-4 text-gray-400">No users found</div>
        )}
      </div>

      {/*  Chat Area (70%) */}
      <div className="flex flex-col w-[70%]">
        {/* Header */}
        <div className="p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
          <h3 className="text-lg font-semibold">
            {receiver ? receiver.name : "Select a user to chat"}
          </h3>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-2 bg-[url('https://web.whatsapp.com/img/bg-chat-tile_a3f681fe9d8bc9c4c9f02a27bfc3c1eb.png')] bg-center bg-cover space-y-2">
          {chatMessages.map((msg, index) => (
            <ChatBubble
              key={index}
              message={msg.message}
              sent={msg.sender_id === user._id}
            />
          ))}
        </div>

        {/* Input Box */}
        {receiver && (
          <div className="p-2 bg-gray-800 flex items-center gap-2">
            <input
              type="text"
              placeholder="Type a message"
              className="flex-1 bg-gray-700 px-4 py-2 rounded-full focus:outline-none text-white"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              className="bg-green-600 p-3 rounded-full"
            >
              <FontAwesomeIcon icon={faPaperPlane} className="text-white" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

//  Chat Bubble Component
function ChatBubble({ message, sent }) {
  return (
    <div
      className={`max-w-[75%] p-2 px-4 rounded-xl text-sm ${
        sent
          ? "bg-green-600 text-white ml-auto"
          : "bg-gray-700 text-white mr-auto"
      }`}
    >
      {message}
    </div>
  );
}
