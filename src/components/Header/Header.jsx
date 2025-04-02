import React, { useState } from "react";
import styles from "./Header.module.css";

const Header = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <header className={styles.header}>
      <h1>Gaming Collection</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
        className={styles.searchInput}
      />
    </header>
  );
};

export default Header;
