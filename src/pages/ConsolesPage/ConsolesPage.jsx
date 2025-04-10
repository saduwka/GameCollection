import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getConsoles } from "../../services/consolesServices";
import ConsoleCard from "../../components/ConsoleCard/ConsoleCard";
import styles from "./ConsolesPage.module.css";
import classNames from "classnames";

function ConsolesPage() {
  const [consoles, setConsoles] = useState([]);
  const [sortType, setSortType] = useState("alphabet");

  useEffect(() => {
    const fetchConsoles = async () => {
      const data = await getConsoles();
      setConsoles(data);
    };

    fetchConsoles();
  }, []);

  const handleSort = (type) => {
    setSortType(type);
  };

  const sortedConsoles = [...consoles].sort((a, b) => {
    if (sortType === "alphabet") {
      return a.name.localeCompare(b.name);
    } else if (sortType === "popularity") {
      return b.popularity - a.popularity;
    }
    return 0;
  });

  return (
    <div className={styles.consolesPage}>
      <div className={styles.content}>
        <h1 className={styles.heading}>Gaming Platforms</h1>

        <div className={styles.sortButtons}>
          <button
            onClick={() => handleSort("alphabet")}
            className={classNames(styles.sortButton, {
              [styles.active]: sortType === "alphabet",
            })}
          >
            A–Z
          </button>
          <button
            onClick={() => handleSort("popularity")}
            className={classNames(styles.sortButton, {
              [styles.active]: sortType === "popularity",
            })}
          >
            Popular
          </button>
        </div>

        <div className={styles.consoleList}>
          {sortedConsoles.map((console) => (
            <Link key={console.id} to={`/consoles/${console.id}`}>
              <ConsoleCard console={console} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ConsolesPage;