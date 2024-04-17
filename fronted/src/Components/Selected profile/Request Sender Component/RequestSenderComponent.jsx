import React, { useEffect, useState } from 'react'
import './RequestSenderComponent.css';
import socket from "../../../Pages/Socket Connection/Socket"
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
function RequestSenderComponent({ showRequestSender, toggleRequestSender }) {
    const [question, setQuestion] = useState('');
    const [file, setFile] = useState(null);
    const  sender  = useSelector((state) => state.auth.userId || null);
    const reciever = useParams().id;

    const handleSubmit = (event) => {
        event.preventDefault();

        // i/p data 
        const formData = {
            question,
            sender,
            reciever

        }
        socket.emit("send-request-db",formData )
        closeModel()
    };



    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const closeModel = () => {
        toggleRequestSender();
    };
    return (
        <>
            <div className={`doubts ${showRequestSender ? "show-doubts" : ""} `}>
                <div className="doubt-container">
                    <div className="close" onClick={closeModel}><span>&times;</span></div>
                    <div className="doubt-content">
                        <h2>Type your Question</h2>
                        <form onSubmit={handleSubmit} id="questionForm">
                            <textarea
                                id="questionText"
                                placeholder="Ex: I want to discuss the working principle of Generator....."
                                value={question}
                                onChange={(event) => setQuestion(event.target.value)}
                            ></textarea>
                            <input
                                type="file"
                                id="fileInput"
                                onChange={handleFileChange}
                            />
                            <button type="submit">Send</button>
                        </form>
                    </div>
                </div>
                <div className="doubtIndicator"></div>
            </div>
        </>
    )
}

export default RequestSenderComponent
