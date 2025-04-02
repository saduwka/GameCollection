import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchGames } from "../../services/gameListServices";
import GameCard from "../../components/GameCard/GameCard";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./GamesPage.module.css";

function GamesPage() {
  const [games, setGames] = useState([]);
  const [filter, setFilter] = useState("random"); // фильтр: "random", "popular" или "rating"

  // Функция перемешивания массива
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Функция сортировки по популярности (предполагаем, что у игры есть рейтинг или просмотры)
  const sortByPopularity = (array) => {
    return array.sort((a, b) => b.popularity - a.popularity); // сортировка по убыванию
  };

  // Функция сортировки по рейтингу
  const sortByRating = (array) => {
    return array.sort((a, b) => b.rating - a.rating); // сортировка по убыванию рейтинга
  };

  useEffect(() => {
    const getGames = async () => {
      const gamesData = await fetchGames();
      if (filter === "popular") {
        setGames(sortByPopularity(gamesData));
      } else if (filter === "rating") {
        setGames(sortByRating(gamesData));
      } else {
        setGames(shuffleArray(gamesData));
      }
    };

    getGames();
  }, [filter]); // следим за изменением фильтра

  return (
    <div className={styles.gamesPage}>
      <Sidebar />
      <div className={styles.content}>
        <h1>Games List</h1>
        <div className={styles.filters}>
          <button onClick={() => setFilter("random")}>Random</button>
          <button onClick={() => setFilter("popular")}>Popular</button>
          <button onClick={() => setFilter("rating")}>Rating</button>
        </div>
        <div className={styles.gamesList}>
          {games.map((game) => (
            <div key={game.id} className={styles.gameCardContainer}>
              <Link to={`/games/${game.id}`}>
                <GameCard console={{ ...game, rating: game.rating }} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GamesPage;