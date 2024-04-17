import React, { useEffect, useState } from "react";
import "./Profile.css";
import Card from "../../Profile Card/Card";
import Feedback from "../../feedback/Feedback";
function Profile({ onlineUsers, data }) {
  //for feedback popup
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);
  const toggleFeedbackPopup = () => {
    setShowFeedbackPopup(!showFeedbackPopup);
  };
  const handleCloseFeedback = () => {
    setShowFeedbackPopup(false);
  };

  return (
    <>
      <div className="p-top">
        <h1 id="ep">Explore Profiles</h1>
        <button onClick={toggleFeedbackPopup}>Feedback</button>
      </div>
      <div id="allProfileContainer">
        {data.map((user, index) => (
          <Card user={user} onlineUsers={onlineUsers} key={index}/>
        ))}


      </div>
      {showFeedbackPopup && <Feedback className ="show-feedback-popup" onClose={handleCloseFeedback} />}


    </>
  );
}

export default Profile;
