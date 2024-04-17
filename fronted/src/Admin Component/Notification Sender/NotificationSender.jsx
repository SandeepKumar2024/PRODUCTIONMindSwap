import React, { useEffect, useState } from 'react';
import './NotificationSender.scss';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from "react-toastify"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCircleCheck, faTrashCan } from "@fortawesome/free-solid-svg-icons"; //for solid SVG icons


function NotificationSender() {
    const userId = useSelector((state) => state.auth.userId || null);
    const type = "all";
    const [message, setMessage] = useState(""); // State to hold the message
    const [searchQuery, setSearchQuery] = useState(null)
    console.log("serachQuery: " + JSON.stringify(searchQuery))
    const [data, setData] = useState([]); // State to hold the data
    console.log("data: " + data)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`notification`, {
                sender: userId,
                type: type,
                message: message
            });

            // Clear the textarea after sending the notification
            setMessage("");
            toast.success("Notification sent successfully")

        } catch (error) {
            console.error("Error sending notification:", error);
        }
    }

    const handleChange = (e) => {
        setMessage(e.target.value);

    }




    const handleDelete = async (id) => {

        try {
            await axios.delete(`/api/user/delete/byAdmin/${id}`);
            toast.success("Notification deleted successfully")
        } catch (e) {
            console.error("Error deleting notification:", e);
        }
    }

    //fetch all users 
    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const res = await axios.get(`/api/user/all`);
                console.log("all data received", res.data);
                setData(res.data.users);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchAllUsers();
    }, []);

    //serach user using thier id  
    const handleSearch = async (e) => {
        e.preventDefault();
        const userId = searchQuery;
        try {


            if (!userId) {
                const res = await axios.get(`/api/user/all`);
                setData(res.data);
            } else {
                const res = await axios.get(`/api/user/get/${userId}`);
                setData([res.data]); // Wrap the user data in an array
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div id="NS-container">
            <div id="NS-left">
                <form onSubmit={handleSubmit}>
                    <textarea
                        name="msg"
                        id="msg"
                        cols="30"
                        rows="10"
                        placeholder='Enter the message here...'
                        value={message}
                        onChange={handleChange} // Handle changes to the textarea
                    ></textarea>
                    <button type='submit'>Send</button>
                </form>
            </div>
            <div id="NS-right">
                <h1>Find User</h1>

                <form action="">
                    <input type="text" name='query' placeholder='Search user ...' value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} />
                    <button type='submit' onClick={handleSearch}>
                        Search
                    </button>
                </form>
                <div className="users">
                    {data.length > 0 ? (
                        data.map((user) => (
                            <div className="user" key={user._id}>
                                <div className="info">
                                    {user?.profilePic ? (
                                        <img src={`${user?.profilePic}`} alt="" />
                                    ) : (
                                        <img src="/Images/profile.png" alt="Profile" />
                                    )}
                                    <h3>{user?.name}</h3>
                                </div>
                                <div className="delete">
                                    <FontAwesomeIcon
                                        icon={faTrashCan}
                                        style={{ color: 'red' }}
                                        onClick={() => handleDelete(user?._id)}
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No users found!</p>
                    )}

                </div>
            </div>

        </div>

    );
}

export default NotificationSender;
