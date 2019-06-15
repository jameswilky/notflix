import React, { useState } from "react";
import Video from "../Video/Video";
import styles from "./VideoPlayer.module.css";
import Overlay from "../Overlay/Overlay";

export default function VideoPlayer(props) {
  const { video, position, width, style = {}, type } = props;
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
    categories: video.genres,
    overview: video.overview
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
      style={style}
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
        /* Start loading youtube player and hide thumbnail*/
        setLoadPlayer(true);
        setShowThumbnail(false);

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
        /* If player is loaded, then pause when leaving slide and show thumbnail */
        playerLoading.then(player => {
          player.pauseVideo();
          setShowThumbnail(true);
        });

        document.documentElement.style.setProperty(
          "--slideTranslateMult",
          `-2`
        );
      }}
    >
      <Video
        id={videoId}
        setPlayer={setPlayer}
        load={loadPlayer}
        width={width}
      />
      {type === "slide" ? (
        <>
          <Overlay
            type={type}
            id={video._id}
            player={player}
            metaData={metaData}
          />
          <Thumbnail />
        </>
      ) : (
        <>
          {" "}
          <Thumbnail />
          <Overlay
            type={type}
            id={video._id}
            player={player}
            metaData={metaData}
          />
        </>
      )}
    </div>
  );
}
