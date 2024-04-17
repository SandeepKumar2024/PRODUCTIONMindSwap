import React from 'react'
import './Waiting.scss'
function Waiting() {
    return (
        <>
            <div className="waiting-text">
                Waiting for Reciever to join the call {' '}
                <span className="animation">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                </span>
            </div>
        </>
    )
}

export default Waiting
