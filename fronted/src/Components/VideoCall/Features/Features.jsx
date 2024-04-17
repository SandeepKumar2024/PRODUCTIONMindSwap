import React, { useEffect, useState } from 'react'
import './Features.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faVideo,
    faVideoSlash,
    faMicrophone,
    faMicrophoneSlash,
    faArrowUpFromBracket,
    faEllipsisVertical,
    faPhone,
    faFaceSmile
} from "@fortawesome/free-solid-svg-icons"; //for solid SVG icons
import VideoReport from '../Video Report Component/VideoReport';
import axios from "axios"
function Features({ toggleVideo, toggleAudio, endCall, reportId, userId, startTime }) {

    const [isAudio, setIsAudio] = useState(false);
    const [isVideo, setIsVideo] = useState(false);
    const [currentTime, setCurrentTime] = useState('');
    const [showReportPopup, setShowReportPopup] = useState(false)

    const audio = () => {
        toggleAudio();
        setIsAudio(!isAudio);
    }
    const video = () => {
        toggleVideo();
        setIsVideo(!isVideo);
    }
    const toggleReportPopup = () => {
        setShowReportPopup(!showReportPopup)
    }

    //For displaying current time
    useEffect(() => {
        const intervalId = setInterval(() => {
            const date = new Date();
            const hours = date.getHours() % 12 || 12; // Convert to 12-hour format
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();
            const meridiem = date.getHours() >= 12 ? 'PM' : 'AM';

            setCurrentTime(`${hours}:${minutes}:${seconds} ${meridiem}`);
        }, 1000);

        return () => clearInterval(intervalId); // Clean up interval on component unmount
    }, []);

    //endCallTimer
    // Call endCallTimer when tab is closed
    const endCallTimerButton = async () => {
        const data = {
            userId: reportId,
            startTime: startTime
        }
        const dataHis = {
            acceptId: reportId,
            senderId: userId,
        }
        await axios.post(`/api/create/analytics`, data);
        await axios.put(`/api/history/update`, dataHis);
        window.close();
    }



    return (
        <>
            <div id="feature-container">
                <div className="time">
                    {currentTime}
                </div>
                <div className="feature-icons">
                    <div className="icon">
                        {!isVideo ? <FontAwesomeIcon icon={faVideo} onClick={video} /> :
                            <FontAwesomeIcon icon={faVideoSlash} onClick={video} />
                        }
                    </div>
                    <div className="icon">
                        {!isAudio ? <FontAwesomeIcon icon={faMicrophone} onClick={audio} /> :
                            <FontAwesomeIcon icon={faMicrophoneSlash} onClick={audio} />
                        }
                    </div>
                    <div className="icon">
                        <FontAwesomeIcon icon={faArrowUpFromBracket} />
                    </div>
                    <div className="icon">
                        <FontAwesomeIcon icon={faFaceSmile} />
                    </div>
                    <div className="icon" onClick={() => { endCall(); endCallTimerButton() }}>
                        <FontAwesomeIcon icon={faPhone} id="end" />
                    </div>
                    <div className="icon" onClick={toggleReportPopup}>
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                    </div>
                    {/* <div className="icon" onClick={endCallTimerButton}>
                        <button>End</button>
                    </div> */}
                </div>
            </div>
            {showReportPopup && <VideoReport reportId={reportId} />}
        </>
    )
}

export default Features