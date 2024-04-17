import React, { useState } from "react";
import "./Signup.css";
import axios, { Axios } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import mindswap from '/mindswapIcons/inversefavicon.svg'
function Signup({ onClose, className, toggleLoginPopup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // State to manage visibility of passwords
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [declaration, setDeclaration] = useState(false);
  const navigate = useNavigate();

  // Event handler for closing the modal
  const closeSignupModel = () => {
    onClose();
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleDeclartion = (e) => {
    setDeclaration(!declaration);
  };
  // Event handler for toggling password visibility
  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  }
  // Event handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = {
      email,
      password,
      confirmPassword,
      declaration,


    };

    try {
      const res = await axios.post(`/api/auth/signup`, userData);
      console.log("res.data: ", res.data)
      if (res.data) {
        localStorage.setItem("userId", JSON.stringify(res.data?._id));
        navigate("/main");
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };


  const handleCWG = async () => {

    window.open(`/api/auth/google`, "_self");

  }
  return (
    <>
      <div className="overlay" onClick={closeSignupModel}></div>
      <div className={`signup-container ${className}`}>
        <div className="close-btn" onClick={closeSignupModel}>
          &times;
        </div>
        <div className="signup-logo">
          <img src={mindswap} alt="" />
        </div>
        <h2>Join MindSwap</h2>
        <p>
          Simply create your account below and unlock a world of knowledge and
          growth
        </p>
        <form id="signup-form" onSubmit={handleSubmit}>
          <input
            type="email"
            id="signup-email"
            placeholder="Email"
            required
            autoComplete="username"
            name="email"
            onChange={handleEmailChange}
          />
          <input
            type={showNewPassword ? "text" : "password"}
            id="new-password"
            placeholder="Create Password"
            required
            autoComplete="new-password"
            name="password"
            onChange={handlePasswordChange}
          />
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirm-password"
            placeholder="Confirm Password"
            required
            autoComplete="new-password"
            name="confirmPassword"
            onChange={handleConfirmPasswordChange}
          />
          <div
            id="signup-new-password-visible"
            onClick={toggleNewPasswordVisibility}
          >
            <img
              src={showNewPassword ? "Icons/visibility_off.png" : "Icons/visibility.png"}
              alt={showNewPassword ? "Hide" : "Show"}
              id="new-password-eyeIcon"
            />
          </div>
          <div
            id="signup-confirm-password-visible"
            onClick={toggleConfirmPasswordVisibility}
          >
            <img
              src={showConfirmPassword ? "Icons/visibility_off.png" : "Icons/visibility.png"}
              alt={showConfirmPassword ? "Hide" : "Show"}
              id="confirm-password-eyeIcon"
            />
          </div>

          <div id="declaration">
            <input type="checkbox" id="declaration-checkbox" required onChange={handleDeclartion} />I have
            read and accept to the <a href="/terms-of-use">Terms of Use</a> and{" "}
            <a href="/privacy-policy">Privacy Policy</a>
          </div>

          <button type="submit" className="signup-button" >
            Sign Up
          </button>
        </form>

        {/* //Google Auth2.0 */}
        <div className="cwg">
          <button className="continue-with-google" onClick={handleCWG}>
            <img src="Icons/google-color-icon.png" alt="G" />
            <span>Continue with Google</span>
          </button>
        </div>

        {/* For closing and at the same time opening the login popup  */}
        <div className="login">
          <p>
            Already have an account.{" "}
            <span
              onClick={() => {
                closeSignupModel();
                toggleLoginPopup();
              }}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
