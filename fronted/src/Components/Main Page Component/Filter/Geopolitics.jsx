import React, { useEffect, useState } from "react";
import "./Filter.css";
import { useNavigate } from "react-router-dom";

function Geopolitics() {
  const [GeopoliticsTopics, setGeopoliticsTopics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const GeopoliticsTopicDatas = [
      "Geopolitical Theory",
      "Political Geography",
      "International Relation",
      "Strategic Studies",
      "Economic Geopolitics",
      "Energy Geopolitics",
      "Geopolitics of Climate change",
      "Maritime Geopolitics",
      "Cyber Geopolitics",
      "Geopolitics of tech",
      "Human Geopolitics",
      "Geopolitics of Global Governance",
      "Geopolitics and Media",
      "Geopolitics of Foreign policy analysis.",
    ];
    setGeopoliticsTopics(GeopoliticsTopicDatas);
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
      <h1>Geopolitics</h1>

      <div className="subjectBusket">
        {GeopoliticsTopics.map((GeopoliticsTopic, index) => (
          <div className="points" id={GeopoliticsTopic} key={index} onClick={filterItem}>
            {GeopoliticsTopic}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Geopolitics;
