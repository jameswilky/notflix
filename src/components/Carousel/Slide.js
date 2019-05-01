import React, { useState, useEffect, Fragment } from "react";
import Video from "./Video";
import styles from "./Slide.module.css";

export default function Slide(props) {
  const { id } = props;
  const [player, setPlayer] = useState();
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

  return (
    <div
      className={styles.body}
      onMouseEnter={e => {
        setShowThumbnail(false);
        try {
          player.playVideo();
        } catch {
          console.log("player not ready");
        }
      }}
      onClick={e => {
        console.log("asdsa");
      }}
      onMouseLeave={e => {
        console.log("mouseout");
        setShowThumbnail(true);
        try {
          player.pauseVideo();
        } catch {
          console.log("player not ready");
        }
      }}
    >
      <Video id={id} player={player} setPlayer={setPlayer} />
      {showThumbnail ? <ThumbNail /> : null}

      <div className={styles.overlay}>
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
