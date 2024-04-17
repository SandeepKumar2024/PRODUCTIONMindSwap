import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import './NotificationPageComponent.css'
import axios from 'axios';
import { Link } from 'react-router-dom'
function NotificationPageComponent({ id }) {

  //fetch notifications
  const [notifications, setNotification] = useState([]);
  const [senderDetails, setSenderDetails] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/notification/${id}`);
      setNotification(res.data);
    }
    fetchData();

  }, [id, notifications]);

  //fetch sender info 
  useEffect(() => {
    const fetchSenderDetails = async () => {
      // Check if notifications.notice is defined before proceeding
      if (!notifications.notice) {
        return;
      }

      const senderIds = notifications.notice?.map(item => item.sender);
      try {
        // Fetch sender details for each sender ID
        const responses = await Promise.all(senderIds?.map(senderId => axios.get(`/api/user/get/${senderId}`)));

        // Extract sender details from responses
        const senderDetailsMap = {};
        responses.forEach((response, index) => {
          const senderId = senderIds[index];
          senderDetailsMap[senderId] = response.data;
        });

        setSenderDetails(senderDetailsMap);
      } catch (error) {
        console.error('Error fetching sender details:', error.message);
      }
    };

    fetchSenderDetails();
  }, [notifications]);

  //time calculations
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
      return 'Just now';
    } else if (secondsDifference < secondsInHour) {
      const minutes = Math.floor(secondsDifference / secondsInMinute);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (secondsDifference < secondsInDay) {
      const hours = Math.floor(secondsDifference / secondsInHour);
      return `  ${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (secondsDifference < secondsInMonth) {
      const days = Math.floor(secondsDifference / secondsInDay);
      return `  ${days} day${days > 1 ? 's' : ''} ago`;
    } else if (secondsDifference < secondsInYear) {
      const months = Math.floor(secondsDifference / secondsInMonth);
      return ` ${months} month${months > 1 ? 's' : ''} ago`;
    } else {
      const years = Math.floor(secondsDifference / secondsInYear);
      return ` ${years} year${years > 1 ? 's' : ''} ago`;
    }
  }

  //delete notifications
  const handleDeleteNotification = async (id) => {
    try {
      await axios.delete(`/api/notification/${id}`);
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <>
      <div className="notificationPageContainer">
        <div className="pageName">
          <h1>ALL NOTIFICATIONS{notifications.totalNotification > 0 && <span style={{ color: "red", fontSize: "1.5rem" }}>({notifications.totalNotification})</span>}</h1>
        </div>
        {notifications.notice?.map((item, index) => (
          <div key={index} id={`notification-${index}`} className="allNotifications">
            <div className="sourceProfile">
              {senderDetails[item?.sender]?.profilePic ? <img src={`${senderDetails[item?.sender]?.profilePic}`} alt="" /> : <img src='/Images/profile.png'></img>}
            </div>
            <div className="contentContainer">
              <div className="content">
                <span className="name">{senderDetails[item?.sender]?.name}</span>
                <span> : </span>
                <span className="content-text">{item?.message}</span>
                {item?.url && <Link to={item?.url}>Join</Link>}
              </div>
              <div id="notificationTime">
                <span className="time">{calculateTimeDifference(item?.timestamp)}</span>
              </div>
            </div>
            <div id="deleteNotification">
              <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteNotification(item?._id)} />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default NotificationPageComponent
