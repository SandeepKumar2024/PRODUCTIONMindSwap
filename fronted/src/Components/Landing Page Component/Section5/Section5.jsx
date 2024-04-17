import React from 'react';
import './Section5.css'
function Section5() {
  return (
    <section id="fifth">
      <div id="fifth-box">
        <div className="all-items">
          <div className="text">
            <h1
             className="sh-5">
              Peer Networking
            </h1>
            <p className="sp-5">
              Discover a world of connections on MindSwap, where shared interests unite people. This
              platform facilitates meaningful interactions, helping you meet individuals who resonate with
              your passions. Whether you're seeking learning partners or activity buddies, MindSwap
              is your portal to a vibrant community where connections thrive.
            </p>
          </div>

          <div className="image">
            <img src="Images/4.png" alt="Image-4" />
          </div>
        </div>

        <div className="key-points">
          <p className="skp"><img src="Icons/topic/7.png" alt="" /> Mutual Benefits</p>
          <p className="skp"><img src="Icons/topic/8.png" alt="" /> Diverse Perspective</p>
          <p className="skp"><img src="Icons/topic/9.png" alt="" /> Collaboration</p>
        </div>
      </div>
    </section>
  );
}

export default Section5;
