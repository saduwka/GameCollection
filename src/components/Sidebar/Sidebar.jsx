import React from "react";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <h3>Gaming Collection</h3>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/consoles">Consoles</Link>
        </li>
        <li>
          <Link to="/games">Games</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
