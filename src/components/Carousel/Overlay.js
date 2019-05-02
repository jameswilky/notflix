import React from "react";
import styles from "./Overlay.module.css";

export default function body(props) {
  const { id, metaData, player } = props;

  const fullScreen = () => {
    player.playVideo();

    let iframe = player.a; // reference the iframe
    let requestFullScreen =
      iframe.requestFullScreen ||
      iframe.mozRequestFullScreen ||
      iframe.webkitRequestFullScreen;
    if (requestFullScreen) {
      requestFullScreen.bind(iframe)();
    }
  };
  return (
    <div className={styles.body}>
      <div className={styles.left}>
        <div className={styles.play}>
          <i
            className={`fas fa-play ${styles.playBtn} ${styles.btn}`}
            onClick={() => {
              fullScreen();
            }}
          />
        </div>
        <div>
          <h3>{metaData.title}</h3>
        </div>
        <div className={styles.text}>
          <div className={styles.match}>{metaData.match}</div>
          <div className={styles.maturity}>{metaData.maturity}</div>
          <div>{metaData.length}</div>
        </div>
        <div className={styles.text}>
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
      <div className={styles.right}>
        <div className={styles.btnContainer}>
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
  );
}
