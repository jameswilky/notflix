import React, { useEffect, useState, Fragment } from "react";
import styles from "./Home.module.css";
import banner from "../../images/placeholder.jpg";
import Carousel from "../Carousel/Carousel";

/*
  embedding videos:
  https://gomakethings.com/how-to-play-a-video-in-full-screen-mode-when-its-thumbnail-is-clicked-with-vanilla-js/
*/

export default function Home(props) {
  return (
    <div className={styles.main}>
      <div className={styles.bannerContainer}>
        <img className={styles.banner} src={banner} alt="" />
      </div>
      <div className={styles.carouselContainer}>
        <Carousel key={1} {...props} />
      </div>
    </div>
  );
}
