import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"; // добавлен useNavigate
import {
  getConsoleDetails,
  getGamesForConsole
} from "../../services/consoleServices";
import styles from "./ConsolePage.module.css";
import GameCard from "../../components/GameCard/GameCard";
import LoadingErrorMessage from "../../components/LoadingErrorMessage/LoadingErrorMessage";

const ConsolePage = () => {
  const { id } = useParams();
  const [consoleDetails, setConsoleDetails] = useState(null);
  const [games, setGames] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchConsoleDetails = async () => {
      try {
        setInitialLoading(true);
        const details = await getConsoleDetails(id);
        setConsoleDetails(details);
        setInitialLoading(false);
      } catch (error) {
        setError("Failed to fetch console details");
        setInitialLoading(false);
      }
    };
    fetchConsoleDetails();
  }, [id]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setPageLoading(true);
        const consoleGames = await getGamesForConsole(id, page);
        if (consoleGames.length === 0) {
          setHasMore(false);
        } else {
          const sortedGames = consoleGames.sort((a, b) => b.rating - a.rating);
          setGames((prevGames) => [...prevGames, ...sortedGames]);
          if (consoleGames.length < 10) {
            setHasMore(false);
          }
        }
        setPageLoading(false);
      } catch (error) {
        setError("Error fetching games");
        setHasMore(false);
        setPageLoading(false);
      }
    };
    fetchGames();
  }, [id, page]);

  return (
    <div className={styles.consolePage}>
      <button onClick={() => navigate(-1)} className={styles.backButton}>← Back</button>
      {consoleDetails && <h1>{consoleDetails.name}</h1>}
      {consoleDetails && (
        <p className={styles.description}>
          {new DOMParser()
            .parseFromString(consoleDetails.description, "text/html")
            .body.textContent}
        </p>
      )}
      <h2 className={styles.heading}>
        {consoleDetails ? `Games on ${consoleDetails.name}` : ""}
      </h2>
      <LoadingErrorMessage
        loading={initialLoading}
        error={error}
        noResults={!initialLoading && !error && games.length === 0}
      />
      {!initialLoading && !error && games.length > 0 && (
        <div className={styles.gameList}>
          {games.map((game, index) => (
            <Link
            to={`/games/${game.id}`}
            key={`${game.id}-${index}`}
            className={styles.gameCardLink}
            target="_blank"
          >
            <GameCard game={game} />
          </Link>
          ))}
        </div>
      )}
      {hasMore && !initialLoading && !error && (
        <div className={styles.loadMoreButton}>
          <button onClick={() => setPage((prev) => prev + 1)} disabled={pageLoading}>
            {pageLoading ? "Wait..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ConsolePage;