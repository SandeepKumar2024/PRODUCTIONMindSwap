import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import SelectedProfile from '../Components/Selected profile/SelectedProfile'
import Footer from '../Components/Footer/Footer'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import socket from './Socket Connection/Socket'
function SelectedProfilePage() {
    const [onlineUsers, setOnlineUsers] = useState([]);
    const  id  = useSelector((state) => state.auth.userId || null);
    const userId = useParams().id;
    useEffect(() => {
        socket.emit("new-user-add", id);
        socket.on("get-users", (users) => {
            const filteredUsers = users.filter(user => user.userId !== id);
            setOnlineUsers(filteredUsers);
        });
    }, [id]);

    return (
        <>
            <Navbar />
            <SelectedProfile userId={userId} onlineUsers={onlineUsers} ownerId={id}/>
            <Footer />
        </>
    )
}

export default SelectedProfilePage
