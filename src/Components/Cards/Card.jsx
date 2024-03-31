import React, { useState, useEffect } from "react";
import "./Card.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Card = () => {
  const [userData, setUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [allUserData, setAllUserData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/albums"
        );
        setAllUserData(response.data);

        // Count occurrences of each user ID
        const idCounts = {};
        response.data.forEach((item) => {
          idCounts[item.userId] = (idCounts[item.userId] || 0) + 1;
        });
        // Create an array of unique user IDs with their counts
        const uniqueUserData = Object.keys(idCounts).map((userId) => ({
          userId,
          count: idCounts[userId],
        }));
        setUserData(uniqueUserData);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, []);

  // Generating random color for each card
  const generateRandomColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + randomColor;
  };

  const handleClick = (userId) => {
    navigate(`/totalitems`, { state: { userId: userId } });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter user data based on search query
  const filteredUserData = userData.filter((user) =>
    user.userId.toString().includes(searchQuery)
  );

  return (
    <>
      <header className="Header">
        <h1 className="Header-title">
            <a href="https://ayushshuklas.netlify.com" target="__blank" className="Header-link">Lo'Go</a> 
            </h1>
        <input
          type="text"
          placeholder="Search by User ID"
          value={searchQuery}
          onChange={handleSearchChange}
          className="Header-search"
        />
      </header>

      <div className="card-container">
        {filteredUserData.map((user, index) => (
          <div
            key={index}
            className="card"
            style={{ backgroundColor: generateRandomColor() }}
            onClick={() => handleClick(user.userId)}
          >
            <div className="count-circle">
              <div className="countincircle">{user.count}</div>
            </div>
            <p>User ID: {user.userId}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Card;
