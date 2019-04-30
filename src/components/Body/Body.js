import React, { useEffect, useState, Fragment } from "react";
import styles from "./Body.module.css";
import banner from "../../images/placeholder.jpg";
import Carousel from "../Carousel/Carousel";

/*
  embedding videos:
  https://gomakethings.com/how-to-play-a-video-in-full-screen-mode-when-its-thumbnail-is-clicked-with-vanilla-js/
*/

export default function Body() {
  const [videoIsClicked, setVideoIsClicked] = useState(false);
  // Listen for clicks
  useEffect(() => {
    const onMouseOver = document.addEventListener("mouseover", e => {}, false);

    const onMouseOut = document.addEventListener("mouseout", e => {});

    return () => document.removeEventListener("mouseover", onMouseOver);
  });

  return (
    <div className={styles.main}>
      <div className={styles.bannerContainer}>
        <img className={styles.banner} src={banner} alt="" />
      </div>

      <div className={styles.carouselContainer}>
        <Carousel />
        <Carousel />
        <Carousel />
        <Carousel />
        <Carousel />
        <Carousel />
        <Carousel />
        <Carousel />
      </div>
    </div>
  );
}
