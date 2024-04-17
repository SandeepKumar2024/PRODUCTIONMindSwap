import React, { useEffect, useState } from "react";
import "./Filter.css";
import { useNavigate } from "react-router-dom";

function Science() {
  const [ScienceTopics, setScienceTopics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const ScienceTopicDatas = [
      {
        section: "Chemistry",
        topics: [
          "Structure of Atom",
          "Classification of Elements and Priodicity",
          "Chemical bonding & molecules",
          "Chemical Thermodynamics",
          "Equilibrium",
          "Redox Reaction",
          "Organic Chemistry",
          "Hydrocarbons",
          "Electrochemistry",
          "Chemical Kinetics",
          "d and f block elements",
          "Coordination Compounds",
          "Haloalkanes and Haloarenes",
          "Alcohols, Phenols & Ethers",
          "Aldehydes, Ketones & Carboxylic Acids",
          "Amines",
          "Biomolecules",
        ],
      },
      {
        section: "Physics",
        topics: [
          "Electrostatics",
          "Current Electricity",
          "Magnetic Effects of Current",
          "Electromagnetic Inductions",
          "Electromagnetic Waves",
          "Optics",
          "Dual Nature of Radiation & Matter",
          "Atom & Nuclei",
          "Electronic Devices",
          "Measurement",
          "Kinematics",
          "Laws of Motion",
          "Work, Energy & Power",
          "Gravitation",
          "Properties of Bulk Matter",
          "Thermodynamics",
          "Oscillation & Waves",
        ],
      },
      {
        section: "Botany",
        topics: [
          "Diversity of Living Organisms",
          "Structural Organization in Plants & Animals",
          "Cell: Structure & Function",
          "Plant Physiology",
          "Human Physiology : A&B",
          "Reproduction",
          "Genetic & Evolution",
          "Biology & Human Welfare",
          "Biotechnology and its Applications",
          "Ecology & Environment",
        ],
      },
      {
        section: "Zoology",
        topics: [
          "Evolutionary Biology",
          "Faunal Diversity",
          "Biota & Environment",
          "Conservation Biology",
          "Animal Tissue",
          "Development Biology",
          "Human Biology",
          "Human Population & Health Disorder",
          "Applied Biology",
        ],
      },
      {
        section: "Mathematics",
        topics: [
          "Sets",
          "Relation & Functions",
          "Trigonometry",
          "Algebra",
          "Co-ordinate Geometry",
          "Calculus",
          "Statistics",
          "Probability",
          "Mathematical Reasoning",
          "Statics & Dynamics",
          "Discrete Mathematics",
          "Vector Algebra",
          "Numerical Analysis",
          "Mathematical Modelling",
          "Complex Analysis",
          "Real Analysis",
          "Oparations Research",
        ],
      },
      {
        section: "Statistics",
        topics: [
          "Descriptive Statistics",
          "Calculus",
          "Sampling Distribution",
          "Survey Sampling",
          "Mathematical Analysis",
          "Statistical Inference",
          "Linear Models",
          "Statistical Quality Control",
          "Stochastic Processes and Queuing Theory",
          "Statistical Computing",
          "Design and Experiments",
          "Multivariate Analysis",
        ],
      },
    ];

    setScienceTopics(ScienceTopicDatas);
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
      <h1>Sciences</h1>

      <div className="subjectBusket">
        {ScienceTopics.map((scienceSection, index) => (
          <div key={index}>
            <h2>{scienceSection.section}</h2>
            <div>
              {scienceSection.topics.map((scienceSectiontopic, index) => (
                <div
                  className="points"
                  key={index}
                  id={scienceSectiontopic}
                  onClick={filterItem}
                >
                  {scienceSectiontopic}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Science;
