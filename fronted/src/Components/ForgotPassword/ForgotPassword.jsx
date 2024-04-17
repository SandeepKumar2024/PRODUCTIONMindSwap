import React, { useState } from "react";
import "./ForgotPassword.css";
import axios from "axios"
function ForgotPassword({ onClose }) {
  const closeForgotPasswordPopup = () => {
    onClose();
  };


  const [email, setEmail] = useState("");
  const [messageForgot, setMessageForgot] = useState("");

  const handleresetEmail = (e)=>{
    setEmail(e.target.value)
  }

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email
    }
    try {
      const res = await axios.post("/api/auth/forgot", userData);
      setMessageForgot(res.data)

    } catch (error) {
      console.log(error);


    }

  }
  return (
    <>
      <div className="overlay" onClick={closeForgotPasswordPopup}></div>
      <div id="forgotPassword">
        <div id="forgotForm">
          <div id="closeBtn" onClick={closeForgotPasswordPopup}>&times;
          </div>
          <h1>Forgot Password?</h1>
          <form onSubmit={handleForgotSubmit}>
            <input
              type="email"
              placeholder="Email"
              id="forgotEmail"
              required
              name="email"
              onChange={handleresetEmail}
            />
            {messageForgot && <p>{messageForgot}</p>}
            <button type="submit">Reset Password</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
