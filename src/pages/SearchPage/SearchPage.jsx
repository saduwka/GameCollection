import React, { useContext, useState, useEffect } from "react";
import { SearchContext } from "../../contexts/SearchContext";
import GameList from "../../components/GameList/GameList";
import styles from "./SearchPage.module.css";
import { useLocation } from "react-router-dom";

const SearchPage = () => {
  const { searchQuery: initialSearchQuery, setSearchQuery, filteredGames, loading, error } =
    useContext(SearchContext);

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const urlSearchQuery = params.get("query");

  const [searchQuery, setSearchInput] = useState(urlSearchQuery || initialSearchQuery);

  useEffect(() => {
    setSearchQuery(searchQuery);
  }, [searchQuery, setSearchQuery]);

  useEffect(() => {
    setSearchInput(urlSearchQuery || initialSearchQuery);
  }, [urlSearchQuery, initialSearchQuery]);

  return (
    <div className={styles.searchPage}>
      <div className={styles.content}>
        <h1>Results</h1>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchInput(e.target.value)} 
          placeholder="Search for games..."
        />

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        {searchQuery && filteredGames.length > 0 ? (
          <GameList games={filteredGames} />
        ) : (
          <p>No results found for your query.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;