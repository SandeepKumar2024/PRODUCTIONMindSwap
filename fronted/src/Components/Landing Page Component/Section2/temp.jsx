import React from "react";
import "./Section2.css";

function Section2() {
  const testimonials = [
    { id: 1, name: "John Doe", country: "USA", content: "Testimonial 1 content", profile: "Images/profile.png" },
    { id: 2, name: "Jane Smith", country: "Canada", content: "Testimonial 2 content", profile:  "Images/profile.png" },
    { id: 3, name: "Alice Johnson", country: "UK", content: "Testimonial 3 content", profile: "Images/profile.png" },
    // Add more testimonials as needed
  ];

  return (
    <div>
      <section id="Testimonials">
        <div className="changer">
        {/* left arrow */}
        <div className="left icon" id="Left">
          <img src="Icons/left.png" alt="Left" />
          {/* right arrow */}
        </div>
        <div className="right icon" id="Right">
          <img src="Icons/right.png" alt="right" />
        </div>

        </div>

        <h1>Reviews From Our Users</h1>
        <p id="users">100+ million people have already joined LiveMates</p>

        {/* main carousel */}
        <div className="wrapper">
          {testimonials.map((testimonial) => (
            <div className="carousel" key={testimonial.id}>
              <div className="card">
                <div className="img">
                  <img src={testimonial.profile} alt="User" />
                </div>
                <div className="name">
                  <h2>{testimonial.name}</h2>
                </div>
                <div className="country">
                  <h3>{testimonial.country}</h3>
                </div>
                <div className="about">
                  <p>{testimonial.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        
      </section>
    </div>
  );
}

export default Section2;
