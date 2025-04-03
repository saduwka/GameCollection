import React from "react";
import styles from "./ConsoleCard.module.css";

export default function ConsoleCard({ console: { name, image_background } }) {
  return (
    <div className={styles.consoleCard}>
      <div className={styles.screenContainer}>
        <img
          src={image_background}
          alt={name}
          className={styles.consoleCardImg}
        />
      </div>
      <h3>{name}</h3>
      <div className={styles.buttons}>
        <div className={styles.dPad}></div>
        <div className={styles.buttonsAB}>
          <div className={styles.buttonA}></div>
          <div className={styles.buttonB}></div>
        </div>
      </div>
    </div>
  );
}
