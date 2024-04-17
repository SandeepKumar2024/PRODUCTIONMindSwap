import React, { useState, useEffect, useRef } from "react";
import "./Filter.css";
import Commerce from "./Commerce";
import SoftSkill from "./SoftSkill";
import Business from "./Business";
import Startups from "./Startups";
import Investments from "./Investments";
import Humanities from "./Humanities";
import Science from "./Science";
import Biotechnology from "./Biotechnology";
import MedicalScience from "./MedicalScience";
import Programming from "./Programming";
import Geopolitics from "./Geopolitics";
import Engeneering from "./Engineering";
import Law from "./Law";

function Filter() {
  const [activeItem, setActiveItem] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const filterRef = useRef(null);

  useEffect(() => {
    const closePopupsOnOutsideClick = (e) => {
      if (
        popupVisible &&
        filterRef.current &&
        !filterRef.current.contains(e.target)
      ) {
        handleClosePopups();
      }
    };

    document.addEventListener("mousedown", closePopupsOnOutsideClick);

    return () => {
      document.removeEventListener("mousedown", closePopupsOnOutsideClick);
    };
  }, [popupVisible]);

  const handleItemClick = (itemName) => {
    if (activeItem === itemName) {
      setActiveItem(null);
      setPopupVisible(false);
    } else {
      setActiveItem(itemName);
      setPopupVisible(true);
    }
  };

  const handleClosePopups = () => {
    setActiveItem(null);
    setPopupVisible(false);
  };

  const itemList = [
    { name: "Sciences", Component: Science },
    { name: "Commerce", Component: Commerce },
    { name: "Humanities", Component: Humanities },
    { name: "Programming", Component: Programming },
    { name: "Bio-Tech", Component: Biotechnology },
    { name: "Medical", Component: MedicalScience },
    { name: "Engineering", Component: Engeneering },
    { name: "Soft Skills", Component: SoftSkill },
    { name: "Businesses", Component: Business },
    { name: "Startups", Component: Startups },
    { name: "Investments", Component: Investments },
    { name: "Law", Component: Law },
    { name: "Geopolitics", Component: Geopolitics },
  ];

  return (
    <div ref={filterRef}>
      <div id="filter-section">
        <ul>
          {itemList.map(({ name }) => (
            <li
              key={name}
              className={activeItem === name ? "active" : ""}
              onClick={() => handleItemClick(name)}
            >
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </div>

      {popupVisible && (
        <>
          {itemList.map(({ name, Component }) => (
            activeItem === name && <Component key={name} /> // Assign key={name}
          ))}
        </>
      )}
    </div>
  );
}

export default Filter;
