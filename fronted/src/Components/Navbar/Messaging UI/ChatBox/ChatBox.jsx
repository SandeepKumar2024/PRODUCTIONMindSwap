import React, { useEffect, useState } from "react";
import { useRef } from "react";
import axios from "axios";
import "./ChatBox.css";
import { format } from "timeago.js";
import InputEmoji from 'react-input-emoji'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"; //for solid SVG icons
import messageSentSound from "../../../../../public/Audio/audio2.mp3";
const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage }) => {

  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const audioRef = useRef(null); // Reference to the audio element
  const chatBodyRef = useRef(null);
  useEffect(() => {
    // Scroll to the bottom of the chat box whenever messages change
    scrollToBottom();
  }, [messages]);
  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight - chatBodyRef.current.clientHeight;
    }
  };
  useEffect(() => {
    // Add event listener to prevent scroll on parent elements
    const handleScroll = (e) => {
      e.stopPropagation();
    };

    if (chatBodyRef.current) {
      chatBodyRef.current.addEventListener("wheel", handleScroll, { passive: false });
    }

    return () => {
      if (chatBodyRef.current) {
        chatBodyRef.current.removeEventListener("wheel", handleScroll);
      }
    };
  }, []);

  const handleChange = (newMessage) => {
    setNewMessage(newMessage)
  }

  // fetching data for header
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await axios.get(`/api/user/get/${userId}`);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  // fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (chat) {
          const { data } = await axios.get(`/api/message/${chat._id}`);
          setMessages(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (chat) fetchMessages();
  }, [chat, currentUser]);

  // Send Message
  const handleSend = async (e) => {
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    }
    const recieverId = chat.members.find((id) => id !== currentUser);
    // send message to socket server
    setSendMessage({ ...message, recieverId })
    // send message to database
    try {
      const { data } = await axios.post(`/api/message`, message);
      setMessages([...messages, data]);
      setNewMessage("");
      const unreadMessage = await axios.post(`/api/chat/unread`, { chatId: chat?._id });
      audioRef.current.play();

    }
    catch {
      console.log("error")
    }
  }

  // Receive Message from parent component
  useEffect(() => {
    if (receivedMessage !== null && receivedMessage.chatId === chat._id && receivedMessage.senderId !== currentUser) {

      setMessages([...messages, receivedMessage]);
    }

  }, [receivedMessage, currentUser])

  // Function to calculate the time difference
  function calculateTimeDifference(lastSeen) {
    const currentTime = new Date();
    const lastSeenTime = new Date(lastSeen);

    // Calculate the difference in milliseconds
    const timeDifference = currentTime - lastSeenTime;

    // Convert milliseconds to seconds
    const secondsDifference = Math.floor(timeDifference / 1000);

    // Calculate different time intervals
    const secondsInMinute = 60;
    const secondsInHour = secondsInMinute * 60;
    const secondsInDay = secondsInHour * 24;
    const secondsInMonth = secondsInDay * 30;
    const secondsInYear = secondsInDay * 365;

    // Check the time interval and return appropriate message
    if (secondsDifference < secondsInMinute) {
      return 'Online';
    } else if (secondsDifference < secondsInHour) {
      const minutes = Math.floor(secondsDifference / secondsInMinute);
      return `Last seen ${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (secondsDifference < secondsInDay) {
      const hours = Math.floor(secondsDifference / secondsInHour);
      return `Last seen ${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (secondsDifference < secondsInMonth) {
      const days = Math.floor(secondsDifference / secondsInDay);
      return `Last seen ${days} day${days > 1 ? 's' : ''} ago`;
    } else if (secondsDifference < secondsInYear) {
      const months = Math.floor(secondsDifference / secondsInMonth);
      return `Last seen ${months} month${months > 1 ? 's' : ''} ago`;
    } else {
      const years = Math.floor(secondsDifference / secondsInYear);
      return `Last seen ${years} year${years > 1 ? 's' : ''} ago`;
    }
  }

  const scroll = useRef();
  const imageRef = useRef();
  return (
    <>
      <div className="ChatBox-container">
        <audio ref={audioRef} src={messageSentSound} style={{ display: "none" }}></audio>
        {chat ? (
          <>
            {/* chat-header */}
            <div className="chat-header">
              <div className="follower">
                <div className="pp">
                  {userData?.profilePic ? <img
                    src={`${userData?.profilePic}`}
                    alt="Profile"
                  /> : <img
                    src="/Images/profile.png"
                    alt=""
                  />}
                </div>
                <div className="pp-name">
                  <span>
                    {userData?.name}
                  </span>
                  <span className="status">
                    {calculateTimeDifference(userData?.lastSeen)}
                  </span>
                </div>
              </div>
            </div>
            {/* chat-body */}
            <div className="chat-body" ref={chatBodyRef}>
              {messages.map((message) => (
                <>
                  <div key={message._id}
                    ref={scroll}
                    className={
                      message.senderId === currentUser
                        ? "message own"
                        : "message"
                    }
                  >
                    <span>{message.text}</span>{" "}
                    <span>{format(message.createdAt)}</span>
                  </div>
                </>
              ))}
            </div>
            {/* chat-sender */}
            <div className="chat-sender">
              {/* //==================== File upload in message to beadded later==================== */}
              {/* <div onClick={() => imageRef.current.click()} className="upload">+</div> */}
              <InputEmoji
                value={newMessage}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {

                    if (newMessage !== '') {
                      handleSend(); // Call handleSend function on Enter key press
                    }
                  }
                }}
              />
              {newMessage && newMessage.trim() !== '' && <div className="send-button" onClick={handleSend}>
                <FontAwesomeIcon icon={faPaperPlane} />
              </div>}
              <input
                type="file"
                name=""
                id=""
                style={{ display: "none" }}
                ref={imageRef}
              />
            </div>{" "}
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
        )}
      </div>
    </>
  );
};

export default ChatBox;