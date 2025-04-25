import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getGameDetails } from "../../services/gamesServices";
import LoadingErrorMessage from "../../components/LoadingErrorMessage/LoadingErrorMessage";
import styles from "./GamePage.module.css";

function GamePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gameDetails, setGameDetails] = useState(null);
  const [status, setStatus] = useState("");
  const [modalIndex, setModalIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageAnimationKey, setImageAnimationKey] = useState(0);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        setLoading(true);
        const data = await getGameDetails(id);
        setGameDetails(data);
        setLoading(false);

        const saved = localStorage.getItem("favorites");
        const parsed = saved ? JSON.parse(saved) : {};
        if (parsed[id]) {
          setStatus(parsed[id].status);
        }
      } catch (error) {
        setError("Failed to fetch game details");
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  const handleClick = (newStatus) => {
    const images = [
      gameDetails.background_image || gameDetails.image_background,
      gameDetails.background_image_additional
    ];
    const updatedStatus = status === newStatus ? "" : newStatus;
    setStatus(updatedStatus);

    const saved = localStorage.getItem("favorites");
    const parsed = saved ? JSON.parse(saved) : {};
    const updated = {
      ...parsed,
      [gameDetails.id]: { name: gameDetails.name, status: updatedStatus }
    };

    if (updatedStatus === "") {
      delete updated[gameDetails.id];
    }

    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const images = [
    gameDetails?.background_image || gameDetails?.image_background,
    gameDetails?.background_image_additional
  ];
  return (
    <>
      <LoadingErrorMessage
        loading={loading}
        error={error}
        noResults={!loading && !error && !gameDetails}
      />
      {!loading && !error && gameDetails && (
        <div className={styles.gamePageContainer}>
          <button onClick={() => navigate(-1)} className={styles.backButton}>
            ← Back
          </button>
          <h1 className={styles.gamePageHeader}>{gameDetails.name}</h1>
          <div className={styles.gameWrapper}>
            <div className={styles.gameImgWrapper}>
              <div className={styles.gamePageImageContainer}>
                <img
                  className={styles.gamePageImage}
                  src={
                    gameDetails.background_image || gameDetails.image_background
                  }
                  alt={gameDetails.name}
                  onClick={() => setModalIndex(0)}
                />
                <img
                  className={styles.gamePageImage}
                  src={gameDetails.background_image_additional}
                  alt={gameDetails.name}
                  onClick={() => setModalIndex(1)}
                />
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
                <div className={styles.description}
                  dangerouslySetInnerHTML={{ __html: gameDetails.description }}
                />
              </div>
              <p>
                <strong>Platforms:</strong>{" "}
                {gameDetails.platforms && gameDetails.platforms.length > 0
                  ? gameDetails.platforms.map((platformObj, index) => {
                      const platformName = platformObj.platform.name;
                      return (
                        <span key={platformName}>
                          <a
                            href={`/consoles/${platformObj.platform.id}`}
                            className={styles.platformLink}
                          >
                            {platformName}
                          </a>
                          {index < gameDetails.platforms.length - 1 && ", "}
                        </span>
                      );
                    })
                  : "N/A"}
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
          {modalIndex !== null && (
            <div
              className={styles.modalOverlay}
              onClick={() => setModalIndex(null)}
            >
              <div
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className={styles.modalNavButton}
                  onClick={() => {
                    setModalIndex((prev) => (prev - 1 + images.length) % images.length);
                    setImageAnimationKey((prev) => prev + 1);
                  }}
                >
                  ‹
                </button>
                <img
                  key={imageAnimationKey}
                  src={images[modalIndex]}
                  alt="Game Fullscreen"
                  className={`${styles.modalImage} ${styles.modalImageAnimated}`}
                />
                <button
                  className={styles.modalNavButton}
                  onClick={() => {
                    setModalIndex((prev) => (prev + 1) % images.length);
                    setImageAnimationKey((prev) => prev + 1);
                  }}
                >
                  ›
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default GamePage;
