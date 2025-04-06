import React from "react";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div>
      <div className={styles.burgerIcon} onClick={toggleSidebar}>
        ☰
      </div>
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/consoles">Platform</Link>
          </li>
          <li>
            <Link to="/games">Games</Link>
          </li>
          <li>
            <Link to="/developers">Developers</Link>
          </li>
          <li>
            <Link to="/genres">Genres</Link>
          </li>
          <li>
            <Link to="/creators">Creators</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;