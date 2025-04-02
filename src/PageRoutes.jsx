// src/PageRoutes.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ConsolePage from "./pages/ConsolePage/ConsolePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import GamePage from "./pages/GamePage/GamePage";
import GamesPage from "./pages/GamesPage/GamesPage";
import ConsolesPage from "./pages/ConsolesPage/ConsolesPage";
import Sidebar from "./components/Sidebar/Sidebar";

const PageRoutes = () => {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />{" "}
        {/* Сайдбар фиксированный, он будет виден на всех страницах */}
        <div style={{ marginLeft: "220px", padding: "20px", flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/consoles" element={<ConsolesPage />} />
            <Route path="/consoles/:id" element={<ConsolePage />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/games/:id" element={<GamePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default PageRoutes;
