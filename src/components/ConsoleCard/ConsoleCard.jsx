// src/components/ConsoleCard/ConsoleCard.jsx
import React from 'react';
import './ConsoleCard.module.css';

function ConsoleCard({ console }) {
  return (
    <div className="console-card">
      <h3>{console.name}</h3>
      <img src={console.imageUrl} alt={console.name} />
    </div>
  );
}

export default ConsoleCard;