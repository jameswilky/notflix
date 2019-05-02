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

  const Thumbnail = () => {
    return (
      <img
        className={styles.thumbnail}
        style={{ display: showThumbnail ? "block" : "none" }} // Bring Thumbnail to front on hide
        data-video={id}
        alt="Play this video"
        src={`http://img.youtube.com/vi/${id}/0.jpg`}
      />
    );
  };

  const fullScreen = () => {};

  return (
    <div
      className={styles.body}
      onMouseEnter={e => {
        try {
          player.playVideo();
          setTimeout(() => setShowThumbnail(false), 450);
        } catch {
          console.log("player not ready");
        }
      }}
      onMouseLeave={e => {
        try {
          player.pauseVideo();
          setShowThumbnail(true);
          // setTimeout(() => setShowThumbnail(true), 450);
        } catch {
          console.log("player not ready");
        }
      }}
    >
      <Video id={id} player={player} setPlayer={setPlayer} />

      <div className={styles.overlay}>
        <div className={styles.overlay__left}>
          <div className={styles.overlay__play}>
            <i
              className={`fas fa-play ${styles.playBtn} ${styles.btn}`}
              onClick={() => {
                player.playVideo();

                let iframe = player.a; // reference the iframe
                let requestFullScreen =
                  iframe.requestFullScreen ||
                  iframe.mozRequestFullScreen ||
                  iframe.webkitRequestFullScreen;
                if (requestFullScreen) {
                  requestFullScreen.bind(iframe)();
                }
              }}
            />
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
      <Thumbnail />
    </div>
  );
}
