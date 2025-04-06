import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getConsoleDetails,
  getGamesForConsole
} from "../../services/consoleServices";
import styles from "./ConsolePage.module.css";

const ConsolePage = () => {
  const { id } = useParams();
  const [consoleDetails, setConsoleDetails] = useState(null);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchConsoleDetails = async () => {
      try {
        setLoading(true);
        const details = await getConsoleDetails(id);
        setConsoleDetails(details);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchConsoleDetails();
  }, [id]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const consoleGames = await getGamesForConsole(id, page);
        if (consoleGames.length === 0) {
          setHasMore(false);
        } else {
          setGames((prevGames) => [...prevGames, ...consoleGames]);
        }
      } catch (error) {
        console.error("Error fetching games:", error);
        setHasMore(false);
      }
    };
    fetchGames();
  }, [id, page]);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!consoleDetails) {
    return <div className={styles.error}>Console not found</div>;
  }

  return (
    <div className={styles.consolePage}>
      <div className={styles.backButton}>
        <Link to="/consoles">Back to platforms</Link>
      </div>
      <h1>{consoleDetails.name}</h1>
      <p className={styles.description}>{consoleDetails.description}</p>
      <h2 className={styles.heading}>Games on {consoleDetails.name}</h2>
      <div className={styles.gameList}>
        {games.map((game, index) => (
          <Link
            to={`/games/${game.id}`}
            key={`${game.id}-${index}`}
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
      {hasMore && (
        <div className={styles.loadMoreButton}>
          <button onClick={() => setPage((prev) => prev + 1)}>Load More</button>
        </div>
      )}
    </div>
  );
};

export default ConsolePage;
