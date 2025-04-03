import React from "react";
import styles from "./GenreCard.module.css";

export default function GenreCard({ genre: { name, image_background } }) {
  return (
    <div className={styles.genreCard}>
      <h3>{name}</h3>
      <img src={image_background} alt={name} className={styles.genreCardImg} />
    </div>
  );
}
