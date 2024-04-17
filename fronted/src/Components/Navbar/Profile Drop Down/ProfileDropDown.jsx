import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUser, faPen, faChartLine, faClockRotateLeft, faRightFromBracket, faUserTie } from "@fortawesome/free-solid-svg-icons"; //for solid SVG icons
import "./ProfileDropDown.css";
import { useNavigate } from "react-router-dom"
import { logout } from '../../../Reducer/authSlice'
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
function ProfileDropDown(showProfileDropDown) {
  const [data, setData] = useState([])

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSuccess = useSelector((state) => state.auth.isSuccess);
  const userId = useSelector((state) => state.auth.userId);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/user/get/${userId}`);
      setData(res.data);
    }

    fetchData();
  }, [userId])

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  }
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate])

  return (
    <>
      <div
        id="profile-drop-down"
        className={`profile-drop-down ${showProfileDropDown ? "show-profile-drop-down" : ""
          } `}
      >
        <a href="/main">
          <div className="options">
            <FontAwesomeIcon icon={faHouse} />
            <h1>Go to Home</h1>
          </div>
        </a>
        <a href="/myProfile">
          <div className="options">
            <FontAwesomeIcon icon={faUser} />
            <h1 id="myProfileText">My profile</h1>
          </div>
        </a>
        <a href="/updatProfile">
          <div className="options">
            {/* <img src="Icons/edit-pen-icon.png" alt="" id="edit-profile-icon" /> */}
            <FontAwesomeIcon icon={faPen} />
            <h1>Update profile</h1>
          </div>
        </a>
        <a href="/myAnalytics">
          <div className="options">
            {/* <img src="Icons/analytics-icon.png" alt="" id="analytics-icon" /> */}
            <FontAwesomeIcon icon={faChartLine} />
            <h1>Analytics</h1>
          </div>
        </a>
        <a href="/history">
          <div className="options">
            {/* <img src="Icons/analytics-icon.png" alt="" id="analytics-icon" /> */}
            <FontAwesomeIcon icon={faClockRotateLeft} />
            <h1>History</h1>
          </div>
        </a>
        {userId && data && data?.isAdmin && <a href="/admin/dashboard">
          <div className="options">
            {/* <img src="Icons/analytics-icon.png" alt="" id="analytics-icon" /> */}
            <FontAwesomeIcon icon={faUserTie} />
            <h1>Admin</h1>
          </div>
        </a>}
        <a href="" id="logout" onClick={handleLogout}>
          <div className="options">
            {/* <img src="Icons/logout-line-icon.png" alt="" id="logout-icon" /> */}
            <FontAwesomeIcon icon={faRightFromBracket} />
            <h1>Logout</h1>
          </div>
        </a>
      </div>
    </>
  );
}

export default ProfileDropDown;
