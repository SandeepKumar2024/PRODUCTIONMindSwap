import React, { useEffect} from 'react'
import Navbar from '../Components/Navbar/Navbar'
import MyProfile from '../Components/My Profile/MyProfileComponent'
import Footer from '../Components/Footer/Footer'
import { useSelector } from 'react-redux';
import socket from './Socket Connection/Socket';

function MyProfilePage() {
  const   id  = useSelector((state) => state.auth.userId || null);

  useEffect(() => {
    socket.emit("new-user-add", id);
  }, [id]);
  
  return (
   <>
   <Navbar/>
   <MyProfile id={id}/>
   <Footer/>
   </>
  )
}

export default MyProfilePage
