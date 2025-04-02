import React from "react";
import styles from "./GameCard.module.css";

export default function GameCard({ console: { name, background_image, rating } }) {
  return (
    <div className={styles.gameCard}>
      <h3>{name}</h3>
      <img src={background_image} alt={name} className={styles.gameCardImg} />
      <p className={styles.gameCardRating}>Рейтинг: {rating}</p>
    </div>
  );
}
