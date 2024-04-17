import React, { useEffect, useState } from 'react'
import './Card.css'
import { useNavigate } from "react-router-dom"
import axios from 'axios'

function Card({ onlineUsers, user }) {

    const navigate = useNavigate();
    const handleDetailsView = (id) => {

        navigate(`/selectedProfile/${id}`)
    }

    const [favouritesCount, setFavouritesCount] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`/api/user/followers/${user._id}`);
            setFavouritesCount(response.data.totalFollowers);
        }
        fetchData();

    }, [user._id]);
    return (
        <>
            <div className="profileCard" key={user?._id} onClick={() => handleDetailsView(user._id)}>
                <div className="pofileCard-graphics" key={user._id}>
                    {user?.profileBanner ? <img src={`${user.profileBanner}`} alt="" /> : <div style={{backgroundColor:"rgb(166 170 233)",height:"100%", borderRadius:"10px"}}></div>}
                    <div className="profileCardImage">
                        {user?.profilePic ? <img src={`${user.profilePic}`} alt="" /> : <img src="/Images/profile.png" alt="Profile" />}

                        {onlineUsers.some((online) => online.userId == user._id) ? <div className="profileOnline-dot"></div> : <div className="profileOffline-dot"></div>}
                    </div>
                </div>

                <div className="profileCardDetails" >
                    <div className="user-name">
                        <h3>{user.name} </h3>
                    </div>
                    <div className="user-headline">
                        <p>{user.headline}</p>
                    </div>
                    <div className="f-s">
                        <div className="user-followers">
                            <h6>Followers:{favouritesCount}</h6>
                        </div>
                        <div className="user-status">
                            {onlineUsers.some((online) => online.userId == user._id) ? <h6>Available now</h6> : <h6>Offline</h6>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card
