import React, { useState } from "react";
import Youtube from "react-youtube";
import styles from "./Video.module.css";

export default function Video(props) {
  const { id, player, setPlayer } = props;

  const options = {
    height: "140",
    width: "250",
    playerVars: {
      // autoplay: 1,
      allowFullScreen: 1,
      controls: 0,
      frameBorder: 0,
      origin: "http://localhost:3000"
    }
  };

  const onStateChangeHandler = e => {
    switch (e.data) {
      case -1: // Unstarted
        console.log("Unstarted");
        break;
      case 0: // ended
        console.log("ended");
        break;
      case 1: // Playing
        console.log("playing");
        break;
      case 2: // paused
        console.log("Paused");
        break;
      case 3: // buffering
        console.log("Buffering");
        break;
      case 5: // Video cued
        console.log("video Cued");
        break;
    }
  };

  const onReadyHandler = e => {
    console.log("ready");
    setPlayer(e.target);
  };

  return (
    <Youtube
      className={styles.youTube}
      videoId={id}
      opts={options}
      onStateChange={e => onStateChangeHandler(e)}
      onReady={e => onReadyHandler(e)}
    />
  );
}
