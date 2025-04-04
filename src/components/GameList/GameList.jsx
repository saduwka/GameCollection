import React, { useContext } from "react";
import { SearchContext } from "../../contexts/SearchContext"; // Импортируем контекст для получения фильтрованных игр
import styles from "./GameList.module.css";


const GameList = () => {
  const { filteredGames, loading, error } = useContext(SearchContext); // Извлекаем необходимые данные из контекста

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  if (filteredGames.length === 0) {
    return <p>Not found.</p>;
  }

  return (
    <div className={styles.gameList}>
      {filteredGames.map((game) => (
        <div className={styles.gameCard}>
        <img
          src={game.background_image}
          alt={game.name}
          className={styles.gameCardImg}
        />
        <h3>{game.name}</h3>
        <p className={styles.gameCardRating}>Рейтинг: {game.rating || "N/A"}</p>
      </div>
      ))}
    </div>
  );
};

export default GameList;