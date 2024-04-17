import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./FavoriteProfileDropDown.css";
import { useNavigate } from "react-router-dom"

function FavoriteProfileDropDown({
  showFavoriteProfileDropDown,
  favoriteList,
}) {
  const navigate = useNavigate();
  const handleNavigate = (id) => {
    navigate(`/selectedProfile/${id}`);
  }
  return (
    <>
      <div
        className={`fp-popup ${showFavoriteProfileDropDown ? "show-fp-popup" : ""
          }`}
      >
        <div id="fp-IndicationArrow"></div>
        <h1>Favorite</h1>
        {favoriteList.map((item, index) => (
          <div
            key={index}
            id={`fp-dropdown-item-${index}`}
            className="fp-dropdown-items"
            onClick={() =>handleNavigate(item._id)}
          >
            <div className="fp-ProfilePic">
            {item?.profilePic ? <img src={`${item?.profilePic}`} alt="" /> : <img src="/Images/profile.png" alt="Profile" />}
            </div>
            <div className="fp-Container">
              <div className="fp-Name">
                <span className="name">{item?.name}</span>
              </div>
              <div className="fp-CurrentPosition">
                <span className="name">{item?.currentPosition}</span>
              </div>
              <div className="fp-CurrentInstitute">
                <span className="name">{item?.institute}</span>
              </div>
            </div>

          </div>
        ))}
        {favoriteList?.length > 0 ? <div id="viewAll-fp">
          <a href="/favorites">VIEW ALL</a>
        </div> : <p style={{ textAlign: "center", marginTop: "5px" }}>No Favourites </p>}
      </div>
    </>
  );
}

export default FavoriteProfileDropDown;
