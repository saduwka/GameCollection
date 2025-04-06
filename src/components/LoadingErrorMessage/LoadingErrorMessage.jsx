import React from 'react';
import styles from './LoadingErrorMessage.module.css'; 

const LoadingErrorMessage = ({ loading, error, noResults }) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (noResults) {
    return <p>No results found for your query.</p>;
  }

  return null;
};

export default LoadingErrorMessage;