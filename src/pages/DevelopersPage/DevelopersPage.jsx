import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDevelopers } from "../../services/developersServices";
import styles from "./DevelopersPage.module.css";
import DeveloperCard from "../../components/DeveloperCard/DeveloperCard";

function DeveloperPage() {
    const [developers, setDevelopers] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchDevelopers = async () => {
            const data = await getDevelopers(page);
            setDevelopers(Array.isArray(data.results) ? data.results : []);
        }

        fetchDevelopers();
    }, [page]);

    const handleNextPage = () => setPage(prev => prev + 1);
    const handlePrevPage = () => {
        if (page > 1) setPage(prev => prev - 1);
    };

    return (
        <div className={styles.developersPage}>
            <div className={styles.content}>
                <h1 className={styles.heading}>Developers</h1>
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
                <div className={styles.pagination}>
                    <button onClick={handlePrevPage} disabled={page === 1}>Previous</button>
                    <span>Page {page}</span>
                    <button onClick={handleNextPage}>Next</button>
                </div>
            </div>
        </div>
    );
}

export default DeveloperPage;