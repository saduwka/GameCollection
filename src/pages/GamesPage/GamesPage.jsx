import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchGames } from "../../services/gameListServices";
import GameCard from "../../components/GameCard/GameCard";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./GamesPage.module.css";

function GamesPage() {
  const [games, setGames] = useState([]);
  const [filter, setFilter] = useState("random"); // "random", "popular", "rating"
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Текущая страница
  const [nextPageUrl, setNextPageUrl] = useState(null); // URL следующей страницы

  // Функция перемешивания массива
  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  // Функция сортировки по популярности (по количеству добавлений)
  const sortByPopularity = (array) => {
    return [...array].sort((a, b) => b.added - a.added);
  };

  // Функция сортировки по рейтингу
  const sortByRating = (array) => {
    return [...array].sort((a, b) => b.rating - a.rating);
  };

  useEffect(() => {
    const getGames = async () => {
      setLoading(true);
      const gamesData = await fetchGames(); // Берем `games` из `fetchGames()`
      let sortedGames = gamesData.games; // gamesData.games – массив игр

      if (filter === "popular") {
        sortedGames = sortByPopularity(sortedGames);
      } else if (filter === "rating") {
        sortedGames = sortByRating(sortedGames);
      } else {
        sortedGames = shuffleArray(sortedGames);
      }

      setGames(sortedGames);
      setLoading(false);
    };

    getGames();
  }, [filter]); // Обновляем список при изменении фильтра

  return (
    <div className={styles.gamesPage}>
      <Sidebar />
      <div className={styles.content}>
        <h1>Games List</h1>
        <div className={styles.pagination}>
          {currentPage > 1 && (
            <button onClick={() => setCurrentPage(currentPage - 1)}>
              Previous
            </button>
          )}
          {nextPageUrl && (
            <button onClick={() => setCurrentPage(currentPage + 1)}>
              Next
            </button>
          )}
        </div>
        <div className={styles.filters}>
          <button onClick={() => setFilter("random")}>Random</button>
          <button onClick={() => setFilter("popular")}>Popular</button>
          <button onClick={() => setFilter("rating")}>Rating</button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className={styles.gamesList}>
            {games.map((game) => (
              <div key={game.id} className={styles.gameCardContainer}>
                <Link to={`/games/${game.id}`}>
                  <GameCard game={game} />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default GamesPage;
