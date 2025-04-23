import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDevelopers } from "../../services/developersServices";
import styles from "./DevelopersPage.module.css";
import DeveloperCard from "../../components/DeveloperCard/DeveloperCard";
import LoadingErrorMessage from "../../components/LoadingErrorMessage/LoadingErrorMessage";

function DeveloperPage() {
    const [developers, setDevelopers] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const fetchDevelopers = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getDevelopers(page);
                setDevelopers(Array.isArray(data.results) ? data.results : []);
                setHasMore(data.next !== null);
            } catch (err) {
                setError(err.message || "Failed to fetch developers");
            } finally {
                setLoading(false);
            }
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
                <LoadingErrorMessage 
                    loading={loading} 
                    error={error} 
                    noResults={developers.length === 0}
                />
                {!loading && (
                    <>
                        
                        <div className={styles.developersList}>
                            {developers && developers.length > 0 &&
                                developers.map((developer) => (
                                    <Link key={developer.id} to={`/developers/${developer.id}`}>
                                        <DeveloperCard developer={developer} />
                                    </Link>
                                ))
                            }
                        </div>
                        <div className={styles.pagination}>
                            <button onClick={handlePrevPage} disabled={page === 1}>Previous</button>
                            <span>Page {page}</span>
                            {hasMore && (
                              <button onClick={handleNextPage}>Next</button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default DeveloperPage;