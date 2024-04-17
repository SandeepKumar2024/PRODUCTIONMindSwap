import React, { useEffect, useState } from "react";
import "./Filter.css";
import { useNavigate } from "react-router-dom";

function SoftSkill() {
  const [SoftSkillTopics, setSoftSkillTopics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const SoftSkillTopicDatas = [
      "Communication",
      "Ledearship",
      "Problem Solving",
      "Emotional Intelligence",
      "Creativity",
      "Teamwork",
      "Critical Thinking",
      "Management",
      "Negotiation",
      "Time Management",
      "Persuassion",
      "Collabration",
    ];
    setSoftSkillTopics(SoftSkillTopicDatas);
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
      <h1>Soft Skill</h1>

      <div className="subjectBusket">
        {SoftSkillTopics.map((SoftSkillTopic,index) => (
          <div className="points" id={SoftSkillTopic} key={index} onClick={filterItem }>{SoftSkillTopic}</div>
        ))}
      </div>
    </div>
  );
}

export default SoftSkill;
