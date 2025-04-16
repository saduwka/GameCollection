import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./FavoritesPage.module.css";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    const parsed = saved ? JSON.parse(saved) : {};
    setFavorites(parsed);
  }, []);

  const handleRemove = (gameId) => {
    const updatedFavorites = { ...favorites };
    delete updatedFavorites[gameId];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const entries = Object.entries(favorites);

  if (entries.length === 0) {
    return <div className={styles.empty}>You haven't added any games yet</div>;
  }

  return (
    <div className={styles.container}>
      <h1>My Favorites</h1>
      <ul className={styles.list}>
        {entries.map(([gameId, { name, status }]) => (
          <li key={gameId} className={styles.item}>
            <Link to={`/games/${gameId}`} className={styles.link}>{name}</Link>
            <div>
            <span className={styles.status}>
              {status === "played" && "✅ Played"}
              {status === "playing" && "🕹️ Playing"}
              {status === "wishlist" && "📌 Want to Play"}
            </span>
            <button
              className={styles.removeButton}
              onClick={() => handleRemove(gameId)}
            >
              ❌ Remove
            </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesPage;