// src/pages/ConsolePage/ConsolePage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getConsoleDetails,
  getGamesForConsole,
} from "../../services/consoleServices";
import styles from "./ConsolePage.module.css";

const ConsolePage = () => {
  const { id } = useParams();
  const [consoleDetails, setConsoleDetails] = useState(null);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConsoleDetails = async () => {
      try {
        setLoading(true);
        const details = await getConsoleDetails(id);
        setConsoleDetails(details);
        const consoleGames = await getGamesForConsole(id);
        setGames(consoleGames);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchConsoleDetails();
  }, [id]);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!consoleDetails) {
    return <div className={styles.error}>Console not found</div>;
  }

  return (
    <div className={styles.consolePage}>
      <h1>{consoleDetails.name}</h1>
      <p>{consoleDetails.description}</p>
      <h2>Games on {consoleDetails.name}</h2>
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

export default ConsolePage;
