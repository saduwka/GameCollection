import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";
import logo from "../../assets/logo/logo.svg";

const Sidebar = () => {
  const navigate = useNavigate();
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
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
