import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Filter from '../Components/Main Page Component/Filter/Filter'
import BannerCarousel from '../Components/Main Page Component/Banner Carousel/BannerCarousel'
import Footer from '../Components/Footer/Footer'
import { useSelector } from 'react-redux'
import socket from './Socket Connection/Socket'
import Profile from '../Components/Main Page Component/Profile/Profile'
import axios from 'axios'

function MainPage() {
  //Taking id from localStroage when user Login manually bt email/password
  const id = useSelector((state) => state.auth.userId || null)
  //Fetching online users from socket server
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    socket.emit("new-user-add", id);
    socket.on("get-users", (users) => {
      const filteredUsers = users.filter(user => user.userId !== id);
      setOnlineUsers(filteredUsers);
    });
  }, [id]);

  //fetch random users from db
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/user/get-all-users/random`);
        setData(res.data.filter(user => user._id !== id));
      }
      catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <Filter />
      <BannerCarousel />
      <Profile onlineUsers={onlineUsers} data={data} />
      <Footer />
    </>
  )
}

export default MainPage
