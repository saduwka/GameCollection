import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import styles from "./HomePage.module.css";
import GameCard from "../../components/GameCard/GameCard";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import game1 from "../../assets/banners/game1.png";
import game2 from "../../assets/banners/game2.png";
import game3 from "../../assets/banners/game3.png";
import { fetchGames } from "../../services/gameListServices";

function HomePage() {
  const navigate = useNavigate();

  const images = [game1, game2, game3];
  const [games, setGames] = useState([]);

  useEffect(() => {
    const loadGames = async () => {
      const { games } = await fetchGames(1);
      setGames(games.slice(0, 5)); // первые 5 игр
    };
    loadGames();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false
  };

  return (
    <div className={styles.carouselFullWidth}>
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index}>
            <img
              src={src}
              alt={`Game ${index + 1}`}
              className={styles.carouselImage}
            />
          </div>
        ))}
      </Slider>
      <div className={styles.tranding}>
        <h1>Tranding games</h1>
        <div className={styles.gameCards}>
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
