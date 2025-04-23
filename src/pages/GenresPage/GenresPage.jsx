import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getGenres } from "../../services/genreServices";
import styles from "./GenresPage.module.css";
import GenreCard from "../../components/GenreCard/GenreCard";
import LoadingErrorMessage from "../../components/LoadingErrorMessage/LoadingErrorMessage";

function GenresPage() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getGenres();
        setGenres(Array.isArray(data.results) ? data.results : []);
      } catch (err) {
        setError("Failed to fetch genres");
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  return (
    <div className={styles.genresPage}>
      <div className={styles.content}>
        <h1 className={styles.heading}>Genres</h1>
        <LoadingErrorMessage
          loading={loading}
          error={error}
          noResults={!loading && !error && genres.length === 0}
        />
        {!loading && !error && genres.length > 0 && (
          <div className={styles.genresList}>
            {genres.map((genre) => (
              <Link key={genre.id} to={`/genres/${genre.id}`}>
                <GenreCard genre={genre} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default GenresPage;
