import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getDeveloperDetails, getGamesForDeveloper } from "../../services/developersServices";
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
      <h1>{developerDetails.name}</h1>
      <p>{developerDetails.description}</p>
      <h2>Games on {developerDetails.name}</h2>
      <div className={styles.gameList}>
        {games.map((game) => (
          <Link
            to={`/games/${game.id}`}
            key={game.id}
            className={styles.gameCardLink}
          >
            <div className={styles.gameCard}>
              <h3>{game.name}</h3>
              <img
                src={game.background_image}
                alt={game.name}
                className={styles.gameImage}
              />
              <p>{game.released}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DeveloperPage;
