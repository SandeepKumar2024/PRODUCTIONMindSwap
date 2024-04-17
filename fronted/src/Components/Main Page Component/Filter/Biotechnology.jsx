import React, { useEffect, useState } from "react";
import "./Filter.css";
import { useNavigate } from "react-router-dom";

function Biotechnology() {
  const [BiotechnologyTopics, setBiotechnologyTopics] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const BiotechnologyTopicDatas = [
      "Introductory Biological Chemistry",
      "Animal and Plant Pycology",        
      "Recombenant DNA Technology",
      "DNA Typing, Proteomus and Beyond",
      "Biodiversity and Taxonomy",
      "Microbiology and Macromolecule",
      "Biostatisties",
      "Computational Biology",
      "Chemistry",
      "Environmental Biotecnology",
      "Immunology",
      "Microbial Diversity",
      "Molecular Biology",
      "Biofertilizer Technology",
      "Industrial Biotecnology",
      "General Biology",
      "Biophysics",
      "Cell Biology",
      "Cellular Biology",
      "Genetics",
      "Animal Biotechnology",
      "Cell and Tissue Physiology",
      "BioInformatics",
    ];
    setBiotechnologyTopics(BiotechnologyTopicDatas);
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
      <h1>Biotechnology</h1>

      <div className="subjectBusket">
        {BiotechnologyTopics.map((BiotechnologyTopic,index) => (
          <div className="points" id={BiotechnologyTopic} key={index} onClick={filterItem}>{BiotechnologyTopic}</div>
        ))}
      </div>
    </div>
  );
}

export default Biotechnology;
