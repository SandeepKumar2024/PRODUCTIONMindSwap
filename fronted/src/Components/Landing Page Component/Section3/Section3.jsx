import React from "react";
import "./Section3.css";
function Section3() {
  return (
    <section id="third">
      <div id="third-box">
        <div className="all-items">
          <div className="text">
            <h1 className="sh-3">Live Discussion</h1>
            <p className="sp-3">
              Engage in dynamic live discussions on our platform! Connect with
              enthusiasts worldwide. Share insights, ask questions, and dive
              into real-time conversations on diverse topics. Experience the
              thrill of interactive learning and networking from the comfort of
              your device. Join us; together, we're shaping perspectives,
              fostering knowledge, and building connections!
            </p>
          </div>

          <div className="image">
            <img src="Images/2.png" alt="Image-2" />
          </div>
        </div>
        <div className="key-points">
          <p className="skp">
            <img src="Icons/topic/1.png" alt="" /> Discuss Live
          </p>
          <p className="skp">
            <img src="Icons/topic/2.png" alt="" /> Interactive learning
          </p>
          <p className="skp">
            <img src="Icons/topic/3.png" alt="" /> Variety of Subjects
          </p>
        </div>
      </div>
    </section>
  );
}

export default Section3;
