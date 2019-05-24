import React, { useState, useEffect } from "react";
import Video from "./Video";
import styles from "./Slide.module.css";
import Overlay from "./Overlay";

export default function Slide(props) {
  const { video } = props;
  const { videoId } = video;
  const [player, setPlayer] = useState();
  const [showThumbnail, setShowThumbnail] = useState(true);
  // This is used to only load videos after a hover
  // SIGNIFICANTLY Improve performance, but requires clicking video to start playing
  // potential solution: store all players in a context, Add side effec to pause all players when not hovering on any videos

  const [loadPlayer, setLoadPlayer] = useState(false);

  const playerLoading = new Promise(resolve => {
    if (player !== undefined) resolve(player);
  });

  const [metaData] = useState({
    title: video.title,
    match: `${video.vote_average * 10}% Match`, // use user score
    maturity: "M",
    length: "4 Seasons",
    categories: ["test"]
    // categories: video.genres.map(genre => {
    //   genre;
    // })
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
      <Video id={videoId} setPlayer={setPlayer} load={loadPlayer} />
      <Overlay id={video._id} player={player} metaData={metaData} />
      <Thumbnail />
    </div>
  );
}
