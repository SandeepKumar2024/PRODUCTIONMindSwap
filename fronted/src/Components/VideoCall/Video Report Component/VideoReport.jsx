import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faFlag } from '@fortawesome/free-solid-svg-icons'
import './VideoReport.scss'
import Feedback from '../../feedback/Feedback';
import ReportAbusive from '../Report Abusive Component/ReportAbusive';
import ReportProblem from '../Report Problm Component/ReportProblem';

function VideoReport({ reportId }) {
    //for feedback popup
    const [showReportProblemPopup, setShowReportProblemPopup] = useState(false);
    const toggleFeedbackPopup = () => {
        console.log("clicked");
        setShowReportProblemPopup(!showReportProblemPopup);
    };
    const handleCloseReportProblem = () => {
        setShowReportProblemPopup(false);
    };

    // For display Report Abusive popup in this page.
    const [showReportAbusivePopup, setShowReportAbusivePopup] = useState(false);
    const toggleReportAbusivePopup = () => {
        setShowReportAbusivePopup(!showReportAbusivePopup);
    };
    const handleCloseReportAbusive = () => {
        setShowReportAbusivePopup(false);
    };
    return (
        <>
            <div id="VR-container">
                <div className='VR-box' onClick={toggleFeedbackPopup}>
                    <div className="vr-icon" >
                        <FontAwesomeIcon icon={faFlag} />
                    </div>
                    <div className='vr-text' >
                        <span> Report a problem</span>
                    </div>
                </div>

                <div className='VR-box' onClick={toggleReportAbusivePopup}>
                    <div className="vr-icon">
                        <FontAwesomeIcon icon={faCircleExclamation} />
                    </div>
                    <div className='vr-text'>
                        <span> Report abusive</span>
                    </div>
                </div>

            </div>
            {showReportProblemPopup && <ReportProblem onClose={handleCloseReportProblem} />}
            {showReportAbusivePopup && <ReportAbusive onClose={handleCloseReportAbusive} reportId={reportId} />}

        </>
    )
}

export default VideoReport