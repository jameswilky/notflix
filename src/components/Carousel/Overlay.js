import React, { useState, useContext } from "react";
import styles from "./Overlay.module.css";
import { AuthContext } from "../../contexts/AuthContext";

export default function Overlay(props) {
  const { id, metaData, player } = props;
  const { auth } = useContext(AuthContext);

  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

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
          {/* <div>{metaData.categories[0]}</div> */}
          <div>
            <span className={styles.dot}>&middot;</span>{" "}
            {/* {metaData.categories[1]} */}
          </div>
          <div>
            <span className={styles.dot}>&middot;</span>{" "}
            {/* {metaData.categories[2]} */}
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.btnContainer}>
          <div className={`${styles.btn} ${isMuted ? styles.btnSelected : ""}`}>
            <i
              className="fas fa-volume-mute"
              onClick={() => {
                if (player.isMuted()) {
                  player.unMute();
                  setIsMuted(false);
                } else {
                  player.mute();
                  setIsMuted(true);
                }
              }}
            />{" "}
          </div>
          {auth.isAuthenticated() ? (
            <>
              <div
                className={`${styles.btn} ${isLiked ? styles.btnSelected : ""}`}
              >
                <i
                  className="far fa-thumbs-up"
                  onClick={() => {
                    setIsLiked(!isLiked);
                    setIsDisliked(false);
                  }}
                />
              </div>
              <div
                className={`${styles.btn} ${
                  isDisliked ? styles.btnSelected : ""
                }`}
              >
                <i
                  className="far fa-thumbs-down"
                  onClick={() => {
                    setIsDisliked(!isDisliked);
                    setIsLiked(false);
                  }}
                />
              </div>
              <div
                className={`${styles.btn} ${isAdded ? styles.btnSelected : ""}`}
              >
                <i
                  className="fas fa-plus"
                  onClick={() => {
                    setIsAdded(!isAdded);
                  }}
                />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
