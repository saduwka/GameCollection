import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getGenresDetails,
  getGamesForGenre
} from "../../services/genreServices";
import styles from "./GenrePage.module.css";
import LoadingErrorMessage from "../../components/LoadingErrorMessage/LoadingErrorMessage";
import GameCard from "../../components/GameCard/GameCard";

const GenrePage = () => {
  const { id } = useParams();
  const [genreDetails, setGenreDetails] = useState(null);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchGenreDetails = async () => {
      try {
        setLoading(true);
        setError(false);
        if (!genreDetails) {
          const details = await getGenresDetails(id);
          setGenreDetails(details);
        }
        const genreGames = await getGamesForGenre(id, page);
        if (genreGames.length === 0) {
          setHasMore(false);
        } else {
          setGames((prevGames) => [...prevGames, ...genreGames]);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(true);
        setLoading(false);
      }
    };
    fetchGenreDetails();
  }, [id, page]);

  return (
    <div className={styles.genrePage}>
      <LoadingErrorMessage
        loading={loading}
        error={error}
        noResults={!hasMore && games.length === 0}
      />

      {genreDetails && !loading && !error && (
        <>
          <div className={styles.backButton}>
            <Link to="/genres">← Back to genres</Link>
          </div>
          <h1>{genreDetails.name}</h1>
          <p className={styles.description}>
            {new DOMParser()
              .parseFromString(genreDetails.description, "text/html")
              .body.textContent}
          </p>
          <h2>Games on {genreDetails.name}</h2>
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
        </>
      )}

      {hasMore && !loading && !error && (
        <div className={styles.loadMoreButton}>
          <button type="button" onClick={() => setPage((prev) => prev + 1)}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default GenrePage;
