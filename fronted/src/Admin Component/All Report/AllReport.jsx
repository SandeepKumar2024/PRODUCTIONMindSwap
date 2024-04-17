import React, { useEffect, useState } from 'react'
import './AllReport.scss'
import axios from "axios"


function AllReport() {

    const [reportProblem, setReportProblem] = useState([]);
    const [reportAbusive, setReportAbusive] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`/api/get/problem`);
            setReportProblem(res.data)

        }
        fetchData()
    }, [])

    //get user info 
    const fetchUserDetails = async (userId) => {
        try {
            const res = await axios.get(`/api/user/get/${userId}`);
            return res.data; // Assuming response contains user details
        } catch (error) {
            console.error("Error fetching user details:", error);
            return null;
        }
    };

    //fetch data on page mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/get/problem`);
                const problems = res.data;

                // Fetch user details for each problem
                const updatedProblems = await Promise.all(problems.map(async (problem) => {
                    const userDetails = await fetchUserDetails(problem.userId);
                    return {
                        ...problem,
                        name: userDetails?.name,
                        currentPosition: userDetails?.currentPosition,
                    };
                }));

                setReportProblem(updatedProblems);
            } catch (error) {
                console.error("Error fetching report problems:", error);
            }
        };
        fetchData();
    }, []);


    //fetch report abuse information from db 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/getAll/reportAbuse`);
                setReportAbusive(res.data)
            } catch (e) {
                console.error("Error fetching report problems:", e);
            }
        }

        fetchData()
    }, [])

    console.log("reportAbusive",reportAbusive)


    return (
        <>
            <div id="AR-container">
                <div id="AR-left">
                    <h3>Reported Problems</h3>
                    <div id='AR-left-box'>
                        {reportProblem.map((report, index) => (<div className="AR-problem-card" >


                            <div className="AR-img">
                                <img src="/public/Images/profile.png" alt="" />

                            </div>
                            <div className="AR-name">
                                <h2>{report?.name}</h2>
                                {/* <h2>{feedback?.name}</h2> */}
                            </div>
                            <div className="AR-currentPosition">
                                <h3>{report?.currentPosition}</h3>
                                {/* <h3>{feedback?.currentPosition}</h3> */}
                            </div>
                            <div className="AR-headline">
                                {/* <p>{feedback?.message}</p> */}
                                <p>{report?.message}</p>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
                <div id="AR-right">
                    <h3>Reported Abusive</h3>
                    <div id="AR-right-box">
                       {reportAbusive.map((abuse,id)=>( <div id="AR-abuse-card">
                            <div className="first">
                                <h5>FROM: </h5>
                                <span>{abuse?.userId}</span>
                            </div>
                            <div className="second">
                                <h5>TO: </h5>
                                <span>{abuse?.reportId}</span>
                            </div>
                            <div className="third">
                                <h5>TYPE: </h5>
                                <span>{abuse?.type}</span>
                            </div>
                            <div className="fourth">
                                <h5>MESSAGE: </h5>
                                <span id='message'>
                                    {abuse?.message}
                                </span>
                            </div>
                        </div>))}

                    </div>

                </div>
            </div>

        </>
    )
}

export default AllReport
