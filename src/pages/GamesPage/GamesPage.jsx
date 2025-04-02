// src/pages/GamesPage/GamesPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchGames } from "../../services/gameListServices";
import GameCard from "../../components/GameCard/GameCard";
import Sidebar from "../../components/Sidebar/Sidebar"; // Импортируем Sidebar
import styles from "./GamesPage.module.css";

function GamesPage() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const getGames = async () => {
      const gamesData = await fetchGames();
      setGames(gamesData);
      console.log(gamesData); // Исправил ошибку (game -> gamesData)
    };

    getGames();
  }, []);

  return (
    <div className={styles.gamesPage}>
      <Sidebar /> {/* Добавил Sidebar */}
      <div className={styles.content}>
        <h1>Games List</h1>
        <div className={styles.gamesList}>
          {games.length === 0 ? (
            <p>Loading games...</p>
          ) : (
            games.map((game) => (
              <div key={game.id} className={styles.gameCardContainer}>
                <Link to={`/games/${game.id}`}>
                  <GameCard console={game} />
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default GamesPage;
