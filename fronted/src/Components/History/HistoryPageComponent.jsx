import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import './HistoryPageComponent.css'
function HistoryPageComponent({ historyData }) {
    console.log("Incomming data: ", historyData)
    const ID = useSelector((state) => state.auth.userId || null);
    const [allProfileItems, setAllProfileItems] = useState([]);
    const [uniqueHistoryItems, setUniqueHistoryItems] = useState([]);
    const navigate = useNavigate();

    function calculateTimeDifference(lastSeen) {
        const currentTime = new Date();
        const lastSeenTime = new Date(lastSeen);

        // Calculate the difference in milliseconds
        const timeDifference = currentTime - lastSeenTime;

        // Convert milliseconds to seconds
        const secondsDifference = Math.floor(timeDifference / 1000);

        // Calculate different time intervals
        const secondsInMinute = 60;
        const secondsInHour = secondsInMinute * 60;
        const secondsInDay = secondsInHour * 24;
        const secondsInMonth = secondsInDay * 30;
        const secondsInYear = secondsInDay * 365;

        // Check the time interval and return appropriate message
        if (secondsDifference < secondsInMinute) {
            return 'Today';
        } else if (secondsDifference < secondsInHour) {
            const minutes = Math.floor(secondsDifference / secondsInMinute);
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else if (secondsDifference < secondsInDay) {
            const hours = Math.floor(secondsDifference / secondsInHour);
            return `  ${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (secondsDifference < secondsInMonth) {
            const days = Math.floor(secondsDifference / secondsInDay);
            return `  ${days} day${days > 1 ? 's' : ''} ago`;
        } else if (secondsDifference < secondsInYear) {
            const months = Math.floor(secondsDifference / secondsInMonth);
            return ` ${months} month${months > 1 ? 's' : ''} ago`;
        } else {
            const years = Math.floor(secondsDifference / secondsInYear);
            return ` ${years} year${years > 1 ? 's' : ''} ago`;
        }
    }


    useEffect(() => {
        const fetchSenderDetails = async () => {
            try {
                // Extract all unique user IDs from senderId and acceptId fields
                const userIds = Array.from(new Set([...historyData.map(data => data.senderId), ...historyData.map(data => data.acceptId)]));
                // Filtering out currentUserID from userIds
                const filteredUserIds = userIds.filter(id => id !== ID);
                console.log("object: " + filteredUserIds);
                const userDetailsArray = [];
                // Fetch details for each other user
                const responses = await Promise.all(filteredUserIds.map(userId => axios.get(`/api/user/get/${userId}`)));
                responses.forEach((response, index) => {
                    userDetailsArray.push(response.data);
                });
                setAllProfileItems(userDetailsArray);

            } catch (error) {
                console.error('Error fetching sender details:', error.message);
            }
        };

        fetchSenderDetails();
    }, [historyData]);


    const handleNavigate = (id) => {
        navigate(`/selectedProfile/${id}`);
    }

    //For displaying total duration
    function calculateDuration(startTime, endTime) {
        const start = new Date(startTime);
        const end = new Date(endTime);
        const durationInSeconds = Math.abs(end - start) / 1000; // Get duration in seconds
        const minutes = Math.floor(durationInSeconds / 60);
        const seconds = Math.floor(durationInSeconds % 60);
        return `${pad(minutes)}:${pad(seconds)}`;
    }

    function pad(num) {
        return (num < 10 ? '0' : '') + num;
    }

    // useEffect(() => {
    //     const fetchHistory = () => {
    //         try {
    //             const response = axios.get(`history/${userId}`);
    //             console.log("response: ", response.data);

    //         } catch (error) {
    //             console.error('Error fetching sender details:', error.message);
    //         }
    //     }

    //     fetchHistory();
    // },[userId])

    const handleDeleteHistory = async (historyId) => {

        const result = await axios.delete(`/api/history/${historyId}}`);

    }


    useEffect(() => {
        // Filter history items based on the current user's ID (ID)
        const userHistory = historyData.filter(item => item.senderId === ID || item.acceptId === ID);
        setUniqueHistoryItems(userHistory);
    }, [historyData, ID]);


    return (
        <>
            <div className="historyContainer">
                <div className="pageName">
                    <h1>History</h1>
                </div>
                {uniqueHistoryItems.map((item, index) => (
                    <div className="hc-items" key={index} >
                        <div className="hc-ProfilePic">
                            {allProfileItems[index]?.profilePic ? <img src={`${allProfileItems[index]?.profilePic}`}></img> : <img src='/public/Images/profile.png'></img>}
                        </div>
                        <div className="hc-box">
                            <div className="fp-Name">
                                <span className="name">{allProfileItems[index]?.name}</span>
                            </div>
                            <div className="hc-CurrentPosition">
                                <span className="name">{allProfileItems[index]?.currentPosition} </span>
                            </div>
                            <div className="hc-CurrentInstitute">
                                <span className="name">{allProfileItems[index]?.institute}</span>
                            </div>
                        </div>
                        <div className="hc-track">
                            <div className="date">
                                <h4>{calculateTimeDifference(item?.createdAt)}</h4>
                            </div>
                            <div className="duration">
                                <h4>Duration : {calculateDuration(item?.startTime, item?.endTime)}</h4>
                            </div>


                        </div>

                        {/* {<div className="delete-icon">
                            <FontAwesomeIcon id='deleteIocn' icon={faTrash} onClick={() => handleDeleteHistory(item?._id)} />
                        </div>} */}
                    </div>
                ))}
            </div>
        </>
    )
}

export default HistoryPageComponent