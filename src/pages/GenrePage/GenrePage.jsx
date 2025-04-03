import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getGenresDetails,
  getGamesForGenre
} from "../../services/genreServices";
import styles from "./GenrePage.module.css";

const GenrePage = () => {
  const { id } = useParams();
  const [genreDetails, setGenreDetails] = useState(null);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenreDetails = async () => {
      try {
        setLoading(true);
        const details = await getGenresDetails(id);
        setGenreDetails(details);
        const genreGames = await getGamesForGenre(id);
        setGames(genreGames);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchGenreDetails();
  }, [id]);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!genreDetails) {
    return <div className={styles.error}>Genres not found</div>;
  }

  return (
    <div className={styles.genrePage}>
      <h1>{genreDetails.name}</h1>
      <p>{genreDetails.description}</p>
      <h2>Games on {genreDetails.name}</h2>
      <div className={styles.gameList}>
        {games.map((game) => (
          <Link
            to={`/games/${game.id}`}
            key={game.id}
            className={styles.gameCardLink}
          >
            <div className={styles.gameCard}>
              <h3>{game.name}</h3>
              <img
                src={game.background_image}
                alt={game.name}
                className={styles.gameImage}
              />
              <p>{game.released}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GenrePage;
