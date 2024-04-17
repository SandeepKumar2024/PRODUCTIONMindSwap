import React, { useEffect, useState } from "react";
import "./Filter.css";
import { useNavigate } from "react-router-dom";

function Programming() {
  const [ProgrammingTopics, setProgrammingTopics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const ProgrammingTopicDatas = [
      {
        section: "Coding",
        topics: [
          "C",
          "C++",
          "Java",
          "Python",
          "Kotlin",
          "C#",
          "Rust",
          "Swift",
          "Ruby",
          "DSA",
        ],
      },
      {
        section: "Frontend",
        topics: [
          "HTML",
          "CSS",
          "JavaScript",
          "React",
          "Redux",
          "Vue.js",
          "Angular",
          "JQuery",
          "Typescript",
          "Tailwind CSS",
          "Next.js",
          "Flutter",
          "Bootstrap",
          "NPM",
          "React Native",
          "Three.js",

        ],
      },
      {
        section: "Backend",
        topics: [
        "Node.js",
        "Express.js",
        "Django",
        "Laravel",
        "Solidity",
        "Rupy",
        "Golang",
        "Scala",
        "Perl",
        "Rust",
        "AWS",
        "REST",
        "Google Cloud",
        "Apache",
        ".Net",
        
        ],
      },
      {
        section: "Database",
        topics: [
      "MySQl",
      "PostgreSQL",
      "Oracle",
      "MongoDB",
      "Cassandra",
      "Redis",
      "Couchbase",
      "SQLite",
      "ElasticSearch",
      "Neo4j",
      "Cloud DB",
      "Firebase",

        ],
      },
      {
        section: "Development",
        topics: [
      "Game Development",
      "App Development",
      "Web Development",
      "Desktop Development",
      "Enterprise Software Development",
      "Blockchain Development",
        ],
      },
    ];
    setProgrammingTopics(ProgrammingTopicDatas);
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
      <h1>Programming</h1>

      <div className="subjectBusket">
      {ProgrammingTopics.map((programmingSection, index) => (
          <div key={index}>
            <h2>{programmingSection.section}</h2>
            <div>
              {programmingSection.topics.map((programmingSectionTopic, index) => (
                <div className="points" key={index} id={programmingSectionTopic} onClick={filterItem}>{programmingSectionTopic}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Programming;
