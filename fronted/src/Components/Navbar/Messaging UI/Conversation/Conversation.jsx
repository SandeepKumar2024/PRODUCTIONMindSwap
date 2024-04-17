import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { format } from "timeago.js";
import './Conversation.css'
const Conversation = ({ data, currentUser, online }) => {
  const [userData, setUserData] = useState(null)
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.auth.userId || null);

  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUser)
    const getUserData = async () => {
      try {
        const { data } = await axios.get(`/api/user/get/${userId}`)
        setUserData(data)
      }
      catch (error) {
        console.log(error)
      }
    }
    getUserData();
  }, [data, currentUser])
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

  //get unread messages

  useEffect(() => {
    const chatId = data._id;
  }, [data])


  //on clicking remove the indictor of message icon
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await axios.get(`/api/chat/unseen/${userId}`);
        setChats(res.data);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };
    fetchChats();
  }, [userId]);


  const handleMarkAsSeen = async (chatId) => {
    try {
      await axios.put(`/api/chat/seen/${userId}/${chatId}`);
      // After marking messages as seen, update the conversation state to remove the unseen indicator
      setUserData(prevUserData => ({ ...prevUserData, unseenCount: 0 }));
    } catch (error) {
      console.error('Error marking messages as seen:', error);
    }
  };

  return (
    <>

      <div className="follower conversation" onClick={() => handleMarkAsSeen(data?._id)}>
        <div className="pp">
          {/* For showing online Dot */}
          {online && <div className="online-dot"></div>}
          {/* For showing offline Dot */}
          {!online && <div className="offline-dot"></div>}
          {userData?.profilePic ? <img
            src={`${userData?.profilePic}`}
            alt="Profile"
          /> : <img
            src="/Images/profile.png"
            alt=""
          />}
        </div>
        <div className="pp-name">
          <span>{userData?.name}</span>
          <span className="status">{calculateTimeDifference(userData?.lastSeen)}</span>
          {/* {data.members[0] !== currentUser && <span>{data?.unreadCount}</span>} */}
        </div>
      </div>
    </>
  );
};

export default Conversation;