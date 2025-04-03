import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";
import { fetchGames } from "../../services/gameListServices";
import { getConsoles } from "../../services/consolesServices";

function HomePage() {
  const [randomGame, setRandomGame] = useState(null);
  const [popularGames, setPopularGames] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getGames = async () => {
      const { games } = await fetchGames();
      if (games.length > 0) {
        const randomIndex = Math.floor(Math.random() * games.length);
        setRandomGame(games[randomIndex]);
        setPopularGames(games.slice(0, 5)); // Берём топ-5 популярных игр
      }
    };

    const getPlatforms = async () => {
      const consoles = await getConsoles();
      setPlatforms(consoles.slice(0, 5)); // Берём топ-5 платформ
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
      <p>Explore and track your favorite games and consoles!</p>

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

      <div className={styles.tablesWrapper}>
        <div className={styles.popularGames}>
          <h2>Popular Games</h2>
          <table className={styles.gameTable}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {popularGames.map((game) => (
                <tr
                  key={game.id}
                  onClick={() => navigate(`/games/${game.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <td>
                    <img
                      src={game.background_image}
                      alt={game.name}
                      className={styles.gameThumbnail}
                    />
                  </td>
                  <td>{game.name}</td>
                  <td>{game.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.popularPlatforms}>
          <h2>Popular Platforms</h2>
          <table className={styles.gameTable}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {platforms.map((platform) => (
                <tr key={platform.id} style={{ cursor: "pointer" }}>
                  <td>
                    <img
                      src={platform.image_background}
                      alt={platform.name}
                      className={styles.gameThumbnail}
                    />
                  </td>
                  <td>{platform.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
