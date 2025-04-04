import { createContext, useState, useEffect } from "react";

// Пример API URL
const API_URL = "https://api.rawg.io/api/games?key=97d7d537cfa34027be12ab4dfea87d96&page_size=100&search=";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery); // Добавляем для задержки
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Функция для загрузки игр с API
  const fetchGames = async (searchQuery = "") => {
    setLoading(true);
    try {
      const allGames = [];
      let nextUrl = `${API_URL}${searchQuery}`;

      while (nextUrl && allGames.length < 120) {
        const response = await fetch(nextUrl);
        if (!response.ok) {
          throw new Error("Ошибка загрузки данных");
        }

        const data = await response.json();
        console.log("API Response:", data);

        if (Array.isArray(data.results)) {
          allGames.push(...data.results);
          nextUrl = data.next;
        } else {
          throw new Error("Ответ от API не содержит массив игр");
        }
      }

      setGames(allGames);
      console.log("Загружено игр:", allGames.length);
    } catch (err) {
      setError(err.message);
      console.error("Ошибка:", err);
    } finally {
      setLoading(false);
    }
  };

  // Выполнение запроса при изменении debouncedSearchQuery
  useEffect(() => {
    if (debouncedSearchQuery) {
      fetchGames(debouncedSearchQuery);
    }
  }, [debouncedSearchQuery]);

  // Фильтрация игр по запросу
  console.log("Фильтруем по запросу:", debouncedSearchQuery, "Всего игр:", games.length);
  const filteredGames = games.filter(game => game.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()));

  // Обработчик для установки поиска с задержкой
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500); // Задержка в 500 мс

    return () => clearTimeout(timer); // Очистка таймера, если запросы будут быстро меняться
  }, [searchQuery]);

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery, filteredGames, loading, error }}>
      {children}
    </SearchContext.Provider>
  );
};