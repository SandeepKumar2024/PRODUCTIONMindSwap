import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import UpdateProfileComponent from '../Components/Update Profile/UpdateProfileComponent'
import Footer from '../Components/Footer/Footer'
import { useSelector } from 'react-redux';
import socket from './Socket Connection/Socket';

function UpdateProfilePage() {
  const id = useSelector((state) => state.auth.userId || null);
  useEffect(() => {
    socket.emit("new-user-add", id);
  }, [id]);

  return (
    <>
      <Navbar />
      <UpdateProfileComponent id={id} />
      <Footer />
    </>
  )
}

export default UpdateProfilePage
