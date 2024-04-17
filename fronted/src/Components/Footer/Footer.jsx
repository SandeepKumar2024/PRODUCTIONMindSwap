import React from "react";
import "./Footer.css";
import facebookPic from "/Icons/facebook-icon.png";
import instagramPic from "/Icons/instagram-icon.png";
import twitterPic from "/Icons/twitter-icon.png";
import linkedinPic from "/Icons/linkedin-icon.png";
import youtubePic from "/Icons/youtube-icon.png";

const Footer = () => {
  return (
    <>
      <footer id="footer">
        <div id="footer-box">
          <div className="icons">
            <a href="#facebook">
              <div className="icon-box">
                <img src={facebookPic} alt="" />
              </div>
            </a>
            <a href="#instagram">
              <div className="icon-box">
                <img src={instagramPic} alt="" />
              </div>
            </a>
            <a href="#twitter">
              <div className="icon-box">
                <img src={twitterPic} alt="" />
              </div>
            </a>
            <a href="#linkedin">
              <div className="icon-box">
                <img src={linkedinPic} alt="" />
              </div>
            </a>
            <a href="#youtube">
              <div className="icon-box">
                <img src={youtubePic} alt="" />
              </div>
            </a>
          </div>

          <div className="newsletter">
            <form action="">
              <label htmlFor="newsletter">Join Our Newsletter</label>
              <input
                type="email"
                name="newsletter"
                id="newsletter"
                placeholder="Email Address"
              />
              <button type="submit">SUBSCRIBE</button>
            </form>
          </div>

          <div className="contact-us">
            <p className="h-key-point center">Contact Us</p>
            <p className="h-secondary center">
              Have a question or need assistance? Mail us at &nbsp;
              <a href="">official@mindswap.in</a> &nbsp;
              We're here to
              help!
            </p>
          </div>

          <div className="quick-links">
            <p className="h-key-point">Quick Links</p>

            <ul type="circle">
              <li className="h-key-point">
                <a href="#">Home</a>
              </li>
              <li className="h-key-point">
                <a href="#">About Us</a>
              </li>
              <li className="h-key-point">
                <a href="#">FAQ's</a>
              </li>
              <li className="h-key-point">
                <a href="#">Privacy Policy</a>
              </li>
              <li className="h-key-point">
                <a href="#">Testimonials</a>
              </li>
              <li className="h-key-point">
                <a href="#">Terms of Services</a>
              </li>
            </ul>
          </div>
          <div id="attributions">
            <h4>Images used from</h4>
            <div id="attribution-links">
              <p>1.  <a href='https://pngtree.com/freepng/teenage-doing-discussion-using-laptop-3d-character-illustration_13016309.html' target="_blank">png image from pngtree.com/</a></p>
              <p>2.  <a href="https://freepngclipart.com/free-png/75590-vector-students-education-learning-student-free-download-png-hq" target="_blank">https://freepngclipart.com/free-png/75590-vector-students-education-learning-student-free-download-png-hq</a></p>

              <p>3.  education PNG Designed By agny_illustration from <a href="https://pngtree.com/freepng/modern-flat-design-concept-of-online-learning-with-characters-sitting-at-desk-and-studying-with-laptop-can-use-for-r-mobile-app-landing-page-website-design-template-flat-vector-illustration_5332889.html?sol=downref&id=bef" target="_blank">https://pngtree.com/freepng/modern-flat-design-concept-of-online-learning-with-characters-sitting-at-desk-and-studying-with-laptop-can-use-for-r-mobile-app-landing-page-website-design-template-flat-vector-illustration_5332889.html?sol=downref&id=bef</a></p>
              <p>4.  social clipart PNG Designed By 588ku from <a href="https://pngtree.com/freepng/social-network_5413579.html?sol=downref&id=bef" target="_blank">https://pngtree.com/freepng/social-network_5413579.html?sol=downref&id=bef</a></p>

            </div>

          </div>
          <div className="copyright">
            <p>Copyright &copy; 2024 MindSwap.in - All rights reserved.</p>
          </div>
        </div>
      </footer>
      {/* <footer>
      <div id="footer-box">
      
      </div>
    </footer> */}
    </>
  );
};

export default Footer;
