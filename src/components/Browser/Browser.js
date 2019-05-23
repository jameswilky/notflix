import React, { useContext } from "react";
import styles from "./Browser.module.css";
import Carousel from "../Carousel/Carousel";
import BrowserHeader from "./BrowserHeader";
import uuid from "uuid";
import Loading from "../Loading/Loading";
import { VideoContext } from "../../contexts/VideoContext";

export default function Browser(props) {
  const { includeBanner, videoType = false } = props;
  const { videosLoaded, videosByGenre } = useContext(VideoContext);

  console.log(videosByGenre);
  const BrowserBody = () => {
    return videosLoaded ? (
      videosByGenre.map(items => {
        const genre = Object.keys(items)[0];
        let videos = Object.values(items)[0];
        //if type specified
        console.log(items[genre]);
        if (videoType) {
          // Only include videos of specified type
          videos = items[genre].filter(video => {
            return video.type === videoType;
          });
        }
        if (videos.length > 5) {
          return (
            <Carousel genre={genre} videos={videos} key={uuid()} {...props} />
          );
        } else return null;
      })
    ) : (
      <Loading />
    );
  };

  return (
    <div className={styles.main}>
      {includeBanner ? <BrowserHeader /> : null}
      <div className={styles.carouselContainer}>{<BrowserBody />}</div>
    </div>
  );
}
