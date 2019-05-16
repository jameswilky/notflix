import React from "react";
import styles from "./Browser.module.css";
import Carousel from "../Carousel/Carousel";
import BrowserHeader from "./BrowserHeader";
import uuid from "uuid";

export default function Browser(props) {
  const { includeBanner, videosByGenre, videoType = false } = props;
  const BrowserBody = () => {
    return Object.keys(videosByGenre).map(genre => {
      let videos = videosByGenre[genre];

      // if type specified
      if (videoType) {
        // Only include videos of specified type
        videos = videosByGenre[genre].filter(video => {
          return video.type === videoType;
        });
      }

      //If there are videos of that type then return those videos
      if (videos.length > 0) {
        return (
          <Carousel genre={genre} videos={videos} key={uuid()} {...props} />
        );
      } else return null;
    });
  };

  return (
    <div className={styles.main}>
      {includeBanner ? <BrowserHeader /> : null}
      <div className={styles.carouselContainer}>{<BrowserBody />}</div>
    </div>
  );
}
