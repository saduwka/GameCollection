import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css";
import logo from "../../assets/logo/logo.svg";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <div className={styles.sidebar}>
        <ul>
          <li>
            <Link
              to="/consoles"
              className={`${styles.link} ${location.pathname === "/consoles" ? styles.activeLink : ""}`}
            >
              Platform
            </Link>
          </li>
          <li>
            <Link
              to="/games"
              className={`${styles.link} ${location.pathname === "/games" ? styles.activeLink : ""}`}
            >
              Games
            </Link>
          </li>
          <li>
            <Link
              to="/developers"
              className={`${styles.link} ${location.pathname === "/developers" ? styles.activeLink : ""}`}
            >
              Developers
            </Link>
          </li>
          <li>
            <Link
              to="/genres"
              className={`${styles.link} ${location.pathname === "/genres" ? styles.activeLink : ""}`}
            >
              Genres
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
