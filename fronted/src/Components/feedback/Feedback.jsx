import React, { useState } from 'react'
import "./feedback.scss"
import { useSelector } from "react-redux";
import { toast } from "react-toastify"
import axios from "axios";

const Feedback = ({ onClose }) => {
  const userId = useSelector((state) => state.auth.userId || null);
  ;

  const [message, setMessage] = useState("");
  const handleChange = (e) => {
    e.preventDefault();
    setMessage(e.target.value)
  }


  const closeFeedback = () => {
    onClose(); // Call onClose function passed from parent to close the popup
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      message
    }

    try {
      const res = await axios.post(`/api/create/feedback/${userId}`, userData);
      toast.success(res.data)
      closeFeedback();
    } catch (error) {
      console.log(error);
    }
  }
  return (

    <>
      <div className="overlay" onClick={closeFeedback}></div>
      <div className="feedback">
        <div id="close-feedback" onClick={closeFeedback}>
          <h4>&times;</h4>

        </div>
        <h1>Your Feedback is Important for us </h1>
        <form action="" onSubmit={handleSubmit} >
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="10"
            placeholder="Write your feedback here...."
            onChange={handleChange}
          ></textarea>
          <button type="submit">Submit</button>
        </form>

      </div>
    </>
  )
}

export default Feedback
