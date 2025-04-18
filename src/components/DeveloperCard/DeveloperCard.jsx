import React from "react";
import styles from "./DeveloperCard.module.css";

export default function DeveloperCard({
  developer: { name, image_background }
}) {
  return (
    <div className={styles.developerCard}>
      <img
        src={image_background}
        alt={name}
        className={styles.developerCardImg}
      />
      <div className={styles.description}>
        <h3>{name}</h3>
      </div>
    </div>
  );
}
