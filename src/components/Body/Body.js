import React from "react";
import styles from "./Body.module.css";
import banner from "../../images/placeholder.jpg";
import Carousel from "../Carousel/Carousel";

export default function Body() {
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
