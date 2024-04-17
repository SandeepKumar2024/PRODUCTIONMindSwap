import React, { useEffect, useState } from "react";
import "./NotificationDropDown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux"

function NotificationDropDown({ showNotificationDropDown, notificationItems }) {
  const [senderDetails, setSenderDetails] = useState({});
  const userId = useSelector((state) => state.auth.userId || null)

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

  useEffect(() => {
    const fetchSenderDetails = async () => {
      if (!notificationItems || notificationItems.length === 0) {
        // If there are no notification items, set senderDetails to an empty object
        setSenderDetails({});
        return;
      }

      const senderIds = notificationItems?.map(item => item.sender);
      try {
        // Fetch sender details for each sender ID
        const responses = await Promise.all(senderIds.map(id => axios.get(`/api/user/get/${id}`)));

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
  }, [notificationItems]);

  //delete notification items
  const handleDeleteNotification = async (id) => {
    try {
      if (id && userId) {

        await axios.delete(`/api/notification/${id}/${userId}`);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  //User analytics data 


  return (
    <>
      <div className={`notification-popup ${showNotificationDropDown ? "show-notification-popup" : ""}`}>
        <div id="notificationIndicationArrow"></div>
        <h1>Notifications</h1>
        {notificationItems?.map((item, index) => (
          <div key={index} id={`notification-dropdown-item-${index}`} className="notification-dropdown-items">
            <div className="sourceProfile">
              {senderDetails[item?.sender]?.profilePic ? <img src={`${senderDetails[item?.sender]?.profilePic}`} alt="" /> : <img src="/Images/profile.png" alt="Profile" />}
            </div>
            <div className="contentContainer">
              <div className="content">
                <span className="name">{senderDetails[item?.sender]?.name}</span>
                <span> : </span>
                <span className="content-text">{item?.message}</span>
                {item?.url && <a href={item.url} target="_blank" rel="noopener noreferrer" >Join</a>}

              </div>
              <div className="question">
                <span>{item?.question}</span>
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
        {notificationItems?.length > 0 ? <div id="viewAllNotifications">
          <a href="/notifications">VIEW ALL</a>

        </div> : <p style={{ textAlign: "center", marginTop: "5px" }}>No Notification </p>}
      </div>
    </>
  );
}

export default NotificationDropDown;
