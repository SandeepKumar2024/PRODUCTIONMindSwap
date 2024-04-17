import React, { useEffect, useState } from "react";
import "./UpdateProfileComponent.css";
import { toast } from 'react-toastify';
import axios from "axios";

function UpdateProfileComponent({ id }) {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [currentPosition, setCurrentPosition] = useState("");
  const [course, setCourse] = useState("");
  const [institute, setInstitute] = useState("");
  const [classYear, setClassYear] = useState("");
  const [subjectsKnown, setSubjectsKnown] = useState("");
  const [languageProficiency, setLanguageProficiency] = useState("");
  const [extraSkills, setExtraSkills] = useState("");
  const [talksAbout, setTalksAbout] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [github, setGithub] = useState("");
  const [headline, setHeadline] = useState("");
  const [respondent, setRespondent] = useState(false);
  const [profileUrl, setProfileUrl] = useState("");



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "dob":
        setDob(value);
        break;
      case "gender":
        setGender(value);
        break;
      case "current-position":
        setCurrentPosition(value);
        break;
      case "course":
        setCourse(value);
        break;
      case "institute":
        setInstitute(value);
        break;
      case "class":
        setClassYear(value);
        break;
      case "subject-known":
        setSubjectsKnown(value);
        break;
      case "language-proficiency":
        setLanguageProficiency(value);
        break;
      case "extra-skill":
        setExtraSkills(value);
        break;
      case "talks-about":
        setTalksAbout(value);
        break;
      case "linkedin":
        setLinkedin(value);
        break;
      case "instagram":
        setInstagram(value);
        break;
      case "twitter":
        setTwitter(value);
        break;
      case "github":
        setGithub(value);
        break;
      case "headline":
        setHeadline(value);
        break;
      case "respondent":
        setRespondent(!respondent);
        break;
      default:
        break;
    }
  };

  const handleReset = async () => {
   
    // Reset form after submission
    setName("");
    setDob("");
    setGender("");
    setCurrentPosition("");
    setCourse("");
    setInstitute("");
    setClassYear("");
    setSubjectsKnown("");
    setLanguageProficiency("");
    setExtraSkills("");
    setTalksAbout("");
    setLinkedin("");
    setInstagram("");
    setTwitter("");
    setGithub("");
    setHeadline("");
    setRespondent(false);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here
    const formData = {
      name,
      dob,
      gender,
      currentPosition,
      course,
      institute,
      classYear,
      subjectsKnown,
      languageProficiency,
      extraSkills,
      talksAbout,
      linkedin,
      instagram,
      twitter,
      github,
      headline,
      respondent,
    };

    try {
      const res = await axios.get(`/api/user/get/${id}`);
      const existingUser = res.data;
      const modifiedData = {};

      for (const key in formData) {
        // Check if the field has changed, is not empty, and if it's not the same as existing user data
        if (formData[key] && formData[key] !== existingUser[key]) {
          modifiedData[key] = formData[key];
        }
      }

      // If there are modified fields, update the user
      if (Object.keys(modifiedData).length > 0) {
        const updatedRes = await axios.post(
          `/api/user/update/${id}`,
          modifiedData,

        );

        // console.log("Modified data :", updatedRes.data.message);
        toast.success(updatedRes.data.message);
      } else {
        // console.log("No changes detected. Nothing to update.");
        toast.info("No changes detected. Nothing to update.")
      }

      handleReset();

    } catch (error) {
      console.log(error);
    }
  };

  //fetch user profils picture from DB
  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await axios.get(`/api/user/get/${id}`);
        const existingUser = res.data;
        setProfileUrl(existingUser.profilePic)
      }

      fetchData()
    } catch (error) {
      console.log(error);

    }

  }, [id])

  //upload image change
  const [profile, setProfile] = useState(null)
  const handleProfileChange = (e) => {
    setProfile(e.target.files[0])
  }

  const handleProfileUploads = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('image', profile)
    try {
      const res = await axios.post(`/api/upload/${id}`, formData)
      toast.success(res.data.message)
      toggleUploadPopup();
      setProfile(null);
    } catch (error) {
      console.log(error)
    }
  }

  //Uplaod image popup starts
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const toggleUploadPopup = () => {
    setShowUploadPopup(!showUploadPopup);
  };
  // Uplaod image popup ends
  return (
    <>
      <div
        className={`upload-overlay ${showUploadPopup ? "show-upload-overlay" : ""
          }`}
        onClick={toggleUploadPopup}
      ></div>
      <div id="update-profile-container">
        <h1>Update Profile</h1>
        <h5 className="note">Fill all the fields to get request.</h5>
        <div id="profile-pic">
          {profileUrl ? <img src={`/api/${profileUrl}`} alt="" /> : <img src="/public/Images/profile.png" alt="Profile" />}
          <button onClick={toggleUploadPopup}>Change</button>
        </div>
        <div
          className={`upload-popup ${showUploadPopup ? "show-upload-popup" : ""
            }`}
        >
          <input type="file" id="imageInput" onChange={handleProfileChange} />
          <button id="upload-btn" onClick={handleProfileUploads} >Upload Image</button>
        </div>

        <form action="" id="updateProfileForm" onSubmit={handleSubmit}>
          <div className="data">
            <label htmlFor="full-name">Full Name </label>
            <input
              type="text"
              name="name"
              id="full-name"
              value={name}
              onChange={handleInputChange}
              placeholder="Enter Your Name"
            />
          </div>
          <div className="data">
            <label htmlFor="dob">D.O.B </label>
            <input
              type="date"
              name="dob"
              id="dob"
              value={dob}
              onChange={handleInputChange}
            />
          </div>
          <div className="data">
            <label htmlFor="gender">Gender </label>
            <select
              id="gender"
              name="gender"
              value={gender}
              onChange={handleInputChange}
            >
              <option value="" disabled defaultValue={"selected"}>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="data">
            <label htmlFor="current-position">Current Position </label>
            <input
              type="text"
              name="current-position"
              id="current-position"
              value={currentPosition}
              onChange={handleInputChange}
              placeholder="Ex:- Student, Developer, Founder, etc,."
            />
          </div>
          <div className="data">
            <label htmlFor="course">Course </label>
            <input
              type="text"
              name="course"
              id="course"
              value={course}
              onChange={handleInputChange}
              placeholder="Ex:- BCA, B-Tech, B.Sc, etc,."
            />
          </div>
          <div className="data">
            <label htmlFor="institute">Institute/Company </label>
            <input
              type="text"
              name="institute"
              id="institute"
              value={institute}
              onChange={handleInputChange}
              placeholder="Ex:- Delhi University, BITS,etc,."
            />
          </div>
          <div className="data">
            <label htmlFor="class">Class/Year </label>
            <select
              id="class"
              name="class"
              value={classYear}
              onChange={handleInputChange}
            >
              <option value="" disabled defaultValue={"selected"}>
                Select Class/Year{" "}
              </option>
              <option value="Higher Secondary">Higher Secondary</option>
              <option value="UG 1st Year">UG 1st year</option>
              <option value="UG 2nd Year">UG 2nd year</option>
              <option value="UG 3rd Year">UG 3rd year</option>
              <option value="UG 4th Year">UG 4rd year</option>
              <option value="PG 1st Year">PG 1st year</option>
              <option value="PG 2nd Year">PG 2nd year</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="data">
            <label htmlFor="subject-known">Subject Known</label>
            <input
              type="text"
              name="subject-known"
              id="subject-known"
              value={subjectsKnown}
              onChange={handleInputChange}
              placeholder="Ex:- Python, Physics, Sociology,etc.,"
            />
          </div>
          <div className="data">
            <label htmlFor="language-proficiency">Language Proficiency </label>
            <input
              type="text"
              name="language-proficiency"
              id="language-proficiency"
              value={languageProficiency}
              onChange={handleInputChange}
              placeholder="Ex:- Hindi, English, Maithili, Bodo, etc.,"
            />
          </div>
          <div className="data">
            <label htmlFor="extra-skill">Extra Skills </label>
            <input
              type="text"
              name="extra-skill"
              id="extra-skill"
              value={extraSkills}
              onChange={handleInputChange}
              placeholder="Ex:- Editing, Graphic Designing, etc.,"
            />
          </div>
          <div className="data">
            <label htmlFor="talks-about">Talks About </label>
            <input
              type="text"
              name="talks-about"
              id="talks-about"
              value={talksAbout}
              onChange={handleInputChange}
              placeholder="Ex:- #startups, #tech, #geopolitics, etc.,"
            />
          </div>
          <div className="data">
            <label htmlFor="linkedin">LinkedIn URL</label>
            <input
              type="url"
              id="linkedin"
              name="linkedin"
              value={linkedin}
              onChange={handleInputChange}
              placeholder="Ex:- https://linkedin.com"
            />
          </div>
          <div className="data">
            <label htmlFor="instagram">Instagram URL</label>
            <input
              value={instagram}
              onChange={handleInputChange}
              placeholder="Ex:- https://instagram.com"
            />
          </div>
          <div className="data">
            <label htmlFor="twitter">Twitter URL</label>
            <input
              type="url"
              id="twitter"
              name="twitter"
              value={twitter}
              onChange={handleInputChange}
              placeholder="Ex:- https://twitter.com"
            />
          </div>
          <div className="data">
            <label htmlFor="github">GitHub URL</label>
            <input
              type="url"
              id="github"
              name="github"
              value={github}
              onChange={handleInputChange}
              placeholder="Ex:- https://github.com"
            />
          </div>
          <div className="data">
            <label htmlFor="headline">Headline </label>
            <textarea
              name="headline"
              id="headline"
              value={headline}
              onChange={handleInputChange}
              cols="15"
              rows="5"
              placeholder="I can teach Physics and loves talking about Geopolitics."
            ></textarea>
          </div>
          <div className="data dataCentered">
          <p>(Mark this checkbox to get request)</p>
            <div className="respondent">
              <input
                type="checkbox"
                name="respondent"
                id="respondent"
                checked={respondent}
                onChange={handleInputChange}
              />
              <label htmlFor="respondent" >Are you Respondent?</label>
            </div>
          </div>
          <div className="buttons">
            <button type="reset" id="reset">
              Reset <span>&#215;</span>
            </button>
            <button type="submit" id="submit">
              Save <span>&#8594;</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateProfileComponent;
