import React, { useState, useEffect } from "react";
import Video from "../Video/Video";
import styles from "./VideoPlayer.module.css";
import Overlay from "../Overlay/Overlay";

export default function VideoPlayer(props) {
  const { video, position, width, style = {}, type, autoplay = false } = props;
  const { videoId } = video;
  const [player, setPlayer] = useState();
  const [showThumbnail, setShowThumbnail] = useState(true);
  const [loadPlayer, setLoadPlayer] = useState(false);

  const [metaData] = useState({
    title: video.title,
    match: `${video.vote_average * 10}% Match`, // use user score
    maturity: "M",
    length: "4 Seasons",
    categories: video.genres,
    overview: video.overview
  });
  const thumbnailRef = React.useRef();

  const Thumbnail = () => {
    return (
      <img
        ref={thumbnailRef}
        className={`
        ${styles.thumbnail}
        `}
        data-video={videoId}
        alt="Play this video"
        src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
      />
    );
  };

  return (
    <div style={style} position={position} className={styles.body}>
      <Video
        id={videoId}
        setPlayer={setPlayer}
        load={loadPlayer}
        autoplay={autoplay}
        width={width}
      />
      <Thumbnail />
      <Overlay
        type={type}
        id={video._id}
        player={player}
        metaData={metaData}
        thumbnailRef={thumbnailRef}
        setShowThumbnail={setShowThumbnail}
        setLoadPlayer={setLoadPlayer}
        position={position}
        showThumbnail={showThumbnail}
      />
    </div>
  );
}
