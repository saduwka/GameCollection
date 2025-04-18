import React from "react";
import styles from "./GameCard.module.css";

export default function GameCard({ game }) {
  if (!game || !game.name || !game.background_image) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.gameCard}>
      <img
        src={game.background_image}
        alt={game.name}
        className={styles.gameCardImg}
      />
      <div className={styles.description}>
        <h3 className={styles.heading}>{game.name}</h3>
        <p className={styles.gameCardRating}>Rating: {game.rating || "N/A"}</p>
      </div>
    </div>
  );
}
