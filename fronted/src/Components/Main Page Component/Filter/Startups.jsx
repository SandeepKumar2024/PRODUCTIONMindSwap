import React, { useEffect, useState } from "react";
import "./Filter.css";
import { useNavigate } from "react-router-dom";

function Startups() {
  const [StartupsTopics, setStartupsTopics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const StartupsTopicDatas = [
      "Spacetech",
      "Agritech",
      "Foodtech",
      "AI/ML/IOT",
      "EV",
      "Climatetech",
      "Ed-tech",
      "Fintech",
      "Healthtech",
      "Lifestyle",
      "Media & Entertainment",
      "Saas",
      "Hadware",
      "Web 3.0",
      "Blockchain",
      "Gaming",
      "Logistics",
    ];
    setStartupsTopics(StartupsTopicDatas);
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
      <h1>Startups</h1>

      <div className="subjectBusket">
        {StartupsTopics.map((StartupsTopic,index) => (
          <div className="points" id={StartupsTopic} key={index} onClick={filterItem}>{StartupsTopic}</div>
        ))}
      </div>
    </div>
  );
}

export default Startups;
