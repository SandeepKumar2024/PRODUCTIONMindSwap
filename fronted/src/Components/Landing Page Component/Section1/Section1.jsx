import React, {useState} from 'react'
import './Section1.css'
import Image from '/Images/1.png';
import Login from '../../Login/Login';
import Signup from '../../Signup/Signup';
import ForgotPassword from '../../ForgotPassword/ForgotPassword';
import MindSwapLogo_White from '/mindswapIcons/whiteLogo.svg'

function Section1() {
  //for Login popup
  const [showLoginPopup, setShowLoginPopup] = useState(false);  
  const toggleLoginPopup = () => {
    setShowLoginPopup(!showLoginPopup);
  };
  const handleCloseLogin = () => {
    setShowLoginPopup(false);
  };
  
  //For Signup Popup
  const [showSignupPopup, setshowSignupPopup] = useState(false); 
  const toggleSignupPopup = () => {
    setshowSignupPopup(!showSignupPopup);
  };
  
  const handleCloseSignup = () => {
    setshowSignupPopup(false);
  };

 //For Forgot password Popup
 const [showForgotPasswordPopup, setShowForgotPasswordPopup] = useState(false); 
 const toggleForgotPasswordPopup = () => {
   setShowForgotPasswordPopup(!showForgotPasswordPopup);
 };
 
 const handleCloseForgotPassword = () => {
   setShowForgotPasswordPopup(false);
 };

  return (
    <section id="first">
      <div id="logo">
        <img src={MindSwapLogo_White} alt="" />
      </div>
      <div id="first-box">
        <div className="first-item">
          <div className="text">
            <h1 className="sh-1">
              Welcome to the <span>MindSwap</span> - Your Peer Live Learning & Discussing Hub!
            </h1>
            <p className="sp-1">
              At MindSwap, we're dedicated to providing users with a seamless and engaging
              platform for asking doubts, discussing, and networking through live video calls.
            </p>
            <div className="buttons">
              <button className="login" onClick={toggleLoginPopup}>Login</button>
              <button className="join" onClick={toggleSignupPopup}>Join</button>
            </div>
          </div>
          <div className="first-image">
            <img src={Image} alt="Image-1" />
          </div>
        </div>
      </div>
      {showLoginPopup && <Login  className ="show-popup" onClose={handleCloseLogin} toggleSignupPopup = {toggleSignupPopup} toggleForgotPasswordPopup = {toggleForgotPasswordPopup}/>}
      {showSignupPopup && <Signup  className ="show-signup-container" onClose={handleCloseSignup} toggleLoginPopup= {toggleLoginPopup}/>}
     
      {showForgotPasswordPopup && <ForgotPassword onClose={handleCloseForgotPassword}/>}

    </section>
  );
}

export default Section1;
