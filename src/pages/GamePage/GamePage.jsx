import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getGameDetails } from "../../services/gamesServices";
import styles from "./GamePage.module.css";

function GamePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gameDetails, setGameDetails] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchGameDetails = async () => {
      const data = await getGameDetails(id);
      setGameDetails(data);

      // Проверка на наличие сохранённого статуса в localStorage
      const saved = localStorage.getItem("favorites");
      const parsed = saved ? JSON.parse(saved) : {};
      if (parsed[id]) {
        setStatus(parsed[id].status);
      }
    };

    fetchGameDetails();
  }, [id]);

  const handleClick = (newStatus) => {
    const updatedStatus = status === newStatus ? "" : newStatus;
    setStatus(updatedStatus);

    // Сохранение статуса в localStorage
    const saved = localStorage.getItem("favorites");
    const parsed = saved ? JSON.parse(saved) : {};
    const updated = { ...parsed, [gameDetails.id]: { name: gameDetails.name, status: updatedStatus } };

    if (updatedStatus === "") {
      delete updated[gameDetails.id];
    }

    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  if (!gameDetails) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.gamePageContainer}>
      <button onClick={() => navigate(-1)} className={styles.backButton}>← Back</button>
      <h1 className={styles.gamePageHeader}>{gameDetails.name}</h1>
      <div className={styles.gamePageImageContainer}>
        <img
          className={styles.gamePageImage}
          src={gameDetails.background_image || gameDetails.image_background}
          alt={gameDetails.name}
        />
        <img className={styles.gamePageImage} src={gameDetails.background_image_additional} alt={gameDetails.name} />
      </div>
      <div className={styles.statusButtons}>
        <button
          className={status === "played" ? styles.active : ""}
          onClick={() => handleClick("played")}
        >
          ✅ Played
        </button>
        <button
          className={status === "playing" ? styles.active : ""}
          onClick={() => handleClick("playing")}
        >
          🕹️ Playing
        </button>
        <button
          className={status === "wishlist" ? styles.active : ""}
          onClick={() => handleClick("wishlist")}
        >
          📌 Want to Play
        </button>
      </div>
      <div className={styles.gamePageDetails}>
        <p>
          <strong>Release Date:</strong> {gameDetails.released}
        </p>
        <p>
          <strong>Rating:</strong> {gameDetails.rating}
        </p>
        <p>
          <strong>Metacritic:</strong> {gameDetails.metacritic || "N/A"}
        </p>
        <div>
          <strong>Description:</strong>
          <div
            dangerouslySetInnerHTML={{ __html: gameDetails.description }}
          />
        </div>
        <p>
          <strong>Platforms:</strong>{" "}
          {gameDetails.platforms && gameDetails.platforms.length > 0 ? (
            gameDetails.platforms.map((platformObj, index) => {
              const platformName = platformObj.platform.name;
              return (
                <span key={platformName}>
                  <a href={`/consoles/${platformObj.platform.id}`} className={styles.platformLink}>
                    {platformName}
                  </a>
                  {index < gameDetails.platforms.length - 1 && ", "}
                </span>
              );
            })
          ) : (
            "N/A"
          )}
        </p>
        {gameDetails.website && (
          <p>
            <strong>Website:</strong>
            <a
              href={gameDetails.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Website
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

export default GamePage;