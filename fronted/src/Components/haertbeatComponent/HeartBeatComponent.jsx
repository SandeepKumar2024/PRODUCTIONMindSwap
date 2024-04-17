// HeartbeatComponent.js

import React, { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const HeartBeatComponent = () => {
  useEffect(() => {
    const intervalId = setInterval(sendHeartbeat, 1000); // Send heartbeat every 1 second

    return () => {
      clearInterval(intervalId); // Clear the interval on component unmount
    };
  }, []);

  //updated later with redux
  const user = localStorage.getItem("userId");
  const id = JSON.parse(user);

  const sendHeartbeat = async () => {
    try {
      await axios.post(`/api/heartbeat`, { id: id });
    } catch (error) {
    }
  };

  return null; // HeartBeatComponent doesn't render anything
};

export default HeartBeatComponent;
