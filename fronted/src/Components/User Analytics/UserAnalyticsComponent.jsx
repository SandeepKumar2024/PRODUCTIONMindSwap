import React, { useEffect, useState } from 'react'
import './UserAnalyticsComponent.scss'
import axios from 'axios'
import ProgressBar from '../Progress Bar/ProgressBar';
import TotalDataGraph from '../Graphs/TotalDataGraph';
import WeeklyGraph from '../Graphs/WeeklyGraph';
import MonthlyGraph from '../Graphs/MonthlyGraph';
import YearlyGraph from '../Graphs/YearlyGraph';
import HourlyGraph from '../Graphs/HourlyGraph';

function UserAnalyticsComponent({ data, id }) {

    const [currentTime, setCurrentTime] = useState([]);
    //count totat favourites 
    const [favouritesCount, setFavouritesCount] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`user/followers/${id}`);
            setFavouritesCount(response.data.totalFollowers);

        }
        fetchData();

    }, [id]);
    function millisecondsToTime(milliseconds) {
        return (milliseconds / 3600000).toFixed(2);
        // Check if hours is a number
    }
    console.log("Weekly data: ", data.weeklyLabels);
    return (
        <>
            <div id="UAC-container">
                <div id="UAC-heading">
                    <h1>Analytics Dashboard</h1>
                </div>
                <div id="UAC-top">
                    <div id="top-left">
                        <h2>Today's Performance</h2>
                        <div id="top-left-top">
                            <div className="today-count">
                                <h5>Number of Session</h5>
                                <h4>{data.totalSessionsToday}</h4>
                            </div>
                            <div className="today-hour">
                                <h5>Hours of Session</h5>
                                <h4>{millisecondsToTime(data.totalSessionTimeToday)} hour</h4>
                            </div>

                        </div>
                        <div id="top-left-bottom">
                            <HourlyGraph hourlyData={data} />
                        </div>
                    </div>
                    <div id="top-right">
                        <h2>Total Performance</h2>
                        <div id="top-right-top">
                            <div className="total-count">
                                <h5>Number of Session</h5>
                                <h4>{data.totalSessionsCount}</h4>
                            </div>
                            <div className="total-hour">
                                <h5>Hours of Session</h5>
                                <h4>{millisecondsToTime(data.totalSessionTime)} hour</h4>
                            </div>
                        </div>
                        <div id="top-right-bottom">

                            <TotalDataGraph totalData={data} />

                        </div >
                    </div >
                </div >

                <div id="UAC-middle">
                    <h2>Other Performance</h2>

                    <div id="middle-top">
                        <div className="week">
                            <h3>Weekly</h3>
                            <div className="week-count-box">
                                <div className="week-count">
                                    <h5>Number of Session</h5>
                                    <h4>{data.weeklySessionsData}</h4>
                                </div>
                                <div className="week-hour">
                                    <h5>Hours of Session</h5>
                                    <h4>{millisecondsToTime(data.weeklySessionTimeData)} hour</h4>
                                </div>
                            </div>
                        </div>
                        <div className="month">
                            <h3>Monthly</h3>
                            <div className="month-count-box">
                                <div className="month-count">
                                    <h5>Number of Session</h5>
                                    <h4>{data.monthlySessionsData}</h4>
                                </div>
                                <div className="month-hour">
                                    <h5>Hours of Session</h5>
                                    <h4>{millisecondsToTime(data.monthlySessionTimeData)} hour</h4>
                                </div>
                            </div>
                        </div>
                        <div className="year">
                            <h3>Yearly</h3>
                            <div className="year-count-box">
                                <div className="year-count">
                                    <h5>Number of Session</h5>
                                    <h4>{data.yearlySessionsData}</h4>
                                </div>
                                <div className="year-hour">
                                    <h5>Hours of Session</h5>
                                    <h4>{millisecondsToTime(data.yearlySessionTimeData)} hour</h4>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div id="middle-bottom">
                        <div id="weekGraph">
                            <WeeklyGraph Weeklydata={data} />
                            <h3>Weekly Graph</h3>
                        </div>
                        <div id="monthGraph">
                            <MonthlyGraph Monthlydata={data} />
                            <h3>Monthly Graph</h3>

                        </div>
                        <div id="yearGraph">
                            <YearlyGraph Yearlydata={data} />
                            <h3>Yearly Graph</h3>

                        </div>
                    </div>

                </div>

                <div id="UAC-bottom">
                    <h2>Monetization  (Any Two)</h2>
                    <div id="progress-bar">
                        <h5>Total Hours of Sessions</h5>
                        <div>
                            <ProgressBar minValue={millisecondsToTime(data.totalSessionTime)} maxValue={500} />
                            <span>500 hours</span>
                        </div>
                        <h5>Total Number of Sessions</h5>
                        <div>
                            <ProgressBar minValue={data.totalSessionsCount} maxValue={500} />
                            <span>500</span>
                        </div>
                        <h3 id='or'>or</h3>
                        <h5 id='followers'>Total Number of Followers</h5>
                        <div>
                            <ProgressBar minValue={favouritesCount} maxValue={2000} />
                            <span>2000</span>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default UserAnalyticsComponent
