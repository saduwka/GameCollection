import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getConsoles } from "../../services/consolesServices";
import ConsoleCard from "../../components/ConsoleCard/ConsoleCard";
import LoadingErrorMessage from "../../components/LoadingErrorMessage/LoadingErrorMessage";
import styles from "./ConsolesPage.module.css";
import classNames from "classnames";

function ConsolesPage() {
  const [consoles, setConsoles] = useState([]);
  const [sortType, setSortType] = useState("alphabet");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConsoles = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getConsoles();
        setConsoles(data);
      } catch (err) {
        setError(err.message || "Failed to fetch consoles");
      } finally {
        setLoading(false);
      }
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

        {!loading && (
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
        )}

        <LoadingErrorMessage
          loading={loading}
          error={error}
          noResults={consoles.length === 0}
        />

        {(!loading && !error && consoles.length > 0) && (
          <div className={styles.consoleList}>
            {sortedConsoles.map((console) => (
              <Link key={console.id} to={`/consoles/${console.id}`}>
                <ConsoleCard console={console} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ConsolesPage;