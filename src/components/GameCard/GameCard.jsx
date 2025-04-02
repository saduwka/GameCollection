import React from "react";
import styles from "./GameCard.module.css";

function GameCard({ console }) {
  return (
    <div className={styles.gameCard}>
      <h3>{console.name}</h3>
      <img
        src={console.background_image}
        alt={console.name}
        className={styles.gameCardImg}
      />
    </div>
  );
}

export default GameCard;
