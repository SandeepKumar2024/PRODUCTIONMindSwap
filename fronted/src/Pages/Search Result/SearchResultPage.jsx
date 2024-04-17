import React, { useEffect, useState } from 'react'
import './SearchResultPage.css'
import Navbar from '../../Components/Navbar/Navbar'
import Filter from '../../Components/Main Page Component/Filter/Filter'
import Footer from '../../Components/Footer/Footer'
import Card from '../../Components/Profile Card/Card'
import socket from '../Socket Connection/Socket'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import axios from "axios"



function SearchResultPage() {
    const id = useSelector((state) => state.auth.userId || null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [data, setData] = useState([])
    const [displayUsers, setDisplayUsers] = useState([]);
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get('q');
    useEffect(() => {
        socket.emit("new-user-add", id);
        socket.on("get-users", (users) => {
            const filteredUsers = users.filter(user => user.userId !== id);
            setOnlineUsers(filteredUsers);
        });
    }, [id]);


    //search profiles card 
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`/api/search?q=${searchQuery}`);
            setData(res.data.info)

        }
        fetchData();
    }, [searchQuery]);

    //for reteriving online profile id only 
    useEffect(() => {
        const displayUsersArray = [];
        for (const user of data) {
            // Check if the user ID exists in onlineUsers array
            if (onlineUsers.some(onlineUser => onlineUser.userId === user._id)) {
                // If user is online, add them to displayUsers array
                displayUsersArray.push(user);
            }
            setDisplayUsers(displayUsersArray);
        }
    }, [data, onlineUsers]);





    return (
        <>
            <Navbar />
            <Filter />
            {displayUsers.length > 0 ? <div>
                <h2 id="sf">Result for <span style={{ fontWeight: "bold" }}>{searchQuery}</span></h2>
                <div id="allSearchResult">
                    {displayUsers?.map((user) => (
                        <Card user={user} onlineUsers={onlineUsers} />
                    ))}
                </div>
            </div> : <h2 id='not-found'>No Online users found for <span>{searchQuery}</span></h2>}
            <Footer />

        </>
    )
}

export default SearchResultPage
