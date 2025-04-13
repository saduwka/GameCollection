import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    toggleSidebar();
    navigate("/login");
  };

  return (
    <div>
      <div className={styles.burgerIcon} onClick={toggleSidebar}>
        ☰
      </div>
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <ul>
          <li>
            <Link to="/" onClick={toggleSidebar}>Home</Link>
          </li>
          <li>
            <Link to="/consoles" onClick={toggleSidebar}>Platform</Link>
          </li>
          <li>
            <Link to="/games" onClick={toggleSidebar}>Games</Link>
          </li>
          <li>
            <Link to="/developers" onClick={toggleSidebar}>Developers</Link>
          </li>
          <li>
            <Link to="/genres" onClick={toggleSidebar}>Genres</Link>
          </li>
        </ul>
        <li>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        </li>
      </div>
    </div>
  );
};

export default Sidebar;
