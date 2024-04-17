import React from 'react'
import './ProgressBar.scss'
import './ProgressBar.scss'
function ProgressBar({ minValue, maxValue }) {
    const progress = (minValue / maxValue) * 100;
    return (
        <>
            <div id='PB-back'>
                <p style={{ color: progress > 49 ? "white" : "black" }}>{minValue}</p>
                {progress == 0 ? '' : <div style={{ width: `${progress}%` }} id='progress-handle' />}
            </div>
        </>
    )
}

export default ProgressBar

