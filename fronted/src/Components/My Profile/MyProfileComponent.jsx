import React, { useEffect, useState } from "react";
import "./MyProfileComponent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faShare } from "@fortawesome/free-solid-svg-icons"; //for solid SVG icons
import axios from "axios"
import { toast } from 'react-toastify';


function MyProfile({ id }) {
  const [userData, setUserData] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      const res = await axios.get(`/api/user/get/${id}`);
      setUserData(res.data);
      


    }
    fetchData();
  }, [id])

  //for uploading banner to the DB
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const toggleUploadPopup = () => {
    setShowUploadPopup(!showUploadPopup);
  };
  const [profileBanner, setProfileBanner] = useState(null);
  const [profileBannerUrl, setProfileBannerUrl] = useState("")
  const handleProfileBannerChange = (e) => {
    setProfileBanner(e.target.files[0]);
  }

  const handleProfileBannerSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", profileBanner);
      await axios.post(
        `/api/upload/banner/${id}`,
        formData
      );

      toggleUploadPopup();
      toast.success("Profile Banner Uploaded Successfully");

      console.log("res.data", res.data)
    } catch (error) {

    }

  }

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await axios.get(`/api/user/get/${id}`);
        const existingUser = res.data;
        setProfileBannerUrl(existingUser.profileBanner)
      }

      fetchData();
    } catch (error) {
      console.log(error);

    }

  }, [id])

  //share profile link handler 

  const shareProfile = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Check out this profile!',
          url: `${window.location.origin}/selectedProfile/${id}`
        });
      } else {
        // Fallback for browsers that don't support navigator.share
        const shareUrl = `${window.location.origin}/selectedProfile/${id}`;
        const message = `Check out this profile: ${shareUrl}`;
        navigator.clipboard.writeText(message);
        alert('Profile link copied to clipboard');
      }
    } catch (error) {
      console.error('Error sharing profile:', error);
    }
  };

  //count totaL favourites 
  const [favouritesCount, setFavouritesCount] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/user/followers/${id}`);
      setFavouritesCount(response.data.totalFollowers);
    }
    fetchData();

  }, [id]);
  return (
    <>
      <div
        className={`upload-overlay ${showUploadPopup ? "show-upload-overlay" : ""
          }`}
        onClick={toggleUploadPopup}
      ></div>
      <div id="myProfile-container">
        {/* For banner uploading start */}
        <div
          className={`upload-popup ${showUploadPopup ? "show-upload-popup" : ""
            }`}
        >
          <input type="file" id="imageInput" onChange={handleProfileBannerChange} />
          <button id="upload-btn" onClick={handleProfileBannerSubmit}  >Upload Image</button>
        </div>
        {/* For banner uploading end */}
        <div className="myProfile-redirection">
          <div className="share" onClick={shareProfile}>
            <FontAwesomeIcon icon={faShare} />
            <h6>Share</h6>
          </div>
          <a href={`/updatProfile`}>
            <button>Update</button>
          </a>
        </div>
        <div id="top">
          <div className="profile-banner">
            <img src={`${profileBannerUrl}`} />
            <div id="edit-banner" onClick={toggleUploadPopup}>
              <FontAwesomeIcon icon={faPen} />
            </div>
          </div>
          <div className="profile-image">
            {userData?.profilePic ? <img src={`${userData?.profilePic}`} alt="" /> : <img src="/Images/profile.png" alt="" />}
          </div>
          <h1 id="tes">{userData.name}</h1>
          <h5 id="te">Followers : <span>{favouritesCount}</span></h5>
        </div>

        <div id="center">
          <h1 className="containerName">Profile Details</h1>
          <div className="data">
            <h1>Full Name</h1>
            <h1 id="Full-name" className="values">
              {userData.name}
            </h1>
          </div>

          <div className="data">
            <h1>D.O.B</h1>
            <h1 id="DOB" className="values">
              {userData.dob}
            </h1>
          </div>

          <div className="data">
            <h1>Gender</h1>
            <h1 id="gender" className="values">
              {userData.gender}
            </h1>
          </div>

          <div className="data">
            <h1>Current Position</h1>
            <h1 id="current-position" className="values">
              {userData.currentPosition}
            </h1>
          </div>

          <div className="data">
            <h1>Course</h1>
            <h1 id="course" className="values">
              {userData.course}
            </h1>
          </div>

          <div className="data">
            <h1>Institute/Company</h1>
            <h1 id="institute" className="values">
              {userData.institute}
            </h1>
          </div>

          <div className="data">
            <h1>Class/Year</h1>
            <h1 id="class" className="values">
              {userData.classYear}
            </h1>
          </div>

          <div className="data">
            <h1>Subject's Known</h1>
            <h1 id="subjects-known" className="values">
              {userData.subjectsKnown}
            </h1>
          </div>

          <div className="data">
            <h1>Language proficiency</h1>
            <h1 id="language-proficiency" className="values">
              {userData.languageProficiency}
            </h1>
          </div>

          <div className="data">
            <h1>Extra Skills</h1>
            <h1 id="extra-skills" className="values">
              {userData.extraSkills}
            </h1>
          </div>

          <div className="data">
            <h1>Talks About</h1>
            <h1 id="talks-about" className="values">
              {userData.talksAbout}
            </h1>
          </div>

          <div className="data">
            <h1>Headline</h1>
            <h1 id="headline" className="values">
              {userData.headline}
            </h1>
          </div>
        </div>

        <div id="bottom">
          <h1>My Social Media Links</h1>
          <div className="social-media-links">
            <a href={userData.linkedin} target="_blank" id="linkedin">
              <img src="Icons/linkedin-color-icon.png" alt="" />
              <h2>LinkedIn</h2>
            </a>

            <a href={userData.instagram} target="_blank" id="instagram">
              <img src="Icons/instagram-color-icon.png" alt="" />
              <h2>Instagram</h2>
            </a>

            <a href={userData.twitter} target="_blank" id="twitter">
              <img src="Icons/twitter-color-icon.png" alt="" />
              <h2>Twitter</h2>
            </a>

            <a href={userData.github} target="_blank" id="github">
              <img src="Icons/github-icon.png" alt="" id="githubIcon" />
              <h2>GitHub</h2>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyProfile;
