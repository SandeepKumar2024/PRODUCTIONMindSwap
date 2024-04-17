import React, { useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import NotificationPageComponent from '../Components/Notification Page/NotificationPageComponent';
import { useSelector } from "react-redux";
import socket from "./Socket Connection/Socket";

function NotificationPage() {
  const id = useSelector((state) => state.auth.userId || null);
  useEffect(() => {
    socket.emit("new-user-add", id);
  }, [id]);
  return (
    <>
      <Navbar />
      <NotificationPageComponent id={id} />
      <Footer />
    </>
  );
}

export default NotificationPage;
