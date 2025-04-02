import React from "react";
import styles from "./CreatorCard.module.css";

export default function CreatorCard({ creator: { name, image } }) {
  return (
    <div className={styles.creatorCard}>
      <h3>{name}</h3>
      <img src={image} alt={name} className={styles.creatorCardImg} />
    </div>
  );
}