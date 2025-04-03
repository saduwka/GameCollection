import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDevelopers } from "../../services/developersServices";
import styles from "./DevelopersPage.module.css";
import DeveloperCard from "../../components/DeveloperCard/DeveloperCard";

function DeveloperPage() {
    const [developers, setDevelopers] = useState([]);

    useEffect(() => {
        const fetchDevelopers = async () => {
            const data = await getDevelopers();
            setDevelopers(Array.isArray(data.results) ? data.results : []);
        }

        fetchDevelopers();
    }, []);

    return (
        <div className={styles.developersPage}>
            <div className={styles.content}>
                <h1>Developers</h1>
                <div className={styles.developersList}>
                    {developers && developers.length > 0 ? (
                        developers.map((developer) => (
                            <Link key={developer.id} to={`/developers/${developer.id}`}>
                                <DeveloperCard developer={developer} />
                            </Link>
                        ))
                    ) : (
                        <p>No developers found</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DeveloperPage;