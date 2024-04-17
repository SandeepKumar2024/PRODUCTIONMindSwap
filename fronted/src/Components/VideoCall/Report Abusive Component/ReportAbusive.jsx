import React, { useState } from 'react'
import './ReportAbusive.scss'
import { useSelector } from "react-redux"
import axios from 'axios';
import { toast } from "react-toastify"

function ReportAbusive({ onClose, reportId }) {
    const handleCloseReportAbusivePopup = () => {
        onClose();
    }
    const userId = useSelector((state) => state.auth.userId) || null;
    console.log("reportId: " + reportId);
    const [option, setOption] = useState("")
    const [text, setText] = useState("")

    const handleOptionChange = (e) => {
        setOption(e.target.value)
    }
    const handleChangeTextArea = (e) => {
        setText(e.target.value)
    }

    const handleReportSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            reportId: reportId,
            message: text,
            type: option,
            userId: userId,

        }

        try {
            const res = await axios.post(`/api/create/report`, formData);
            toast.success(res.data);
            handleCloseReportAbusivePopup();
        } catch (error) {
            toast.error(error)

        }

    }
    return (
        <>
            <div className="overlay" onClick={handleCloseReportAbusivePopup}></div>
            <div id="RA-conatiner">
                <h2>Report Abusive</h2>
                <form onSubmit={handleReportSubmit}>
                    <select
                        id="AbuseType"
                        name="AbuseType"
                        // value={AbuseType}
                        onChange={handleOptionChange}
                    >
                        <option value="" disabled selected>
                            Abuse type
                        </option>
                        <option value="Spam">Spam</option>
                        <option value="Fraud, phishing and other deceptive practices">Fraud, phishing and other deceptive practices</option>
                        <option value="Malware (distributed via link in the MindSwap Video chat window)">Malware (distributed via link in the MindSwap Video chat window)</option>
                        <option value="Harassment and hateful content">Harassment and hateful content</option
                        >
                        <option value="Unwanted sexual content">Unwanted sexual content</option>
                        <option value="Violence and gore">Violence and gore</option>
                        <option value="Child endangerment">Child endangerment</option>
                        <option value="Others">Others</option>
                    </select>
                    <textarea name="mesage" id="message" cols="30" rows="10"
                        placeholder='Describe your isue' onChange={handleChangeTextArea}></textarea>
                    <div id="buttons">
                        <button type='submit'>Report</button>
                        <button onClick={handleCloseReportAbusivePopup}>Cancel</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ReportAbusive