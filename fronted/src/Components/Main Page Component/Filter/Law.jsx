import React, { useEffect, useState } from "react";
import "./Filter.css";
import { useNavigate } from "react-router-dom";

function Law() {
  const [LawTopics, setLawTopics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const LawTopicDatas = [
      {
        section: "Public Law",
        topics: [
          "Constitutional Law",
          "Administrative Law",
          "Criminal Law",
          "Taxation Law",
          "Environmental Law",
          "Human Rights Law",
          "International Law",
        ],
      },
      {
        section: "Private Law",
        topics: [
          "Conttract Law",
          "Tort Law",
          "Family Law",
          "Property Law",
          "Company Law",
          "Intellectual Property Law",
        ],
      },
      {
        section: "Procedural Law",
        topics: [
          "Code of Criminal Procedure(CrPC)",
          "Code of Civil Procedure(CPC) ",
          "Evidence Law",
        ],
      },
      {
        section: "Specialized Areas",
        topics: [
          "Labour and Industrial Laws",
          "Cyber Law",
          "Alternative Dispute Resolution(ADR)",
        ],
      },
    ];

    setLawTopics(LawTopicDatas);
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
      <h1>Laws</h1>

      <div className="subjectBusket">
        {LawTopics.map((lawSection, index) => (
          <div key={index}>
            <h2>{lawSection.section}</h2>
            <div>
              {lawSection.topics.map((lawSectiontopic, index) => (
                <div
                  className="points"
                  key={index}
                  id={lawSectiontopic}
                  onClick={filterItem}
                >
                  {lawSectiontopic}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Law;
