import React from "react";
import Youtube from "react-youtube";
import styles from "./Video.module.css";

export default function Video(props) {
  const { id, setPlayer, load } = props;

  const options = {
    /* Temp */
    height: "120",
    width: "200",
    playerVars: {
      allowFullScreen: 1,
      controls: 0,
      frameBorder: 0
    }
  };

  const onReadyHandler = e => {
    setPlayer(e.target);
  };

  return (
    <>
      {load ? (
        <Youtube
          className={styles.youTube}
          videoId={id}
          opts={options}
          onReady={e => onReadyHandler(e)}
        />
      ) : null}
    </>
  );
}
