import React from 'react';
import './Section4.css'
function Section4() {
  return (
    <section id="fourth">
      <div id="fourth-box">
        <div className="all-items">
        <div className="image">
            <img src="Images/3.png" alt="Image-3" />
          </div>
          
          <div className="text">
            <h1 className="sh-4">
              Start Learning with MindSwap
            </h1>
            <p className="sp-4">
              Welcome to the "Learn with MindSwap"! Elevate your learning through live interactions.
              Engage in meaningful discussions, clarify doubts, and gain fresh perspectives from real
              human interactions. Unlock a world of collaborative learning where your questions find
              answers through dynamic conversations. Join us and expand your knowledge with the power of
              genuine human connection.
            </p>
          </div>
        </div>

        <div className="key-points">
          <p className="skp"><img src="Icons/topic/4.png" alt="" /> Peer Learning</p>
          <p className="skp"><img src="Icons/topic/5.png" alt="" /> Real-Time Feedback</p>
          <p className="skp"><img src="Icons/topic/6.png" alt="" /> Building Community</p>
        </div>
      </div>
    </section>
  );
}

export default Section4;
