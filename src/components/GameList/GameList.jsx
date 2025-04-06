import React, { useContext } from "react";  
import { SearchContext } from "../../contexts/SearchContext";
import styles from "./GameList.module.css";
import LoadingErrorMessage from "../LoadingErrorMessage/LoadingErrorMessage"; 

const GameList = ({ onGameClick }) => {  
  const { filteredGames, loading, error } = useContext(SearchContext); 

  return (
    <div className={styles.gameList}>
      <LoadingErrorMessage 
        loading={loading} 
        error={error} 
        noResults={filteredGames.length === 0} 
      />

      {filteredGames.map((game, index) => (
        <div 
          key={game.id || index} 
          className={styles.gameCard} 
          onClick={() => onGameClick(game.id)}
        >
          <img
            src={game.background_image}
            alt={game.name}
            className={styles.gameCardImg}
          />
          <h3>{game.name}</h3>
          <p className={styles.gameCardRating}>Рейтинг: {game.rating || "N/A"}</p>
        </div>
      ))}
    </div>
  );
};

export default GameList;