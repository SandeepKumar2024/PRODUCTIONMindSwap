import React, { useEffect, useState } from 'react'
import './SelectedProfile.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faLock, faShare } from "@fortawesome/free-solid-svg-icons"; //for solid SVG icons
import RequestSenderComponent from './Request Sender Component/RequestSenderComponent';
import axios from 'axios';
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"


function SelectedProfile({ userId, onlineUsers, ownerId }) {
    const [showRequestSender, SetShowRequestSender] = useState(false);
    const [user, setUser] = useState([]);

    const toggleRequestSender = () => {
        SetShowRequestSender(!showRequestSender);
    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`/api/user/get/${userId}`);
            setUser(res.data)
        }
        fetchData();
    }, [userId])

    // For formating Date in DD_MM_YYYY format
    function formatDate(dateString) {
        if (!dateString || isNaN(new Date(dateString))) {
            return null;
        }
        const date = new Date(dateString);

        // Extract day, month, and year
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
        const year = date.getFullYear();

        // Format the date as dd-mm-yyyy
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
    }

    //handle favorites user 
    const [isFavorite, setIsFavorite] = useState(false);
    const favId = useParams().id;
    const handleFavourite = async (e) => {

        if (isFavorite) {
            await axios.delete(`/api/user/favourite/delete`, {
                data: { userId: ownerId, favId: favId },
            })

        } else {
            await axios.post(`/api/user/favourite/add`, {
                userId: ownerId,
                favId: favId,
            })
        }

        setIsFavorite(!isFavorite)
    }

    useEffect(() => {
        try {
            const fetchData = async () => {
                const res = await axios.get(`/api/user/favourite/status/${ownerId}/${favId}`)
                setIsFavorite(res.data.isFavourite);
            }
            fetchData();

        } catch (error) {
            console.log("error", error)

        }

    }, [])

    //count totat favourites 
    const [favouritesCount, setFavouritesCount] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`/api/user/followers/${userId}`);
            setFavouritesCount(response.data.totalFollowers);

        }
        fetchData();

    }, [userId, isFavorite]);


    const shareProfile = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'Check out this profile!',
                    url: `${window.location.origin}/selectedProfile/${userId}`
                });
            } else {
                // Fallback for browsers that don't support navigator.share
                const shareUrl = `${window.location.origin}/selectedProfile/${userId}`;
                const message = `Check out this profile: ${shareUrl}`;
                navigator.clipboard.writeText(message);
                alert('Profile link copied to clipboard');
            }
        } catch (error) {
            console.error('Error sharing profile:', error);
        }
    };

    //addToChatBox 
    const addToChatBox = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`/api/chat`, {
                senderId: ownerId,
                recieverId: userId,
            })
            if (res.status === 200) {
                toast.success(res.data);
            } else if (res.status === 201) {
                toast.info(res.data);
            }
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // This enables smooth scrolling
            });
        } catch (error) {
            console.log(error.message)
        }
    }
    console.log("Respondenet check:", user.respondent)
    return (
        <>
            <div id="sp-container">
                <div className="sp-banner">
                    {user?.profileBanner ? <img src={`${user?.profileBanner}`} alt="" /> : <div style={{ backgroundColor: "rgb(166 170 233)", height: "100%" }}></div>}
                </div>

                <div className="sp-box">
                    <div className="sp-left">
                        <div className="sp-left-top">
                            <div className="sp-profile">
                                {user?.profilePic ? <img src={`/api/${user.profilePic}`} alt="" /> : <img src="/Images/profile.png" alt="" />}

                                {onlineUsers.some((online) => online.userId == userId) ? <div className="sp-status-dot"></div> : <div className="sp-status-dot-off"></div>}

                            </div>
                            <div className="sp-name">
                                <h2>{user.name}</h2>
                            </div>
                            <div className="sp-position">
                                <h4>{user.position}</h4>
                            </div>
                        </div>
                        <div className="sp-left-bottom">
                            <div className="sp-memberSince">
                                <h4>Member Since</h4>
                                <p>{formatDate((user?.createdAt))}</p>
                            </div>
                            <div className="sp-followers">
                                <h4>Followers</h4>
                                <p>{favouritesCount}</p>
                            </div>
                            <div className="sp-social-links">

                                <a href={user.linkedin} target="_blank" id="linkedin">
                                    <img src="/Icons/linkedin-color-icon.png" alt="" />
                                    <h2>LinkedIn</h2>
                                </a>

                                <a href={user.instagram} target="_blank" id="instagram">
                                    <img src="/Icons/instagram-color-icon.png" alt="" />
                                    <h2>Instagram</h2>
                                </a>

                                <a href={user.twitter} target="_blank" id="twitter">
                                    <img src="/Icons/twitter-color-icon.png" alt="" />
                                    <h2>Twitter</h2>
                                </a>

                                <a href={user.github} target="_blank" id="github">
                                    <img src="/Icons/github-icon.png" alt="" id="githubIcon" />
                                    <h2>GitHub</h2>
                                </a>
                            </div>
                            <div className="sp-to-favorite-and-share">
                                <FontAwesomeIcon icon={faHeart} onClick={handleFavourite} style={{ color: isFavorite ? 'red' : 'grey' }} />
                                <div className="sp-share" onClick={shareProfile}>
                                    <FontAwesomeIcon icon={faShare} />
                                    <h6>Share</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sp-right">
                        <div className="sp-headline">
                            <h2>Headline</h2>
                            <h4>{user.headline}</h4>
                        </div>
                        <div className="sp-detail-box">
                            <h2>Details</h2>
                            <div className="sp-details">
                                <div className="sp-detail-feild">
                                    <h4 className='key'>Current Position</h4>
                                    <h4 className='value'>{user.currentPosition}</h4>
                                </div>
                                <div className="sp-detail-feild">
                                    <h4 className='key'>Course</h4>
                                    <h4 className='value'>{user.course}</h4>
                                </div>
                                <div className="sp-detail-feild">
                                    <h4 className='key'>Class / Year</h4>
                                    <h4 className='value'>{user.classYear}</h4>
                                </div>
                                <div className="sp-detail-feild">
                                    <h4 className='key'>Institute / Company</h4>
                                    <h4 className='value'>{user.institute}</h4>
                                </div>
                                <div className="sp-detail-feild">
                                    <h4 className='key'>Subject Known</h4>
                                    <h4 className='value'>{user.subjectsKnown}</h4>
                                </div>
                                <div className="sp-detail-feild">
                                    <h4 className='key'>Language Proficiency</h4>
                                    <h4 className='value'>{user.languageProficiency}</h4>
                                </div>
                                <div className="sp-detail-feild">
                                    <h4 className='key'>Extra Skills</h4>
                                    <h4 className='value'>{user.extraSkills}</h4>
                                </div>
                                <div className="sp-detail-feild">
                                    <h4 className='key'>Talks About</h4>
                                    <h4 className='value'>{user.talksAbout}</h4>
                                </div>
                                <div className="b10s">
                                    <button onClick={addToChatBox}>Message</button>
                                    {user.respondent ? <button onClick={toggleRequestSender}>Ask</button> : <button style={{ userSelect: "none", cursor: "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}><FontAwesomeIcon icon={faLock} style={{ color: "white", scale: "0.7" }} />Ask</button>}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            {showRequestSender && <RequestSenderComponent showRequestSender={showRequestSender} toggleRequestSender={toggleRequestSender} />}
        </>
    )
}

export default SelectedProfile
