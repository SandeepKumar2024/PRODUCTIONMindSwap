import React, { useEffect, useRef, useState } from 'react'
import Chart from 'chart.js/auto';
Chart.defaults.backgroundColor = '#9BD0F5';
Chart.defaults.borderColor = 'blue';
Chart.defaults.color = '#000';

function HourlyGraph({ hourlyData }) {

    const [data, setData] = useState([]);
    useEffect(() => {
        setData(hourlyData);

    }, [hourlyData])

    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    useEffect(() => {
        if (!data.hourlySessionCounts || !data.hourlySessionCounts.length) return;

        const labels = Array.from({ length: 24 }, (_, i) => i.toString());
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }
        const myChartRef = chartRef.current.getContext("2d");
        const totalSessionTimeInHours = (data.hourlySessionTime / (1000 * 60 * 60)).toFixed(2); // Convert milliseconds to hours
        console.log("HourlyGraph", totalSessionTimeInHours)
        chartInstance.current = new Chart(myChartRef, {
            type: "line",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Number of Session',
                        data: data.hourlySessionCounts,
                        fill: false,
                        borderWidth: 3,
                        borderColor: 'lime',
                        backgroundColor: 'black',
                    },
                    {
                        label: 'Hours of Session',
                        data: data.hourlySessionTime.map(
                            (sessionTime) => (sessionTime / (1000 * 60 * 60)).toFixed(2)
                        ),
                        fill: false,
                        borderWidth: 3,
                        borderColor: 'red',
                        backgroundColor: 'black',
                    }

                ]
            },
            options: {
                scales: {
                    x: {
                        grid: {
                            lineWidth: 0 // Increase the width of the x-axis grid lines
                        }
                    },
                    y: {
                        grid: {
                            lineWidth: 0.5          // Increase the width of the y-axis grid lines
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
            <canvas ref={chartRef} />
        </>
    )
}

export default HourlyGraph
