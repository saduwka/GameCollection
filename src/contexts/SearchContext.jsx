import { createContext, useState, useEffect } from "react";
import { fetchGames } from "../services/searchServices";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadGames = async (searchQuery = "") => {
    setLoading(true);
    try {
      const allGames = await fetchGames(searchQuery);
      setGames(allGames);
      console.log("Loaded games:", allGames.length);
    } catch (err) {
      setError(err.message);
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debouncedSearchQuery) {
      loadGames(debouncedSearchQuery);
    }
  }, [debouncedSearchQuery]);

  console.log("Filtering by query:", debouncedSearchQuery, "Total games:", games.length);
  const filteredGames = games.filter(game => game.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()));

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500); 

    return () => clearTimeout(timer); 
  }, [searchQuery]);

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery, filteredGames, loading, error }}>
      {children}
    </SearchContext.Provider>
  );
};