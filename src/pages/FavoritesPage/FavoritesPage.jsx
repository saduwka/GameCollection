import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./FavoritesPage.module.css";
import LoadingErrorMessage from "../../components/LoadingErrorMessage/LoadingErrorMessage";
import GameCard from "../../components/GameCard/GameCard";
import { getGameDetails } from "../../services/gamesServices";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const saved = localStorage.getItem("favorites");
        const parsed = saved ? JSON.parse(saved) : {};
        const entries = Object.entries(parsed);

        const detailedFavorites = {};
        for (const [gameId, meta] of entries) {
          const details = await getGameDetails(gameId);
          detailedFavorites[gameId] = { ...details, status: meta.status };
        }

        setFavorites(detailedFavorites);
      } catch (e) {
        setError("Failed to load favorites");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemove = (gameId) => {
    const confirmDelete = window.confirm("Are you sure you want to remove this game from your favorites?");
    if (confirmDelete) {
      const updatedFavorites = { ...favorites };
      delete updatedFavorites[gameId];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  const entries = Object.entries(favorites);

  return (
    <div className={styles.container}>
      <h1>My Favorites</h1>
      <LoadingErrorMessage
        loading={loading}
        error={error}
        noResults={!loading && !error && entries.length === 0}
      />
      {!loading && !error && entries.length > 0 && (
        <ul className={styles.list}>
          {entries.map(([gameId, game]) => (
            <li key={gameId} className={styles.item}>
              <div className={styles.cardWrapper}>
                <Link to={`/games/${gameId}`} className={styles.link}>
                  <GameCard game={game} />
                </Link>
                <div className={styles.cardFooter}>
                  <span className={styles.status}>
                    {game.status === "played" && "✅ Played"}
                    {game.status === "playing" && "🕹️ Playing"}
                    {game.status === "wishlist" && "📌 Want to Play"}
                  </span>
                  <button
                    className={styles.removeButton}
                    onClick={() => handleRemove(gameId)}
                  >
                    ❌
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesPage;