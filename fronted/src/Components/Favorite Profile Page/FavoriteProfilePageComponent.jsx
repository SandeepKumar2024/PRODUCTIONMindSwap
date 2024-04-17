import React, { useEffect, useState } from "react";
import "./FavoriteProfilePageComponent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios"
import { useNavigate } from "react-router-dom"
function FavoriteProfilePageComponent({ userId }) {
  const [allFavoriteProfileItems, setAllFavoriteProfileItems] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/user/favourite/all/${userId}`);
      setFavourites(response.data.favourites);
    }
    fetchData();

  }, [userId]);

  useEffect(() => {
    const fetchSenderDetails = async () => {

      try {
        // Fetch sender details for each sender ID
        const responses = await Promise.all(favourites.map(senderId => axios.get(`/api/user/get/${senderId}`)));

        // Extract sender details from responses
        const favUserDetails = responses.map(response => response.data)
        setAllFavoriteProfileItems(favUserDetails)

      } catch (error) {
        console.error('Error fetching sender details:', error.message);
      }
    };

    fetchSenderDetails();
  }, [favourites]);

  const handleNavigate = (id) => {
    navigate(`/selectedProfile/${id}`);
  }

  return (
    <>
      <div className="FavoriteProfilePageContainer">
        <div className="pageName">
          <h1>ALL FAVORITE PROFILES (<span>{allFavoriteProfileItems.length}</span>)</h1>
        </div>
        {allFavoriteProfileItems.map((item, index) => (
          <div key={index} id={`fp-item-${index}`} className="fp-items" onClick={() => handleNavigate(item._id)}>
            <div className="fp-ProfilePic">
              {item?.profilePic ? <img src={`${item?.profilePic}`} alt="" /> : <img src="/Images/profile.png"></img>}
            </div>
            <div className="fp-Container">
              <div className="fp-Name">
                <span className="name">{item.name}</span>
              </div>
              <div className="fp-CurrentPosition">
                <span className="name">{item.currentPosition}</span>
              </div>
              <div className="fp-CurrentInstitute">
                <span className="name">{item.institute}</span>
              </div>
            </div>

          </div>
        ))}
      </div>
    </>
  );
}

export default FavoriteProfilePageComponent;
