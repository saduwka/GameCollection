import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className={styles.homePage}>
      <h1>Welcome to Gaming Collection</h1>
    </div>
  );
}

export default HomePage;
