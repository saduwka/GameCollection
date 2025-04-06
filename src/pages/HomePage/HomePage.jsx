import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";
import { SearchContext } from "../../contexts/SearchContext";

function HomePage() {
  const [randomGame, setRandomGame] = useState(null);
  const navigate = useNavigate();

  const { searchQuery, setSearchQuery } = useContext(SearchContext);

  const handleRandomGameClick = () => {
    navigate(`/search?query=${searchQuery}`);
  };


  return (
    <div className={styles.homePage}>
      <h1>Welcome to Gaming Collection</h1>
      <div className={styles.searchForm}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search games..."
          className={styles.searchInput}
        />
        <button onClick={handleRandomGameClick} className={styles.searchButton}>
          Search
        </button>
      </div>
    </div>
  );
}

export default HomePage;
