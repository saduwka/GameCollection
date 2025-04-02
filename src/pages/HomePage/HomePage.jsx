// src/pages/HomePage/HomePage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getConsoles } from '../../services/consolesServices';
import ConsoleCard from '../../components/ConsoleCard/ConsoleCard';

function HomePage() {
  const [consoles, setConsoles] = useState([]);

  useEffect(() => {
    const fetchConsoles = async () => {
      const data = await getConsoles();
      setConsoles(data);
    };

    fetchConsoles();
  }, []);

  return (
    <div className="home-page">
      <h1>Welcome to Retro Gaming Collection</h1>
      <div className="console-list">
        {consoles.map((console) => (
          <Link key={console.id} to={`/console/${console.id}`}>
            <ConsoleCard console={console} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;