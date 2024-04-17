import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import UserAnalyticsComponent from '../Components/User Analytics/UserAnalyticsComponent'
import axios from "axios"
import { useSelector } from "react-redux"
import socket from './Socket Connection/Socket';


function AnalyticsPage() {
    const userId = useSelector((state) => state.auth.userId || null);
    useEffect(() => {
        socket.emit("new-user-add", userId);
    }, [userId]);
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`/api/analytics/${userId}`)
            if (res.data) {
                console.log("response", res.data)

                setData(res.data)
            }

        }
        fetchData();

    }, [])



    return (
        <>
            <Navbar />
            <UserAnalyticsComponent data={data} id={userId} />
            <Footer />
        </>
    )
}

export default AnalyticsPage
