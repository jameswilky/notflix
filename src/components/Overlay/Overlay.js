import React, { useState, useContext } from "react";
import styles from "./Overlay.module.css";
import { AuthContext } from "../../contexts/AuthContext";

const userData = {
  liked: false,
  disliked: false,
  favorited: false
};

export default function Overlay(props) {
  const { id, metaData, player } = props;
  const { title, match, maturity, length, categories } = metaData;
  const { liked, disliked, favorited } = userData;
  const { auth } = useContext(AuthContext);

  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(liked);
  const [isDisliked, setIsDisliked] = useState(disliked);
  const [isFavorited, setIsFavorited] = useState(favorited);

  const updateUser = action => {
    /* users/update*/
    fetch("users/update", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: {
          id: auth.userProfile.sub
        },
        video: {
          id: id
        },
        /* use parameters instead*/
        action: action
      })
    });
  };
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
          <h3>{title}</h3>
        </div>
        <div className={styles.text}>
          <div className={styles.match}>{match}</div>
          <div className={styles.maturity}>{maturity}</div>
          <div>{length}</div>
        </div>
        <div className={styles.text}>
          <div>{categories[0]}</div>
          <div>
            <span className={styles.dot}>&middot;</span> {/* {categories[1]} */}
          </div>
          <div>
            <span className={styles.dot}>&middot;</span> {/* {categories[2]} */}
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
                    updateUser({ type: "LIKE", payload: !isLiked });

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
                    updateUser({ type: "DISLIKE", payload: !isDisliked });

                    setIsDisliked(!isDisliked);
                    setIsLiked(false);
                  }}
                />
              </div>
              <div
                className={`${styles.btn} ${
                  isFavorited ? styles.btnSelected : ""
                }`}
              >
                <i
                  className="fas fa-plus"
                  onClick={() => {
                    updateUser({ type: "FAVOURITE", payload: !isFavorited });
                    setIsFavorited(!isFavorited);
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
