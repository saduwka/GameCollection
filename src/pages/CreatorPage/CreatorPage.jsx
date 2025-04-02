import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getCreatorDetails,
  getGamesForCreator,
} from "../../services/creatorServices";
import styles from "./CreatorPage.module.css";

const CreatorPage = () => {
  const { id } = useParams();
  const [creatorDetails, setCreatorDetails] = useState(null);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreatorDetails = async () => {
      try {
        setLoading(true);
        const details = await getCreatorDetails(id);
        setCreatorDetails(details);
        const creatorGames = await getGamesForCreator(id);
        setGames(creatorGames);
        setLoading(false);
      } catch (error) {
        creator.error(error);
        setLoading(false);
      }
    };
    fetchCreatorDetails();
  }, [id]);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!creatorDetails) {
    return <div className={styles.error}>Creators not found</div>;
  }

  return (
    <div className={styles.creatorPage}>
      <h1>{creatorDetails.name}</h1>
      <p>{creatorDetails.description}</p>
      <h2>Games on {creatorDetails.name}</h2>
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

export default CreatorPage;
