import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getDeveloperDetails,
  getGamesForDeveloper
} from "../../services/developersServices";
import styles from "./DeveloperPage.module.css";

const DeveloperPage = () => {
  const { id } = useParams();
  const [developerDetails, setDeveloperDetails] = useState(null);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeveloperDetails = async () => {
      try {
        setLoading(true);
        const details = await getDeveloperDetails(id);
        setDeveloperDetails(details);
        const developerGames = await getGamesForDeveloper(id);
        setGames(developerGames);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchDeveloperDetails();
  }, [id]);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!developerDetails) {
    return <div className={styles.error}>Developers not found</div>;
  }

  return (
    <div className={styles.developerPage}>
      <div className={styles.backButton}>
        <Link to="/developers">← Back to developers</Link>
      </div>
      <h1>{developerDetails.name}</h1>
      {/* Удаляем HTML-теги и декодируем HTML-сущности вроде &#39; → ' */}
      <p>{
        new DOMParser()
          .parseFromString(developerDetails.description, "text/html")
          .body.textContent
      }</p>
      <h2>Games by {developerDetails.name}</h2>
      <div className={styles.gameList}>
        {games.map((game) => (
          <Link
            to={`/games/${game.id}`}
            key={game.id}
            className={styles.gameCardLink}
          >
            <div className={styles.gameCard}>
              <img
                src={game.background_image}
                alt={game.name}
                className={styles.gameImage}
              />
              <h3>{game.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DeveloperPage;
