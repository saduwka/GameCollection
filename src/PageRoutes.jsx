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
import GenresPage from "./pages/GenresPage/GenresPage";
import GenrePage from "./pages/GenrePage/GenrePage";
import SearchPage from "./pages/SearchPage/SearchPage"; 

const PageRoutes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Состояние для открытия/закрытия сайдбара

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Переключение состояния
  };

  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", marginTop: "60px" }}>
          {" "}
          {/* Отступ сверху для контента */}
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} /> {/* Передаем пропсы в Sidebar */}
          <div style={{ marginLeft: isSidebarOpen ? "220px" : "0", padding: "20px", flex: 1 }}>
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
              <Route path="/search" element={<SearchPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default PageRoutes;