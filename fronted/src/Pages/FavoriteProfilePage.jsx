import React, { useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar";
import FavoriteProfilePageComponent from "../Components/Favorite Profile Page/FavoriteProfilePageComponent";
import Footer from "../Components/Footer/Footer";
import { useSelector } from "react-redux";
import socket from "./Socket Connection/Socket";
function FavoriteProfilePage() {
  const id = useSelector((state) => state.auth.userId || null);
  useEffect(() => {
    socket.emit("new-user-add", id);
  }, [id]);

  return (
    <>
      <Navbar />
      <FavoriteProfilePageComponent userId={id} />
      <Footer />
    </>

  );
}

export default FavoriteProfilePage;
