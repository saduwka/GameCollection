import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ConsolePage from "./pages/ConsolePage/ConsolePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import GamePage from "./pages/GamePage/GamePage";
import GamesPage from "./pages/GamesPage/GamesPage";
import ConsolesPage from "./pages/ConsolesPage/ConsolesPage";
import Sidebar from "./components/Sidebar/Sidebar";
import CreatorsPage from "./pages/CreatorsPage/CreatorsPage";
import CreatorPage from "./pages/CreatorPage/CreatorPage";
import DevelopersPage from "./pages/DevelopersPage/DevelopersPage";
import DeveloperPage from "./pages/DeveloperPage/DeveloperPage";
import Header from "./components/Header/Header"; // Импортируем компонент Header
import GenresPage from "./pages/GenresPage/GenresPage";
import GenrePage from "./pages/GenrePage/GenrePage";

const PageRoutes = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Логика фильтрации игр или других элементов на основе запроса
  };

  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Header onSearch={handleSearch} /> {/* Добавляем Header здесь */}
        <div style={{ display: "flex", marginTop: "60px" }}>
          {" "}
          {/* Отступ сверху для контента */}
          <Sidebar />
          <div style={{ marginLeft: "220px", padding: "20px", flex: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/consoles" element={<ConsolesPage />} />
              <Route path="/consoles/:id" element={<ConsolePage />} />
              <Route path="/games" element={<GamesPage />} />
              <Route path="/games/:id" element={<GamePage />} />
              <Route path="/creators" element={<CreatorsPage />} />
              <Route path="/creators/:id" element={<CreatorPage />} />
              <Route path="/developers" element={<DevelopersPage />} />
              <Route path="/developers/:id" element={<DeveloperPage />} />
              <Route path="/genres" element={<GenresPage />} />
              <Route path="/genres/:id" element={<GenrePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default PageRoutes;
