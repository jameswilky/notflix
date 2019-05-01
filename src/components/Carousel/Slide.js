import React, { useState, useEffect, Fragment } from "react";
import Youtube from "react-youtube";
import styles from "./Slide.module.css";

export default function Slide(props) {
  const { id } = props;
  const [showThumbnail, setShowThumbnail] = useState(true);

  const [metaData, setMetaData] = useState({
    title: "Top Gear",
    match: "94% match",
    maturity: "M",
    length: "4 Seasons",
    categories: ["Action", "Comedy", "Documentary"]
  });

  const ThumbNail = () => {
    return (
      <img
        className={styles.thumbnail}
        data-video={id}
        alt="Play this video"
        src={`http://img.youtube.com/vi/${id}/0.jpg`}
      />
    );
  };

  const Video = () => {
    const options = {
      height: "140",
      width: "250",
      playerVars: {
        autoplay: 1,
        allowFullScreen: 1,
        // modestBranding: 1,
        controls: 0,
        frameBorder: 0,
        rel: 0
      }
    };

    const onStateChangeHandler = e => {
      switch (e.data) {
        case 2:
          console.log("video paused");
          break;
        default:
          console.log("other case");
          break;
      }
    };

    const onReadyHandler = e => {
      // e.target.pauseVideo();
      console.log("video playing");
      // console.log(e.target);
    };

    return (
      <Youtube
        videoId={id}
        opts={options}
        onStateChange={e => onStateChangeHandler(e)}
        onReady={e => onReadyHandler(e)}
        onClick={e => console.log(e.target)}
      />
    );
  };
  return (
    <div className={styles.body}>
      <div
        className={styles.body__media}
        onMouseEnter={e => {
          setShowThumbnail(false);
        }}
        onMouseOut={e => {
          setShowThumbnail(true);
        }}
      >
        <Video />
        {showThumbnail ? <ThumbNail /> : null}
      </div>
      <div
        className={styles.body__overlay}
        onClick={() => console.log("testing")}
      >
        <div className={styles.overlay__left}>
          <div className={styles.overlay__play}>
            <i className={`fas fa-play ${styles.playBtn}`} />
          </div>
          <div>
            <h3>{metaData.title}</h3>
          </div>
          <div className={styles.overlay__text}>
            <div className={styles.overlay__match}>{metaData.match}</div>
            <div className={styles.overlay__maturity}>{metaData.maturity}</div>
            <div>{metaData.length}</div>
          </div>
          <div className={styles.overlay__text}>
            <div>{metaData.categories[0]}</div>
            <div>
              <span className={styles.dot}>&middot;</span>{" "}
              {metaData.categories[1]}
            </div>
            <div>
              <span className={styles.dot}>&middot;</span>{" "}
              {metaData.categories[2]}
            </div>
          </div>
        </div>
        <div className={styles.overlay__right}>
          <div className={styles.overlay__btnContainer}>
            <div className={styles.btn}>
              <i className="fas fa-volume-mute" />{" "}
            </div>
            <div className={styles.btn}>
              <i className="far fa-thumbs-up" />
            </div>
            <div className={styles.btn}>
              <i className="far fa-thumbs-down" />
            </div>
            <div className={styles.btn}>
              <i className="fas fa-plus" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
