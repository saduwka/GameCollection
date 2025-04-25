import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  getDeveloperDetails,
  getGamesForDeveloper
} from "../../services/developersServices";
import styles from "./DeveloperPage.module.css";
import LoadingErrorMessage from "../../components/LoadingErrorMessage/LoadingErrorMessage";
import GameCard from "../../components/GameCard/GameCard";

const DeveloperPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [developerDetails, setDeveloperDetails] = useState(null);
  const [games, setGames] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeveloperData = async () => {
      try {
        setInitialLoading(true);
        const details = await getDeveloperDetails(id);
        const gamesList = await getGamesForDeveloper(id);

        setDeveloperDetails(details);
        const sortedGames = gamesList.sort((a, b) => b.rating - a.rating);
        setGames(sortedGames);
        setInitialLoading(false);
      } catch (error) {
        setError("Failed to fetch developer details or games");
        setInitialLoading(false);
      }
    };
    fetchDeveloperData();
  }, [id]);

  return (
    <div className={styles.developerPage}>
     <button onClick={() => navigate(-1)} className={styles.backButton}>← Back</button>
      <LoadingErrorMessage
        loading={initialLoading}
        error={error}
        noResults={!initialLoading && !error && !developerDetails}
      />
      {!initialLoading && !error && developerDetails && (
        <div>
          <h1>{developerDetails.name}</h1>
          <p className={styles.description}>
            {
              new DOMParser()
                .parseFromString(developerDetails.description, "text/html")
                .body.textContent
            }
          </p>
          <h2>Games by {developerDetails.name}</h2>
          <div className={styles.gameList}>
            {games.map((game) => (
              <Link
                to={`/games/${game.id}`}
                key={game.id}
                className={styles.gameCardLink}
              >
                <GameCard game={game} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeveloperPage;
