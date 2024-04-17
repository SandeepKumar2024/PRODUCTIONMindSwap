import React, { useState } from 'react'
import './ReportProblem.scss'
import { useSelector } from "react-redux";
import { toast } from "react-toastify"
import axios from "axios";
function ReportProblem({ onClose }) {
    const { user } = useSelector((state) => state.auth.user || {});
    const userId = user ? user._id : null;

    const [message, setMessage] = useState("");
    const handleChange = (e) => {
        e.preventDefault();
        setMessage(e.target.value)
    }


    const closeReportProblem = () => {
        onClose(); // Call onClose function passed from parent to close the popup
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            message: message
        }

        try {
            const res = await axios.post(`/api/create/problem/${userId}`, userData);
            toast.success(res.data)
            closeReportProblem();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="overlay" onClick={closeReportProblem}></div>
            <div className="reportProblem">
                <div id="close-reportProblem" onClick={closeReportProblem}>
                    <h4>&times;</h4>

                </div>
                <h1>Report a Problem</h1>
                <form action="" onSubmit={handleSubmit} >
                    <textarea
                        name="message"
                        id="message"
                        cols="30"
                        rows="10"
                        placeholder="Write your Problem here...."
                        onChange={handleChange}
                    ></textarea>
                    <button type="submit">Submit</button>
                </form>

            </div>
        </>
    )
}

export default ReportProblem