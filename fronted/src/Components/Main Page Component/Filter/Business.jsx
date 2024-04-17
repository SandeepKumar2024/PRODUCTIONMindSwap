import React, { useEffect, useState } from "react";
import "./Filter.css";
import { useNavigate } from "react-router-dom";

function Business() {
  const [BusinessTopics, setBusinessTopics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const BusinessTopicDatas = [
      "Financial Management",
      "Analatycal Skill",
      "Marketing",
      "Sales",
      "Strategy",
      "Delegation",
      "Networking",
      "Data Analysis",
      "Entrepreneurship",
      "Digtal Marketing",
      "SEO",
      "D2C",
      "B2B",
      "B2B2C",
      "B2C",
      "Supply Chain",
    ];
    setBusinessTopics(BusinessTopicDatas);
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
      <h1>Business</h1>

      <div className="subjectBusket">
        {BusinessTopics.map((BusinessTopic,index) => (
          <div className="points" id={BusinessTopic} key={index} onClick={filterItem}>{BusinessTopic}</div>
        ))}
      </div>
    </div>
  );
}

export default Business;
