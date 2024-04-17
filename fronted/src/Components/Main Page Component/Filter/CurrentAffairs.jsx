import React, { useEffect, useState } from "react";
import "./Filter.css";
import { useNavigate } from "react-router-dom";

function CurrentAffairs() {
  const [CurrentAffairsTopics, setCurrentAffairsTopics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const CurrentAffairsTopicDatas = [
      "History",
      "Geography",
      "Sociology",
      "Political Science",
      "Economics",
      "Psychology",
      "Anthropology",
      "English",
      "Public Administration",
      "Ethics",
    ];
    setCurrentAffairsTopics(CurrentAffairsTopicDatas);
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
      <h1>CurrentAffairs</h1>

      <div className="subjectBusket">
        {CurrentAffairsTopics.map((CurrentAffairsTopic, index) => (
          <div className="points" id={CurrentAffairsTopic} key={index} onClick={filterItem}>
            {CurrentAffairsTopic}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CurrentAffairs;
