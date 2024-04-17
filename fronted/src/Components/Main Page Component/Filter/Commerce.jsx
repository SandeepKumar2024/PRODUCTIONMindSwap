import React, { useEffect, useState } from "react";
import "./Filter.css";
import { useNavigate } from "react-router-dom";

function Commerce() {
  const [commerceTopics, setcommerceTopics] = useState([]);
  useEffect(() => {
    const commerceTopicDatas = [
      "Acountancy",
      "Economics",
      "Management",
      "Finance",
      "Financial Accounting",
      "Business Studies",
      "Cost Accounting",
      "Corporate Law",
      "Business Law",
      "Audit",
      "Business Statistics",
      "Business Analytics",
      "Operation Management",
      "Business Economics",
      "Marketing Management",
      "Taxation",
      "Banking",
      "Corporate Governance",
    ];
    setcommerceTopics(commerceTopicDatas);
  }, []);

  const navigate = useNavigate();
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
      <h1>Commerce</h1>

      <div className="subjectBusket">
        {commerceTopics.map((commerceTopic,index) => (
          <div className="points" id={commerceTopic} key={index}  onClick={filterItem}>{commerceTopic}</div>
        ))}
      </div>
    </div>
  );
}

export default Commerce
