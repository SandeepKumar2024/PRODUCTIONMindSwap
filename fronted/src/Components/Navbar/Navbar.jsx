import React, { useState, useEffect, useContext, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faSun,
  faHeart,
  faMessage,
  faBell,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons"; //for solid SVG icons
import DarkModeContext from "../Dark Mode/DarkModeContext";
import ProfileDropDown from "./Profile Drop Down/ProfileDropDown";
import RequestDropDown from "./Request UI/RequestDropDown";
import NotificationDropDown from "./Notification UI/NotificationDropDown";
import FavoriteProfile from "./Favorite Profile UI/FavoriteProfileDropDown";
import Chat from "./Messaging UI/Chat/Chat";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import socket from "../../Pages/Socket Connection/Socket";
import { useSelector } from "react-redux";
import axios from "axios";
import messageSound from "../../../public/Audio/audio.mp3";
import MindSwapLogo_blue from "/mindswapIcons/blueLogo.svg"

function Navbar() {
  const audioRef = useRef(null); // Reference to the audio element

  const userId = useSelector((state) => state.auth.userId || null);
  // Dark Mode Starts-------------------
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  // Dark Mode Ends-------------------
  const [userData, setUserData] = useState([]);
  const [requestData, setRequestData] = useState([])
  const [totalRequests, setTotalRequests] = useState([])
  const [input, setInput] = useState(" ");
  const [receivedMessage, setReceivedMessage] = useState([]);

  const handleInputChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  }
  // search profile
  const navigate = useNavigate();
  const handleSearch = async (e) => {
    e.preventDefault();
    if (input === " ") {
      return;
    }
    try {
      navigate(`/main/search?q=${encodeURIComponent(input)}`);

    } catch (err) {
      console.log(err);
    }
  };


  //fetching user from database 
  useEffect(() => {
    const fetchData = async () => {

      const res = await axios.get(`/api/user/get/${userId}`);
      setUserData(res.data);
    }
    fetchData();
  }, [userId])

  // Profile Drop Down Starts-------------------


  const [showProfileDropDown, setShowProfileDropDown] = useState(false);




  const toggleProfileDropDown = (event) => {
    event.stopPropagation();
    setShowProfileDropDown((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const profileDropDown = document.querySelector(".profile-drop-down");
      if (profileDropDown && !profileDropDown.contains(event.target)) {
        setShowProfileDropDown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Profile Drop Down Ends-------------

  //Request Drop Down Starts here---------------
  const [showRequestDropDown, setShowRequestDropDown] = useState(false);

  const toggleRequestDropDown = (event) => {
    event.stopPropagation();
    setShowRequestDropDown((prevState) => !prevState);
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      const requestDropDown = document.querySelector(".request-popup");
      if (requestDropDown && !requestDropDown.contains(event.target)) {
        setShowRequestDropDown(false);
      }

    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [requestData]);

  //incoming requests 
  useEffect(() => {
    socket.on('incoming-requests-db', (incomingData) => {
      axios.post(`/api/request`, incomingData);
    });

    return () => {
      socket.off('incoming-requests-db');
    };
  }, [socket]);


  //fetching request from database 
  useEffect(() => {
    const fetchData = async () => {

      const res = await axios.get(`/api/request/${userId}`);
      setTotalRequests(res.data);
    }
    fetchData();
  }, [totalRequests])





  //Request Drop Down Ends here---------------

  //Notification Drop Down Starts here---------------
  //@@Notification Data from Database@@@
  //fetch notifications
  const [notifications, setNotification] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/notification/limit/${userId}`);

      setNotification(res.data);

    }
    fetchData();


  }, [userId, notifications]);



  const [showNotificationDropDown, setShowNotificationDropDown] =
    useState(false);

  const toggleNotificationDropDown = (event) => {
    event.stopPropagation();
    setShowNotificationDropDown((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const notificationDropDown = document.querySelector(
        ".notification-popup"
      );
      if (
        notificationDropDown &&
        !notificationDropDown.contains(event.target)
      ) {
        setShowNotificationDropDown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  //Notification Drop Down Ends here---------------

  //favoriteProfile Drop Down Starts here---------------

  //@@favoriteProfile Data from Database@@@


  //fetch favorites id from db 
  const [favorites, setFavorites] = useState([]);
  const [favoriteList, setFavoritesList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/user/favourite/${userId}`);

      setFavorites(res.data.favourites);

    }
    fetchData();


  }, [userId, favorites]);
  //fetch user info from db with fav id 
  

  const [showFavoriteProfileDropDown, setShowFavoriteProfileDropDown] =
    useState(false);

  const toggleFavoriteProfileDropDown = (event) => {
    event.stopPropagation();
    setShowFavoriteProfileDropDown((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const favoriteProfileDropDown = document.querySelector(".fp-popup");
      if (
        favoriteProfileDropDown &&
        !favoriteProfileDropDown.contains(event.target)
      ) {
        setShowFavoriteProfileDropDown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  //favoriteProfile Drop Down Ends here---------------

  //Messaging Drop Down Starts here---------------
  const [showMessageUI, setShowMessageUI] = useState(false);

  const toggleMessageUI = (event) => {
    event.stopPropagation();
    setShowMessageUI((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const MessageUI = document.querySelector(".Chat");
      if (MessageUI && !MessageUI.contains(event.target)) {
        setShowMessageUI(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  //Messaging Drop Down Ends here---------------



  // Close all popups except the clicked one
  const closePopups = (clickedPopup) => {
    if (clickedPopup !== "profile") setShowProfileDropDown(false);
    if (clickedPopup !== "request") setShowRequestDropDown(false);
    if (clickedPopup !== "notification") setShowNotificationDropDown(false);
    if (clickedPopup !== "favorite") setShowFavoriteProfileDropDown(false);
    if (clickedPopup !== "message") setShowMessageUI(false);
  };

  //sending messages sound and indication
  useEffect(() => {
    socket.on("recieve-message", (data) => {
      // Set state to trigger re-render if necessary
      setReceivedMessage(prevMessages => [...prevMessages, data]);
      // Play the sound
      if (audioRef.current) {
        audioRef.current.play().catch(error => {
          console.error('Failed to play the message sound:', error);
        });
      }
    })

    return () => {
      socket.off("recieve-message");
    };
  }, []);

  const [unseenCount, setUnseenCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/chat/unseen/${userId}`);
        // Extract unseenCount from the response data
        if (Array.isArray(res.data)) {
          // Extract unseenCount from the response data
          const unseenCount = res.data.map(chat => chat.unseenCount).reduce((acc, count) => acc + count, 0);
          setUnseenCount(unseenCount);
        } else {
          console.error('Response data is not an array:', res.data);
        }
        setUnseenCount(unseenCount);
      } catch (error) {
        console.error('Error fetching unseen messages:', error);
      }
    };
    fetchData();
  }, [userId, unseenCount, receivedMessage]);



  return (
    <>
      <audio ref={audioRef} src={messageSound} style={{ display: "none" }}></audio>
      <header>
        <div id="header-left">
          <a href="/main">
            <img src={MindSwapLogo_blue} alt="" />
          </a>
        </div>
        <div id="header-middle">
          <form action="">
            <input
              type="text"
              name="search"
              id="search-box-input"
              placeholder="What topic you are looking for today?"
              onChange={handleInputChange}
            />
            <button type="submit" onClick={handleSearch}>
              <img src="/Images/search.png" alt="" />
            </button>
          </form>
        </div>
        <div id="header-right">
          <ul>
            <li id="message" onClick={(event) => {
              toggleMessageUI(event);
              closePopups("message")
            }}>
              {unseenCount > 0 && <div id="messageIndicator" className="indicator">
                <h1>{unseenCount}</h1>
              </div>}
              <FontAwesomeIcon icon={faMessage} />
              <h6>Messaging</h6>
            </li>
            <li
              id="favorite"
              onClick={(event) => {
                toggleFavoriteProfileDropDown(event);
                closePopups("favorite");
              }}
            >
              <FontAwesomeIcon icon={faHeart} />
              <h6>Favorite</h6>
            </li>
            <li
              id="notification"
              onClick={(event) => {
                toggleNotificationDropDown(event);
                closePopups("notification");
              }}
            >

              {notifications.totalNotification > 0 && <div id="notification-indicator" className="indicator">
                <h1>{notifications.totalNotification}</h1>
              </div>}

              <FontAwesomeIcon icon={faBell} />
              <h6>Notification</h6>
            </li>
            <li
              id="request"
              onClick={(event) => {
                toggleRequestDropDown(event);
                closePopups("request");
              }}
            >
              {totalRequests.length > 0 && <div id="requestIndicator" className="indicator">
                <h1>1</h1>
              </div>}
              <FontAwesomeIcon icon={faCircleQuestion} />
              <h6>Request</h6>
            </li>
            <li id="dark-mode-btn">
              <input
                type="checkbox"
                className="checkbox"
                id="checkbox"
                onClick={toggleDarkMode}
                defaultChecked={darkMode}
              />
              <label
                htmlFor="checkbox"
                className={`checkbox-label ${darkMode ? "dark-mode" : ""}`}
              >
                <FontAwesomeIcon icon={faMoon} />
                <FontAwesomeIcon icon={faSun} />
                <span className="ball"></span>
              </label>
            </li>
            <li
              id="profile"
              onClick={(event) => {
                toggleProfileDropDown(event);
                closePopups("profile");
              }}
            >
              {userData?.profilePic ? <img src={`/api/${userData?.profilePic}`} alt="" /> : <img src="/Images/profile.png" alt="Profile" />}
              {/* For online dot */}
              <div id="self-onlineDot"></div>
            </li>
          </ul>
        </div>
      </header>
      {showProfileDropDown && (
        <ProfileDropDown showProfileDropDown={showProfileDropDown} />
      )}
      {showRequestDropDown && (
        <RequestDropDown showRequestDropDown={showRequestDropDown} totalRequests={totalRequests} />
      )}
      {showNotificationDropDown && (
        <NotificationDropDown
          showNotificationDropDown={showNotificationDropDown}
          notificationItems={notifications.notifications}
        />
      )}
      {showFavoriteProfileDropDown && (
        <FavoriteProfile
          showFavoriteProfileDropDown={showFavoriteProfileDropDown}
          favoriteList={favoriteList}
        />
      )}
      {showMessageUI && (
        <Chat
          showMessageUI={showMessageUI}
        />
      )}
    </>
  );
}

export default Navbar;
