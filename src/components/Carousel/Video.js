import React from "react";
import Youtube from "react-youtube";
import styles from "./Video.module.css";

export default function Video(props) {
  const { id, setPlayer, load } = props;

  const options = {
    height: "140",
    width: "250",
    playerVars: {
      allowFullScreen: 1,
      controls: 0,
      frameBorder: 0
    }
  };

  const onReadyHandler = e => {
    console.log(id + " loaded");
    console.log(e.target);
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
