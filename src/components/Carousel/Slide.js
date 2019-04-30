import React, { useState, useEffect, Fragment } from "react";
import styles from "./Slide.module.css";

export default function Slide() {
  const [showThumbnail, setShowThumbnail] = useState(true);
  const [video, setVideo] = useState("Y7d42LJfkqQ");
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
        className={styles.body__img}
        data-video={video}
        alt="Play this video"
        src={`http://img.youtube.com/vi/${video}/0.jpg`}
      />
    );
  };

  const Video = () => {
    return (
      <iframe
        width="250"
        height="140"
        src={`https://www.youtube.com/embed/Y7d42LJfkqQ?rel=0&autoplay=1;controls=0;`}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        // allowFullScreen
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
        {showThumbnail ? <ThumbNail /> : <Video />}
      </div>
      <div className={styles.body__overlay}>
        <div className={styles.overlay__left}>
          <div className={styles.overlay__play}>
            <i className="fas fa-play" />
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
