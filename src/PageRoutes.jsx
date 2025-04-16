import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
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
import { AnimatePresence } from "framer-motion";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import Header from "./components/Header/Header";  

const PageRoutes = () => {
const location = useLocation();
const isAuthenticated = !!localStorage.getItem("token");
return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden"
      }}
    >
      {isAuthenticated && <Header />}
      <div style={{ display: "flex" }}>
        {isAuthenticated && <Sidebar />}
        <div style={{ marginLeft: isAuthenticated ? "220px" : "0", flex: 1 }}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
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
              <Route
                path="/favorites"
                element={
                  <PrivateRoute>
                    <FavoritesPage />
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
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default PageRoutes;
