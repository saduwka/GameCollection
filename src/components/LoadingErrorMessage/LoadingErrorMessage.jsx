import React from 'react';
import styles from './LoadingErrorMessage.module.css'; 

const LoadingErrorMessage = ({ loading, error, noResults }) => {
  if (loading) {
    return (
      <div className={styles.boxes}>
        <div className={styles.box}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div className={styles.box}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div className={styles.box}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div className={styles.box}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <p className={styles.message}>Error: {error}</p>;
  }

  if (noResults) {
    return <p className={styles.message}>No results found for your query.</p>;
  }

  return null;
};

export default LoadingErrorMessage;