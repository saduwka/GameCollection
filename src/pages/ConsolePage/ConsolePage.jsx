import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getConsoleDetails } from '../../services/consolesService'; // Сервис для получения данных о консоли

function ConsolePage() {
  const { id } = useParams();
  const [consoleDetails, setConsoleDetails] = useState(null);

  useEffect(() => {
    const fetchConsoleDetails = async () => {
      const data = await getConsoleDetails(id);
      setConsoleDetails(data);
    };

    fetchConsoleDetails();
  }, [id]);

  if (!consoleDetails) return <div>Loading...</div>;

  return (
    <div className="console-page">
      <h1>{consoleDetails.name}</h1>
      <img src={consoleDetails.imageUrl} alt={consoleDetails.name} />
      <p>{consoleDetails.description}</p>
    </div>
  );
}

export default ConsolePage;