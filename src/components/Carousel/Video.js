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
      frameBorder: 0
    }
  };

  const onReadyHandler = e => {
    setPlayer(e.target);
  };

  return (
    <Youtube
      className={styles.youTube}
      videoId={id}
      opts={options}
      onReady={e => onReadyHandler(e)}
    />
  );
}
