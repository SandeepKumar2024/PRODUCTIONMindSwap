import React, { useEffect, useState } from "react";
import "./Filter.css";
import { useNavigate } from "react-router-dom";

function MedicalScience() {
  const [MedicalScienceTopics, setMedicalScienceTopics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const MedicalScienceTopicDatas = [
      "Physiology",
      "Biochemistry",
      "Immunology",
      "Anatomy",
      "Microbiology",
      "Human Physiology",
      "Cell Biology",
      "Histology  ",
      "Pathology",
      "Neuroanatomy",
      "Epidemiology",
      "Haematology",
      "Medicinal Chemistry",
      "Forensic Medicine",
      "Medicine",
      "Orthopadics",
      "Phychology",
      "Surgery",
      "Ophthalmology",
      "Pharmachology",
      "Psychiatry",
      "Dermatology",
      "Radiology",
      "Optometry",
      "Dental",
      "Genetics",
      "ENT",
      "Gastroenterenology",
    ];
    setMedicalScienceTopics(MedicalScienceTopicDatas);
  }, []);
  function filterItem(e) {
    const itemSelected = e.target.id;
    e.preventDefault();

    try {
      navigate(`/main/search?q=${encodeURIComponent(itemSelected)}`);

    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="mainContainer">
      <h1>Medical Science</h1>

      <div className="subjectBusket">
        {MedicalScienceTopics.map((MedicalScienceTopic,index) => (
          <div className="points" id={MedicalScienceTopic} key={index}      onClick={filterItem}>{MedicalScienceTopic}</div>
        ))}
      </div>
    </div>
  );
}

export default MedicalScience;
