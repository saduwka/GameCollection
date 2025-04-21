import React, { useContext } from "react";
import { SearchContext } from "../../contexts/SearchContext";
import GameCard from "../../components/GameCard/GameCard"; // Импортируем GameCard
import styles from "./SearchPage.module.css";
import { useNavigate } from "react-router-dom";
import LoadingErrorMessage from "../../components/LoadingErrorMessage/LoadingErrorMessage";  // Новый компонент

const SearchPage = () => {
  const {
    searchQuery,
    setSearchQuery,
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
          noResults={!searchQuery || filteredGames.length === 0} 
        />
        
        {searchQuery && filteredGames.length > 0 && (
          <div className={styles.gameList}>
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;