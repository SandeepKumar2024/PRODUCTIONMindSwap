import React, { useEffect, useRef, useState } from "react";
import "./Section2.css";
import axios from "axios"
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import './styles.css';
// import required modules
import { Autoplay } from 'swiper/modules';

function Section2() {
  const [testimonials, setTestimonials] = useState([]);
  const [totalUsers, setTotalUsers] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/get/feedback/admin`);
      setTestimonials(res.data);

    }
    fetchData();
  }, [testimonials])
  //For autoPlay Card
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/user/all`);
      setTotalUsers(res.data.totalUsers);
    }
    fetchData();
  }, [totalUsers])



  return (
    <>
      <section id="second">
        <div id="second-box">
          <h1>Reviews From Our User</h1>
          <p id="users">{totalUsers}+ people have already joined MindSwap</p>
          <div className="carousel">
            <Swiper
              slidesPerView={4}
              spaceBetween={75}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              onAutoplayTimeLeft={onAutoplayTimeLeft}
              className="mySwiper"
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <div className="card" >
                    <div className="img">
                      {testimonial?.profilePic ? <img src={`${testimonial?.profilePic}`} alt="" /> : <img src="/Images/profile.png" alt="" />}
                    </div>
                    <div className="name">
                      <h2>{testimonial.name}</h2>
                    </div>
                    <div className="country">
                      <h3>{testimonial?.currentPosition}</h3>
                    </div>
                    <div className="about">
                      <p>{testimonial.message}</p>
                    </div>
                  </div>

                </SwiperSlide>))}

              <div className="autoplay-progress" slot="container-end">
                <svg viewBox="0 0 48 48" ref={progressCircle}>
                  <circle cx="24" cy="24" r="20"></circle>
                </svg>
                <span ref={progressContent}></span>
              </div>
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
}

export default Section2;
