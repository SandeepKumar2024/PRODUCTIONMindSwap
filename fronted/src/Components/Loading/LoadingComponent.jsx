import React, { useEffect } from "react";
import "./LoadingComponent.scss";
import logoImage from '/mindswapIcons/inversefavicon.svg'
import { useLocation, useNavigate } from "react-router-dom"

function LoadingComponent() {
  const navigate = useNavigate();
  //Taking id from URL when user Login through Continune with google
  const location = useLocation();
  document.body.style.overflow = "hidden";
  const idcwg = new URLSearchParams(location.search).get('cwg');

  useEffect(() => {
    if (idcwg) {
      localStorage.setItem("userId", JSON.stringify(idcwg));
    }

    // Delay navigation to "/main" by 3 seconds
    const timeout = setTimeout(() => {
      navigate("/main");
    }, 2000);

    // Clear the timeout to prevent navigation if component unmounts before 3 seconds
    return () => clearTimeout(timeout);
  }, [idcwg, navigate]);
  return (
    <>
      <div className="loading">
        <div className="loadingContainer">
          <div className="wait-animation"></div>
          <img src={logoImage} alt="" className="logo-image" />
        </div>
      </div>
    </>
  );
}

export default LoadingComponent;
