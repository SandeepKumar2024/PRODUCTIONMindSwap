import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../../Reducer/authSlice";
import LoadingComponent from "../Loading/LoadingComponent";
import { toast } from 'react-toastify';
import mindswap from '/mindswapIcons/inversefavicon.svg'

function Login({
  onClose,
  className,
  toggleSignupPopup,
  toggleForgotPasswordPopup,
}) {
  const closeLoginModel = () => {
    onClose(); // Call onClose function passed from parent to close the popup
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoad, setIsLoad] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //submit the form

  const user = useSelector((state) => state.auth.user);
  const userName = user?.name || "";
  const isSuccess = useSelector((state) => state.auth.isSuccess);
  const isError = useSelector((state) => state.auth.isError);
  const message = useSelector((state) => state.auth.message);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  useEffect(() => {
    if (isSuccess) {

      setIsLoad(true);
      document.body.style.overflow = "hidden"; // Disable page scrolling

      setTimeout(() => {
        setIsLoad(false);
        document.body.style.overflow = "auto"; // Enable page scrolling
        navigate("/main");

      }, 2000);
    }
    else if (isError && message.trim() !== "") {
      toast.error(message);
    }

    dispatch(reset());
  }, [isSuccess, isError, message, navigate]);

  const handleCWG = async () => {
    window.open(`/api/auth/google`, "_self");
  }

  return (
    <>
      {isLoad ? (
        <LoadingComponent />
      ) : (
        <>
          <div className="overlay" onClick={closeLoginModel}></div>
          <div className={`popup ${className}`}>
            <div className="salutation">
              <div className="info-1">
                <p>
                  Join us today and have an impact on your journey of knowledge
                  and discovery with MindSwap
                </p>
              </div>
              <div className="info-2">
                <p>
                  " I've tried various online education sites, but MindSwap
                  stands out from the rest!. The people are top-notch on this
                  platform, and the user-friendly interface makes learning a
                  breeze."
                </p>
              </div>
              <div className="stars">
                <ul>
                  {[...Array(5)].map((_, index) => (
                    <li key={index}>
                      <img src="Icons/star-symbol-icon.png" alt="" />
                    </li>
                  ))}
                </ul>
              </div>
              <img src="Images/login.png" alt="" className="picture" />
            </div>

            <div className="form">
              <div className="close-btn" onClick={closeLoginModel}>
                &times;
              </div>

              <div className="login-logo">
                <img src={mindswap} alt="" />
              </div>

              <h1>Hello Again!</h1>

              <p>
                Simply log into your account below and unlock a world of
                knowledge and growth
              </p>

              <form id="loginForm" onSubmit={handleSubmit}>
                <div className="form-element">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    autoComplete="email"
                    onChange={handleChangeEmail}
                    required
                  />
                </div>

                <div className="form-element">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Password"
                    autoComplete="password"
                    onChange={handleChangePassword}
                  />
                  <div id="password-visible" onClick={togglePasswordVisibility}>
                    <img
                      src={showPassword ? "Icons/visibility_off.png" : "Icons/visibility.png"}
                      alt={showPassword ? "Hide" : "Show"}
                      id="login-eyeIcon"
                    />
                  </div>
                </div>

                <div className="memory">
                  <div className="forgot">
                    <p
                      onClick={() => {
                        toggleForgotPasswordPopup();
                        closeLoginModel();
                      }}
                    >
                      Forgot Password?
                    </p>
                  </div>
                </div>

                <div className="form-element">
                  <button type="submit" id="login-btn">
                    Log in
                  </button>
                </div>
              </form>

              <div className="form-element">

                <button className="continue-with-google" onClick={handleCWG} >
                  <img src="Icons/google-color-icon.png" alt="G" />
                  <span>Continue with Google</span>
                </button>

              </div>

              <div className="form-element" id="create-account-in-popup">
                <p>
                  Don't have an account yet?{" "}
                  <span
                    onClick={() => {
                      closeLoginModel();
                      toggleSignupPopup();
                    }}
                  >
                    Sign-up
                  </span>
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Login;
