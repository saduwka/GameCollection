import React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import styles from "./HomePage.module.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import game1 from "../../assets/banners/game1.png";
import game2 from "../../assets/banners/game2.png";
import game3 from "../../assets/banners/game3.png";

function HomePage() {
  const navigate = useNavigate();

  const images = [game1, game2, game3];

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
    </div>
  );
}

export default HomePage;
