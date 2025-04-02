// src/pages/ConsolesPage/ConsolesPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getConsoles } from "../../services/consolesServices";
import Sidebar from "../../components/Sidebar/Sidebar";
import ConsoleCard from "../../components/ConsoleCard/ConsoleCard";
import styles from "./ConsolesPage.module.css";

function ConsolesPage() {
  const [consoles, setConsoles] = useState([]);

  useEffect(() => {
    const fetchConsoles = async () => {
      const data = await getConsoles();
      setConsoles(data);
    };

    fetchConsoles();
  }, []);

  return (
    <div className={styles.consolesPage}>
      <Sidebar />
      <div className={styles.content}>
        <h1>Gaming Platforms</h1>
        <div className={styles.consoleList}>
          {consoles.map((console) => (
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
