import React, { useEffect, useState } from "react";
import "./Filter.css";
import { useNavigate } from "react-router-dom";

function Engineering() {
  const [EngineeringTopics, setEngineeringTopics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const EngineeringTopicDatas = [
      {
        section: "Mechanical",
        topics: [
            "Fluid Mechanics",
            "Materials Science",
            "Thermodynamics",
            "Design",
            "Applied Mechanics",
            "Heat Transfer",
            "Solid Mechanics",
            "Dynamics",
            "Biomechanics",
            "Dynamics of Machinery",
            "Manufacturing Technology",
            "Theory of Machines",
            "Controlled Systems",
            "Kinematics",
            "Measurement",
            "Numerical Analysis",
            "Machine Drawing",
        ],
      },
      {
        section: "Civil",
        topics: [
           "Structural Engineering",
           "Geotechnical",
           "Environmental",
           "Fluid Mechanics",
           "Hydraulic Engineering",
           "Soil Mechanics",
           'Geology',
           "Highway Engineering",
           "Transportation Engineering",
           "Building Material",
           "Contruction Management",
           "Surveying",
           "Designing of Buildings",
           "Cade Laboratory",
           "Hydropower Engineering",
           "Plumbing Engineering",
           "Structural Engineering",
        ],
      },
      {
        section: "Electronics",
        topics: [
         "Analog eletronics",
         "DSP",
         "Data Communication",
         "Computer Networks",
         "Micro Electronics",
         "Embedded System",
         "Instrumentation",
         "DIP",
         "Network Analysis",
         "Digital Electronics",
         "Microcontrollers",
         "Optical Networks",
         "VLSI",
         "Electromagnetisms",
         "IOT",
         "Networking Lab",
         "Electronic Instrumentation",
        ],
      },
      {
        section: "Computer Science",
        topics: [
       "Software Engineering",
       "Computer Architecture",
       "Discrete Mathematics",
       "Operating Systems",
       "OOP's",
       "Theory of Computation",
       "Data mining",
       "AI",
       "ML",
       "Computer Networks",
       "DBMS",
       "Theory of Computation",
       "Statistics",
       "Probability",
       "Mathematical Reasoning",
       "Statics & Dynamics",
       "Data Science",
       "Scripting Languages",
       "Cyber Security",
       "Automata Systems",
       "Compiler Design",
       "System Design",
       "NLP",
       "Cryptography & Information Systems",
        ],
      },
      {
        section: "Electrical",
        topics: [
            "Power Electronics",
            "Digital Electronics",
            "Electronic Power Systems",
            "Control System",
            "Digital Signal Processing",
            "Electromagnetism",
            "Engineering Maths",
            "Signal Processing",
            "Control Engineering",
            "Network Analysis",
            "Applied Mechanics",
            "Electromechanics",
            "Analog Circuits",
            "Communications Systems",
            "Elctromagnetism",
            "Material Science",
            "Circuit Theory",
            "Electricity",
            "Electromenachics",
        ],
      },
    ];
    setEngineeringTopics(EngineeringTopicDatas);
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
      <h1>Engineering</h1>

      <div className="subjectBusket">
      {EngineeringTopics.map((engineeringSection, index) => (
          <div key={index}>
            <h2>{engineeringSection.section}</h2>
            <div>
              {engineeringSection.topics.map((engineeringSectionTopic, index) => (
                <div className="points" key={index} id={engineeringSectionTopic} onClick={filterItem}>{engineeringSectionTopic}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Engineering;
