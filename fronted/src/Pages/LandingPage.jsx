import React, { useEffect, useState } from 'react'
import Section1 from '../Components/Landing Page Component/Section1/Section1'
import Section2 from '../Components/Landing Page Component/Section2/Section2'
import Section3 from '../Components/Landing Page Component/Section3/Section3'
import Section4 from '../Components/Landing Page Component/Section4/Section4'
import Section5 from '../Components/Landing Page Component/Section5/Section5'
import Footer from '../Components/Footer/Footer'
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import LoadingComponent from '../Components/Loading/LoadingComponent'


function LandingPage() {
  const navigate = useNavigate();
  //Taking id from localStroage when user Login manually bt email/password
  const id = useSelector((state) => state.auth.userId || null)
  const [isLoad, setIsLoad] = useState(false)
  useEffect(() => {
    if (id) {
      setIsLoad(true);
      document.body.style.overflow = "hidden"; // Disable page scrolling
      setTimeout(() => {
      setIsLoad(false);
        document.body.style.overflow = "auto"; // Enable page scrolling
        navigate("/main");

      }, 1000);
    }
  }, [id])
  return (
    <>
      {isLoad ? <LoadingComponent /> : null}
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Footer />
    </>
  )
}

export default LandingPage

