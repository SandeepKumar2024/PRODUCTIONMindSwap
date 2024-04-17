import React, { useEffect, useRef, useState } from 'react'
import Chart from 'chart.js/auto';
Chart.defaults.backgroundColor = '#9BD0F5';
Chart.defaults.borderColor = 'blue'; 
Chart.defaults.color = '#000';


function TotalDataGraph({ totalData }) {
    const [data, setData] = useState([]);
    useEffect(() => {
        setData(totalData);

    }, [totalData])
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    useEffect(() => {

        if (!data || !data.monthlyLabels || data.monthlyLabels.length === 0) {
            return; // Exit early if data is empty or labels are empty
        }

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const myChartRef = chartRef.current.getContext("2d");
        //to convert the monthly data from object to array
        const totalSessionsData = data.monthlyLabels.map(label => {
            return data.monthlyData[label].totalSessions;
        });

        //to convert the totalSessionTime data from millisecond to hour
        const totalSessionTimeInHours = (data.totalSessionTime / (1000 * 60 * 60)).toFixed(2); // Convert milliseconds to hours
        chartInstance.current = new Chart(myChartRef, {
            type: "line",
            data: {

                labels: data.monthlyLabels,
                datasets: [
                    {
                        label: 'Number of Session',
                        data: totalSessionsData,
                        fill: false,
                        borderWidth: 5,
                        borderColor: 'lime',
                        backgroundColor: 'black',
                    },
                    {
                        label: 'Hours of Session',
                        data: Array(data.monthlyLabels.length).fill(totalSessionTimeInHours),
                        fill: false,
                        borderWidth: 5,
                        borderColor: 'red',
                        backgroundColor: 'black',
                    },
                ]
            },
            options: {
                scales: {
                    x: {
                        grid: {
                            lineWidth: 0.5 // Increase the width of the x-axis grid lines
                        }
                    },
                    y: {
                        grid: {
                            lineWidth: 0.5  // Increase the width of the y-axis grid lines
                        }
                    }
                }
            }
        })
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        }
    }, [data])
    return (
        <>

            <canvas ref={chartRef}/>
        </>
    )
}

export default TotalDataGraph
