import React from "react";
import styles from "./ConsoleCard.module.css";

function ConsoleCard({ console }) {
  return (
    <div className={styles.consoleCard}>
      <h3>{console.name}</h3>
      <img
        src={console.image_background}
        alt={console.name}
        className={styles.consoleCardImg}
      />
    </div>
  );
}

export default ConsoleCard;
