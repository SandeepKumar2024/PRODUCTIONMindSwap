import React, { useEffect, useState } from 'react';
import './SidePanel.scss';
import NotificationSender from '../Notification Sender/NotificationSender';
import AllFeedback from '../Feedback/AllFeedback';
import MindSwapAnalytics from '../MindSwap Analytics/MindSwapAnalytics';
import AllReport from '../All Report/AllReport';
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { logout } from '../../Reducer/authSlice'



function SidePanel() {
    const [activeField, setActiveField] = useState('analytics'); // Default active field is 'home'
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isSuccess = useSelector((state) => state.auth.isSuccess);
    const handleFieldClick = (field) => {
        setActiveField(field);
    };

    const renderComponent = () => {
        switch (activeField) {
            case 'feedback':
                return <AllFeedback />;
            case 'notifications':
                return <NotificationSender />;
            case 'reports':
                return <AllReport />;
            case 'analytics':
                return <MindSwapAnalytics />;
            default:
                return null;
        }
    };

    //logout function
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    }
    useEffect(() => {
        if (isSuccess) {
            navigate("/");
        }
    }, [isSuccess, navigate])

    return (
        <div id="adminDashboard">
            <div id="dashboard-left">
                <div id="AdminPanelLogo">
                    <h1>MindSwap</h1>
                </div>
                <div id="SP-container">
                    <div id="adminProfile">
                        <img src="/Images/profile.png" alt="" />
                    </div>
                    <div>
                        <div id="home" className={activeField === 'home' ? 'active' : ''} onClick={() => handleFieldClick('home')}>
                            <Link to="/main" style={{ textDecoration: "inherit", color: "inherit" }}><p>Home</p></Link>
                        </div>
                        <div id="analytics" className={activeField === 'analytics' ? 'active' : ''} onClick={() => handleFieldClick('analytics')}>
                            <p>Analytics</p>
                        </div>
                        <div id="feedback" className={activeField === 'feedback' ? 'active' : ''} onClick={() => handleFieldClick('feedback')}>
                            <p>Feedbacks</p>
                        </div>
                        <div id="notifications" className={activeField === 'notifications' ? 'active' : ''} onClick={() => handleFieldClick('notifications')}>
                            <p>Notifications</p>
                        </div>
                        <div id="reports" className={activeField === 'reports' ? 'active' : ''} onClick={() => handleFieldClick('reports')}>
                            <p>Reports</p>
                        </div>
                        <div id="logout" onClick={handleLogout}>
                            <p>Logout</p>
                        </div>
                    </div>
                </div>
            </div>
            <div id="dashboard-right">
                {renderComponent()}
            </div>
        </div>
    );
}

export default SidePanel;
