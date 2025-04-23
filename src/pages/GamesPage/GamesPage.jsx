import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchGames } from "../../services/gameListServices";
import GameCard from "../../components/GameCard/GameCard";
import LoadingErrorMessage from "../../components/LoadingErrorMessage/LoadingErrorMessage";
import styles from "./GamesPage.module.css";

function GamesPage() {
  const [games, setGames] = useState([]);
  const [filter, setFilter] = useState("random");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const sortByPopularity = (array) => {
    return [...array].sort((a, b) => b.added - a.added);
  };

  const sortByRating = (array) => {
    return [...array].sort((a, b) => b.rating - a.rating);
  };

  useEffect(() => {
    const getGames = async () => {
      setLoading(true);
      setError(null);
      try {
        const gamesData = await fetchGames(currentPage); 
        let sortedGames = gamesData.games; 

        if (filter === "popular") {
          sortedGames = sortByPopularity(sortedGames);
        } else if (filter === "rating") {
          sortedGames = sortByRating(sortedGames);
        } else {
          sortedGames = shuffleArray(sortedGames);
        }

        setGames(sortedGames);
        setHasMore(gamesData.nextPageUrl !== null);
      } catch (err) {
        setError("Failed to fetch games");
      } finally {
        setLoading(false);
      }
    };

    getGames();
  }, [filter, currentPage]); 

  return (
    <div className={styles.gamesPage}>
      <div className={styles.content}>
        <h1 className={styles.heading}>Games List</h1>
        {!loading && (
          <div className={styles.filters}>
            <button onClick={() => setFilter("random")}>Random</button>
            <button onClick={() => setFilter("popular")}>Popular</button>
            <button onClick={() => setFilter("rating")}>Rating</button>
          </div>
        )}

        <LoadingErrorMessage
          loading={loading}
          error={error}
          noResults={!loading && !error && games.length === 0}
        />
        {!loading && !error && games.length > 0 && (
          <div className={styles.gamesList}>
            {games.map((game) => (
              <div key={game.id} className={styles.gameCardContainer}>
                <Link to={`/games/${game.id}`}>
                  <GameCard game={game} />
                </Link>
              </div>
            ))}
          </div>
        )}
        {!loading && (
          <div className={styles.pagination}>
            <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
              Previous
            </button>
            <span className={styles.pageNumber}>{currentPage}</span>
            {hasMore && (
              <button onClick={() => setCurrentPage((prev) => prev + 1)}>
                Next
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default GamesPage;
