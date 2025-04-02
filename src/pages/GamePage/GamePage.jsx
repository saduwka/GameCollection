import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGameDetails } from '../../services/gamesService'; // Сервис для получения данных об игре

function GamePage() {
  const { id } = useParams();
  const [gameDetails, setGameDetails] = useState(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      const data = await getGameDetails(id);
      setGameDetails(data);
    };

    fetchGameDetails();
  }, [id]);

  if (!gameDetails) return <div>Loading...</div>;

  return (
    <div className="game-page">
      <h1>{gameDetails.name}</h1>
      <img src={gameDetails.imageUrl} alt={gameDetails.name} />
      <p>{gameDetails.description}</p>
    </div>
  );
}

export default GamePage;