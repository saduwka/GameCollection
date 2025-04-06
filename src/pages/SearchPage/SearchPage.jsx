import React, { useContext } from "react";
import { SearchContext } from "../../contexts/SearchContext";
import GameList from "../../components/GameList/GameList";
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
        <h1>Results</h1>

        <div className={styles.searchForm}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for games..."
            className={styles.searchInput}
          />
        </div>

        <LoadingErrorMessage 
          loading={loading} 
          error={error} 
          noResults={!searchQuery || filteredGames.length === 0} 
        />
        
        {searchQuery && filteredGames.length > 0 && (
          <GameList 
            onGameClick={handleGameClick}  // Передаем функцию клика
          />
        )}
      </div>
    </div>
  );
};

export default SearchPage;