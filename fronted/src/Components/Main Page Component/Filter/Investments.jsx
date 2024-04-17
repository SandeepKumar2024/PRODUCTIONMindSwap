import React, { useEffect, useState } from "react";
import "./Filter.css";
import { useNavigate } from "react-router-dom";

function Investments() {
  const [InvestmentsTopics, setInvestmentsTopics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const InvestmentsTopicDatas = [
      "Stock Market",
      "Long Term",
      "Short Term",
      "Trading",
      "F/O",
      "Small cap",
      "Large cap",
      "NASDAQ",
      "NIFTY-FIFTY",
      "SENSEX",
      "Mutual Funds",
      "Swing Trading",
      "Personal Finance",
    ];
    setInvestmentsTopics(InvestmentsTopicDatas);
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
      <h1>Investments</h1>

      <div className="subjectBusket">
        {InvestmentsTopics.map((InvestmentsTopic,index) => (
          <div className="points" id={InvestmentsTopic} key={index} onClick={filterItem}>{InvestmentsTopic}</div>
        ))}
      </div>
    </div>
  );
}

export default Investments;
