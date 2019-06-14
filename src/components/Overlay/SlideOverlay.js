import React, { useState, useContext, useEffect } from "react";
import styles from "./SlideOverlay.module.css";
import { AuthContext } from "../../contexts/AuthContext";
import { UserContext } from "../../contexts/UserContext";
import uuid from "uuid";
import useVideoState from "./useVideoState";

export default function SlideOverlay(props) {
  const { id, player, metaData } = props;
  const { title, match, maturity, length, categories } = metaData;
  const { auth } = useContext(AuthContext);
  const { updateUser, user, userLoaded } = useContext(UserContext);

  const [videoState, setVideoState] = useVideoState(user, userLoaded, id);
  const { isMuted, isLiked, isDisliked, isFavorited } = videoState;
  useEffect(() => {
    if (userLoaded) {
      setVideoState({
        isMuted: isMuted,
        isLiked: user.likes.filter(video => video._id === id).length > 0,
        isDisliked: user.dislikes.filter(video => video._id === id).length > 0,
        isFavorited: user.favorites.filter(video => video._id === id).length > 0
      });
    }
  }, userLoaded);

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

          {categories.length > 1
            ? categories.map((category, i) => {
                if (i > 1)
                  return (
                    <div key={uuid()}>
                      <span className={styles.dot}>&middot;</span> {category}
                    </div>
                  );
              })
            : null}
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
                  setVideoState({ ...videoState, isMuted: false });
                } else {
                  player.mute();
                  setVideoState({ ...videoState, isMuted: true });
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
                    updateUser({ type: "LIKE", payload: !isLiked }, auth, id);
                    setVideoState({
                      ...videoState,
                      isLiked: !isLiked,
                      isDisliked: false
                    });
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
                    updateUser(
                      { type: "DISLIKE", payload: !isDisliked },
                      auth,
                      id
                    );

                    setVideoState({
                      ...videoState,
                      isDisliked: !isDisliked,
                      isLiked: false
                    });
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
                    updateUser(
                      { type: "FAVORITE", payload: !isFavorited },
                      auth,
                      id
                    );
                    setVideoState({ ...videoState, isFavorited: !isFavorited });
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
