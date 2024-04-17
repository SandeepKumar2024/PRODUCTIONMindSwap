import React, { useEffect, useState } from "react";
import "./Filter.css";
import { useNavigate } from "react-router-dom";

function Humanities() {
  const [HumanitiesTopics, setHumanitiesTopics] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const HumanitiesTopicDatas = [
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
    setHumanitiesTopics(HumanitiesTopicDatas);
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
      <h1>Humanities</h1>

      <div className="subjectBusket">
        {HumanitiesTopics.map((HumanitiesTopic, index) => (
          <div className="points" id={HumanitiesTopic} key={index} onClick={filterItem}>
            {HumanitiesTopic}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Humanities;
