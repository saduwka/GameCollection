import React from "react";
import styles from "./GameCard.module.css";

export default function GameCard({ game }) {
  if (!game || !game.name || !game.background_image) {
    return <div>Loading...</div>; // Показываем лоадер, если данных нет
  }

  return (
    <div className={styles.gameCard}>
      <h3>{game.name}</h3>
      <img
        src={game.background_image}
        alt={game.name}
        className={styles.gameCardImg}
      />
      <p className={styles.gameCardRating}>Рейтинг: {game.rating || "N/A"}</p>
    </div>
  );
}
