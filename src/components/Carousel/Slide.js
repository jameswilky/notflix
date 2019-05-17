import React, { useState, useEffect } from "react";
import Video from "./Video";
import styles from "./Slide.module.css";
import Overlay from "./Overlay";

export default function Slide(props) {
  const { video } = props;
  const { id } = video;
  const [player, setPlayer] = useState();
  const [showThumbnail, setShowThumbnail] = useState(true);

  // This is used to only load videos after a hover
  // Improve performance, but requires clicking video to start playing
  const [loadPlayer, setLoadPlayer] = useState(false);

  const playerLoading = new Promise(resolve => {
    if (player !== undefined) resolve(player);
  });

  const [metaData] = useState({
    title: "Top Gear",
    match: "94% match", // use user score
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
        src={`https://img.youtube.com/vi/${id}/0.jpg`}
      />
    );
  };

  return (
    <div
      className={styles.body}
      onClick={e => {
        playerLoading.then(player => {
          // Fixes issue with having to mouse over again to play a vidoe that was
          // hovered over before it was loaded
          try {
            player.playVideo();
            setTimeout(() => setShowThumbnail(false), 300);
          } catch {}
        });
      }}
      onMouseEnter={e => {
        setLoadPlayer(true);
        playerLoading.then(player => {
          // this will prevent overlay from working untill the player has actually loaded
          player.playVideo();
          setTimeout(() => setShowThumbnail(false), 300);
        });
      }}
      onMouseLeave={e => {
        playerLoading.then(player => {
          player.pauseVideo();
          setTimeout(() => setShowThumbnail(true), 300);
        });
      }}
    >
      <Video id={id} setPlayer={setPlayer} load={loadPlayer} />
      <Overlay id={id} player={player} metaData={metaData} />
      <Thumbnail />
    </div>
  );
}
