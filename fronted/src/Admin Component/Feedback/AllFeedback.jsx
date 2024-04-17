import React, { useEffect, useState } from 'react'
import './AllFeedback.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCircleCheck, faTrashCan } from "@fortawesome/free-solid-svg-icons"; //for solid SVG icons
import axios from "axios"
function AllFeedback() {
    const [isSelected, setIsSelected] = useState(false);
    const [allFeedback, setAllFeedback] = useState([])

    const handleClick = () => {
        setIsSelected(!isSelected);
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`/api/get/feedback`);
            setAllFeedback(response.data);
        }
        fetchData();


    }, [])

    const handleFeedBackUpdate = async (feedbackId) => {
        try {
            await axios.put(`/api/update/feedback/${feedbackId}`);

            // Update the isSelected state for the clicked feedback
            setAllFeedback(prevFeedbacks =>
                prevFeedbacks.map(feedback => {
                    if (feedback._id === feedbackId) {
                        return {
                            ...feedback,
                            isDisplay: !feedback.isDisplay
                        };
                    }
                    return feedback;
                })
            );
        } catch (error) {
            console.error("Error updating feedback:", error);
        }
    }

    const handleFeedBackDelete = (feedbackId) => {
        try {
            axios.delete(`/api/delete/feedback/${feedbackId}`);
        } catch (error) {
            console.error("Error deleting feedback:", error);
        }
    }


    return (
        <><div id="AF-container">
            {allFeedback.map((feedback, id) => (<div className="AF-card" >

                <div className="selectedDiv">
                    {feedback?.isDisplay ? (
                        <FontAwesomeIcon
                            icon={faCircleCheck}
                            id='selected'
                            onClick={() => handleFeedBackUpdate(feedback?._id)}
                        />
                    ) : (
                        <FontAwesomeIcon
                            icon={faCircle}
                            onClick={() => handleFeedBackUpdate(feedback?._id)}
                        />
                    )}

                    <FontAwesomeIcon icon={faTrashCan} style={{ color: "red" }} onClick={() => handleFeedBackDelete(feedback?._id)} />
                </div>
                <div className="AF-img">
                    {feedback?.profilePic ? <img src={`${feedback?.profilePic}`} alt="" /> : <img src="/public/Images/profile.png" alt="" />}

                </div>
                <div className="AF-name">
                    <h2>{feedback?.name}</h2>
                </div>
                <div className="AF-currentPosition">
                    <h3>{feedback?.currentPosition}</h3>
                </div>
                <div className="AF-headline">
                    <p>{feedback?.message}</p>
                </div>
            </div>))}
        </div>
        </>
    )
}

export default AllFeedback
