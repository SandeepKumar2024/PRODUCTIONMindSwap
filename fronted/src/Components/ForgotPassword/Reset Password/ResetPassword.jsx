import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./ResetPassword.css";
function ResetPassword() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const { token } = useParams();
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);

  };
  const handleComformPasswordChange = (e) => {
    setconfirmPassword(e.target.value);

  };
  const handleSubmit = async (e) => {

    e.preventDefault();
    const userData = {
      password,
      confirmPassword
    }

    try {

      const res = await axios.post(`/api/auth/reset/${token}`, userData);
      setMessage(res.data);

    } catch (error) {
      console.log(error);

    }




  };
  return (
    <>
      <div id="rp">
        <div className="logo">MindSwap</div>
        <div id="formContainer">
          <form action="" id="form" onSubmit={handleSubmit}>
            <label htmlFor="new-password">New Password</label>
            <input type="password" id="new-password" onChange={handlePasswordChange} />

            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="text" id="confirm-password" onChange={handleComformPasswordChange} />
            {message && <p>{message}</p>}

            <button type="submit">Reset Password</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
