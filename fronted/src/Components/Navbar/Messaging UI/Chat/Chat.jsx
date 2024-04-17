import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import socket from "../../../../Pages/Socket Connection/Socket";
import ChatBox from "../ChatBox/ChatBox";
import Conversation from "../Conversation/Conversation";


function Chat({ showMessageUI }) {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.auth.userId || null);


  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  // Get the chat in chat section
  useEffect(() => {
    const getChats = async () => {
      try {
        const res = await axios.get(`/api/chat/${id}`);
        setChats(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [id]);

  // Connect to Socket.io
  useEffect(() => {
    socket.emit("new-user-add",id);

    
    socket.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [id]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.emit("send-message", sendMessage);
      
    }
  }, [sendMessage]);


  // Get the message from socket server
  useEffect(() => {
    socket.on("recieve-message", (data) => {
      setReceivedMessage(data);
    });
  }, []);
  // console.log("socket data received",receivedMessage);


  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <div className={`Chat ${showMessageUI ? "Show-Chat" : ""}`}>

      <div id="messageIndicationArrow"></div>
      
      {/* Left Side */}
      <div className="Left-side-chat">

        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat) => (
              <div
                key={chat._id}
                onClick={() => {
                  setCurrentChat(chat);
                }}
              >
                <Conversation
                  data={chat}
                  currentUser={id}
                  online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="Right-side-chat">

        <ChatBox
          chat={currentChat}
          currentUser={id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>
    </div>
  );
};

export default Chat;