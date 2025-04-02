import React from "react";
import styles from "./ConsoleCard.module.css";

export default function ConsoleCard({ console: { name, image_background } }) {
  return (
    <div className={styles.consoleCard}>
      <h3>{name}</h3>
      <img src={image_background} alt={name} className={styles.consoleCardImg} />
    </div>
  );
}
