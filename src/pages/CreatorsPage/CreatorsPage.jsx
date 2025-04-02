import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCreatorsDetails } from "../../services/creatorsServices";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./CreatorsPage.module.css";
import CreatorCard from "../../components/CreatorCard/CreatorCard";

function CreatorsPage() {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    const fetchCreators = async () => {
      const data = await getCreatorsDetails();
      console.log("Fetched creators data:", data);
      setCreators(Array.isArray(data.results) ? data.results : []);
    };

    fetchCreators();
  }, []);

  return (
    <div className={styles.creatorsPage}>
      <Sidebar />
      <div className={styles.content}>
        <h1>Creators</h1>
        <div className={styles.creatorsList}>
          {creators.map((creator) => (
            <Link key={creator.id} to={`/creators/${creator.id}`}>
              <CreatorCard creator={creator} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CreatorsPage;
