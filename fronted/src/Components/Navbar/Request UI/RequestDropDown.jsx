import React, { useEffect, useState } from "react";
import "./RequestDropDown.css";
import profileImage from "../../../../public/Images/profile.png";
import axios from "axios";
import socket from "../../../Pages/Socket Connection/Socket"
import { useSelector } from "react-redux";

function RequestDropDown({ showRequestDropDown, totalRequests }) {
  console.log("total requests: " + totalRequests)
  const data = totalRequests[0];
  const [userInfo, setUserInfo] = useState([]);
  const recieverId = useSelector((state) => state.auth.userId || null);
  const [sendData, setSendData] = useState([]);
  const [sendDataAccept, setSendDataAccept] = useState([]);
  const [link, setLink] = useState('');

  //Fetching SEnder Details 
  const id = data?.sender;
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const res = await axios.get(`/api/user/get/${id}`);
        setUserInfo(res.data)
      }
      fetchData();
    } else {
      setUserInfo(null)
    }

  }, [id,userInfo])

  const handleReject = async (id) => {
    try {
      const res = await axios.delete(`/api/request/delete/${id}`);
      setSendData(res.data);
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    if (sendData && sendData.rejectMsg && sendData.rejectMsg.length > 0) {
      axios.post(`/api/notification`, {
        sender: sendData.rejectMsg[0].reciever,
        reciever: sendData.rejectMsg[0].sender,
        message: sendData.message,
        question: sendData.rejectMsg[0].question
      });
    }
  }, [sendData])

  //accept request 

  const handleAccept = async (id) => {
    try {
      const res = await axios.delete(`/api/request/delete/accept/${id}`);
      setSendDataAccept(res.data);
      const roomRes = await axios.post(`/api/create-room`, {
        sender: data?.sender,
        reciever: recieverId,

      })

      if (roomRes.data && roomRes.data.roomId) {
        // Set the link state with the room ID
        setLink(roomRes.data.roomId);
      }
    } catch (error) {
      console.log(error.message)
    }

  }




  useEffect(() => {
    // Redirect to the video call page when the link state is updated
    if (link) {
      window.open(`/videoCall/${link}`, '_blank');
    }
  }, [link]);
  console.log("link is updated", link);





  useEffect(() => {
    if (sendDataAccept && sendDataAccept.rejectMsg && sendDataAccept.rejectMsg.length > 0) {
      axios.post(`/api/notification`, {
        sender: sendDataAccept.rejectMsg[0].reciever,
        reciever: sendDataAccept.rejectMsg[0].sender,
        message: sendDataAccept.message,
        question: sendDataAccept.rejectMsg[0].question,
        url: `/videoCall/${link}`
      });
    }
  }, [link])


  return (
    <>
      <div
        className={`request-popup ${showRequestDropDown ? "show-request-popup" : ""
          }`}
      >
        <div id="requestIndicationArrow"></div>
        <div className="request-sender">
          <div className="requestSenderProfilePic">
            {userInfo?.profilePic ? <img src={`$/api/{userInfo?.profilePic}`} alt="" id="requestSenderProfilePicture" /> : <img src="/public/Images/profile.png" alt="Profile" />}
          </div>
          <div className="requestSenderDetail">
            <div className="requestSenderName">
              <h3 id="requestSenderName">{userInfo?.name}</h3>
            </div>
            <div className="requestSenderCurrentPositonAndInstituteOrCompany">
              <h6>
                <span id="requestSenderCurrentPositon">{userInfo?.currentPosition}</span>
                {userInfo && <span> @ </span>}
                <span id="requestSenderInstituteOrCompany">{userInfo?.institute}</span>
              </h6>
            </div>
          </div>
        </div>
        <div className="requestSenderQuestion">
          {data?.question ? <h2 id="requestSenderQuestion">
            {data?.question}
          </h2> : <h2 id="requestSenderQuestion">No request found !</h2>}
        </div>
        {data && <div className="requestAction">
          <button id="accept" onClick={() => handleAccept(data?._id)}>Accept</button>
          <button id="reject" onClick={() => handleReject(data?._id)}>Reject</button>
        </div>}
      </div>
    </>
  );
}

export default RequestDropDown;
