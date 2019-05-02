import React, { useState, useEffect, Fragment } from "react";
import Video from "./Video";
import styles from "./Slide.module.css";
import Overlay from "./Overlay";

export default function Slide(props) {
  const { id } = props;
  const [player, setPlayer] = useState();
  const [showThumbnail, setShowThumbnail] = useState(true);

  const playerLoading = new Promise(resolve => {
    if (player != null) resolve(player);
  });

  const [metaData, setMetaData] = useState({
    title: "Top Gear",
    match: "94% match",
    maturity: "M",
    length: "4 Seasons",
    categories: ["Action", "Comedy", "Documentary"]
  });

  const Thumbnail = () => {
    return (
      <img
        className={`
        ${styles.thumbnail}
        
        `}
        style={{
          visibility: showThumbnail ? "visible" : "hidden"
        }}
        data-video={id}
        alt="Play this video"
        src={`http://img.youtube.com/vi/${id}/0.jpg`}
      />
    );
  };

  return (
    <div
      className={styles.body}
      onMouseEnter={e => {
        playerLoading.then(player => {
          player.playVideo();
          setTimeout(() => setShowThumbnail(false), 450);
        });
      }}
      onMouseLeave={e => {
        playerLoading.then(player => {
          player.pauseVideo();
          setShowThumbnail(true);
        });
      }}
    >
      <Video id={id} player={player} setPlayer={setPlayer} />
      <Overlay id={id} player={player} metaData={metaData} />
      <Thumbnail />
    </div>
  );
}
