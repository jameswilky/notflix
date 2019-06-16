import React, { useState, useEffect } from "react";
import Youtube from "react-youtube";
import styles from "./Video.module.css";

export default function Video(props) {
  const { id, setPlayer, load, width, autoplay } = props;
  const [loaded, setLoaded] = useState(false);
  const height = width * 0.5625;

  const options = {
    height: height,
    width: width,
    playerVars: {
      allowFullScreen: 1,
      controls: 0,
      frameBorder: 0,
      autoplay: autoplay ? 1 : 0
    }
  };

  const onReadyHandler = e => {
    setPlayer(e.target);
    setLoaded(true);
  };

  return (
    <>
      {load || autoplay ? (
        <Youtube
          className={styles.test}
          /* Temp*/
          videoId={id}
          // videoId={autoplay ? "mlHklH5VBtI" : id}
          opts={options}
          onReady={e => onReadyHandler(e)}
          className={styles.body}
        />
      ) : null}
    </>
  );
}
