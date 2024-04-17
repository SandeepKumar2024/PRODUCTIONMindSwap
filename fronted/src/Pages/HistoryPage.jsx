import React, { useEffect, useState } from 'react'
import Footer from '../Components/Footer/Footer'
import HistoryPageComponent from '../Components/History/HistoryPageComponent'
import Navbar from '../Components/Navbar/Navbar'
import { useSelector } from "react-redux"
import axios from "axios"
import socket from './Socket Connection/Socket'

function HistoryPage() {
    const userId = useSelector((state => state.auth.userId) || null);
    useEffect(() => {
      socket.emit("new-user-add", userId);
    }, [userId]);
    const [historyData, setHistoryData] = useState([])

    useEffect(() => {

        const fetchData = async () => {
            const res = await axios.get(`/api/history/${userId}`);

            setHistoryData(res.data)
        }
        fetchData();

    }, [historyData])

    console.log("history data", historyData);


    return (
        <>
            <Navbar />
            <HistoryPageComponent historyData={historyData} />
            <Footer />
        </>
    )
}

export default HistoryPage