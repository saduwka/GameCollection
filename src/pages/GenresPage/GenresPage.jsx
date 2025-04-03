import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getGenres } from "../../services/genreServices";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./GenresPage.module.css";
import GenreCard from "../../components/GenreCard/GenreCard";

function GenresPage() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const data = await getGenres();
      setGenres(Array.isArray(data.results) ? data.results : []);
    };

    fetchGenres();
  }, []);

  return (
    <div className={styles.genresPage}>
      <Sidebar />
      <div className={styles.content}>
        <h1>Genres</h1>
        <div className={styles.genresList}>
          {genres && genres.length > 0 ? (
            genres.map((genre) => (
              <Link key={genre.id} to={`/genres/${genre.id}`}>
                <GenreCard genre={genre} />
              </Link>
            ))
          ) : (
            <p>No genres found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default GenresPage;
