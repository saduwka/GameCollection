import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SearchContext } from "../../contexts/SearchContext";
import styles from "./Header.module.css";
import searchIcon from "../../assets/icons/search.png";
import favoritesIcon from "../../assets/icons/favorites.svg";
import logoutIcon from "../../assets/icons/logout.svg";

const Header = () => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useContext(SearchContext);
  const isAuthenticated = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSearchSubmit = () => {
    navigate(`/search?query=${searchQuery}`);
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.heading}>PlayHub</h1>
      <div className={styles.searchForm}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearchSubmit();
            }
          }}
          placeholder="Search games..."
          className={styles.searchInput}
        />
        <img
          src={searchIcon}
          alt="Search"
          onClick={handleSearchSubmit}
          className={styles.searchIcon}
        />
      </div>
      {isAuthenticated && (
        <div className={styles.userCard}>
          <Link to="/favorites" className={styles.favLink}>
            <img src={favoritesIcon} alt="Favorites" className={styles.favIcon}/>
            <span className={styles.favHeading}>Favorites</span>
          </Link>

          <span onClick={handleLogout} className={styles.logoutButton}>
            <img src={logoutIcon} alt="logout" className={styles.logoutIcon}/>
            Logout
          </span>
        </div>
      )}
    </header>
  );
};

export default Header;
