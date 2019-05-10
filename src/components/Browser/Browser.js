import React, { useEffect, useState } from "react";
import styles from "./Browser.module.css";
import Carousel from "../Carousel/Carousel";
import Utilities from "../../Utilities";
import BrowserHeader from "./BrowserHeader";
import uuid from "uuid";

export default function Browser(props) {
  const { includeHeader = false, videosByGenre } = props;

  return (
    <div className={styles.main}>
      {includeHeader ? <BrowserHeader /> : null}
      <div className={styles.carouselContainer}>
        {Object.keys(videosByGenre).map(genre => {
          return (
            <Carousel
              genre={genre}
              videos={videosByGenre[genre]}
              key={uuid()}
              {...props}
            />
          );
        })}
      </div>
    </div>
  );
}
