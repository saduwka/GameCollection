import React, { useContext } from "react";
import { SearchContext } from "../../contexts/SearchContext";
import GameCard from "../../components/GameCard/GameCard";
import styles from "./SearchPage.module.css";
import { useNavigate } from "react-router-dom";
import LoadingErrorMessage from "../../components/LoadingErrorMessage/LoadingErrorMessage";

const SearchPage = () => {
  const {
    searchQuery,
    filteredGames,
    loading,
    error
  } = useContext(SearchContext);

  const navigate = useNavigate();

  const handleGameClick = (gameId) => {
    navigate(`/games/${gameId}`);
  };

  return (
    <div className={styles.searchPage}>
      <div className={styles.content}>
        <h1 className={styles.heading}>Results</h1>

        <LoadingErrorMessage 
          loading={loading} 
          error={error} 
          noResults={filteredGames.length === 0 && !loading} 
        />

        {!loading && !error && filteredGames.length > 0 && (
          <div className={styles.gameList}>
          {filteredGames.map((game) => (
            <div key={game.id} onClick={() => handleGameClick(game.id)}>
              <GameCard game={game} />
            </div>
          ))}
        </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;