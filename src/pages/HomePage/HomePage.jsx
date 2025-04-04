import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";
import { fetchGames } from "../../services/gameListServices";
import { getConsoles } from "../../services/consolesServices";
import { SearchContext } from "../../contexts/SearchContext";

function HomePage() {
  const [randomGame, setRandomGame] = useState(null);
  const [allGames, setAllGames] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useContext(SearchContext);

  const handleRandomGameClick = () => {
    if (allGames.length > 0) {
      const randomIndex = Math.floor(Math.random() * allGames.length);
      setRandomGame(allGames[randomIndex]);
    }
  };

  const handleSearchClick = () => {
    if (searchQuery) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  useEffect(() => {
    const getGames = async () => {
      const { games } = await fetchGames();
      if (games.length > 0) {
        setAllGames(games);
      }
    };

    const getPlatforms = async () => {
      const consoles = await getConsoles();
      setPlatforms(consoles.slice(0, 5));
    };

    getGames();
    getPlatforms();
  }, []);

  const handleClick = () => {
    if (randomGame) {
      navigate(`/games/${randomGame.id}`);
    }
  };

  return (
    <div className={styles.homePage}>
      <h1>Welcome to Gaming Collection</h1>

      <div className={styles.searchForm}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Find your game..."
          className={styles.searchInput}
        />
        <button onClick={handleSearchClick}>Start</button>
      </div>

      <button
        onClick={handleRandomGameClick}
        className={styles.randomGameButton}
      >
        Random Game
      </button>

      {randomGame && (
        <div
          className={styles.banner}
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        >
          <img
            src={randomGame.background_image}
            alt={randomGame.name}
            className={styles.bannerImage}
          />
        </div>
      )}
    </div>
  );
}

export default HomePage;