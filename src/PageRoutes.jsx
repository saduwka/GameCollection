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
import LoginPage from "./pages/LoginPage/LoginPage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

const PageRoutes = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflow: "hidden"
        }}
      >
        <div style={{ display: "flex" }}>
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <div style={{ marginLeft: isSidebarOpen ? "220px" : "0", flex: 1 }}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <HomePage />
                  </PrivateRoute>
                }
              />

              <Route
                path="/consoles"
                element={
                  <PrivateRoute>
                    <ConsolesPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/consoles/:id"
                element={
                  <PrivateRoute>
                    <ConsolePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/games"
                element={
                  <PrivateRoute>
                    <GamesPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/games/:id"
                element={
                  <PrivateRoute>
                    <GamePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/creators"
                element={
                  <PrivateRoute>
                    <CreatorsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/creators/:id"
                element={
                  <PrivateRoute>
                    <CreatorPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/developers"
                element={
                  <PrivateRoute>
                    <DevelopersPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/developers/:id"
                element={
                  <PrivateRoute>
                    <DeveloperPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/genres"
                element={
                  <PrivateRoute>
                    <GenresPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/genres/:id"
                element={
                  <PrivateRoute>
                    <GenrePage />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<NotFoundPage />} />
              <Route
                path="/search"
                element={
                  <PrivateRoute>
                    <SearchPage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default PageRoutes;
