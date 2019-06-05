import React, { useState, useEffect } from "react";
import Video from "./Video";
import styles from "./Slide2.module.css";
import Overlay from "./Overlay";

export default function Slide(props) {
  const { video, position } = props;
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
      position={position}
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

        /* Will push items to left further when hovering on last item*/
        if (position === "last") {
          document.documentElement.style.setProperty(
            "--slideTranslateMult",
            `-1`
          );
        }
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

        document.documentElement.style.setProperty(
          "--slideTranslateMult",
          `-2`
        );
      }}
    >
      <Video id={videoId} setPlayer={setPlayer} load={loadPlayer} />
      <Overlay id={video._id} player={player} metaData={metaData} />
      <Thumbnail />
    </div>
  );
}
