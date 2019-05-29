import React, { useState, useEffect } from "react";
import Video from "./Video";
import styles from "./Slide.module.css";
import Overlay from "./Overlay";

export default function Slide(props) {
  const { video } = props;
  const { videoId } = video;
  const [player, setPlayer] = useState();
  const [showThumbnail, setShowThumbnail] = useState(true);

  const [loadPlayer, setLoadPlayer] = useState(false);
  const playerLoading = new Promise(resolve => {
    if (player !== undefined) resolve(player);
  });

  const [metaData] = useState({
    title: video.title,
    match: `${video.vote_average * 10}% Match`, // use user score
    maturity: "M",
    length: "4 Seasons",
    categories: video.genres
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
        data-video={videoId}
        alt="Play this video"
        src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
      />
    );
  };

  return (
    <div
      className={styles.body}
      onClick={e => {
        /* allows user to start video once loaded*/
        playerLoading.then(player => {
          try {
            player.playVideo();
          } catch {}
        });
      }}
      onMouseEnter={e => {
        /* Start loading youtube player and hide thumbnail after animation is finished*/
        setLoadPlayer(true);
        setTimeout(() => setShowThumbnail(false), 400);
      }}
      onMouseOver={e => {
        /* After re-render, if mouse is hovering over the video once the player is loaded, it will play*/
        playerLoading.then(player => {
          player.playVideo();
        });
      }}
      onMouseLeave={e => {
        /* If player is loaded, then pause when leaving slide and show thumbnail after animation is finished*/
        playerLoading.then(player => {
          player.pauseVideo();
          setTimeout(() => setShowThumbnail(true), 400);
        });
      }}
    >
      <Video id={videoId} setPlayer={setPlayer} load={loadPlayer} />
      <Overlay id={video._id} player={player} metaData={metaData} />
      <Thumbnail />
    </div>
  );
}
