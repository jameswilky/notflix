import React, { useState, useContext } from "react";
import styles from "./BannerOverlay.module.css";
import useVideoControls from "./useVideoControls";
import { AuthContext } from "../../contexts/AuthContext";

export default function BannerOverlay(props) {
  const { id, player, metaData } = props;
  const { title, match, maturity, length, categories, overview } = metaData;
  const { auth } = useContext(AuthContext);

  const {
    isMuted,
    setIsMuted,
    isLiked,
    setIsLiked,
    isDisliked,
    setIsDisliked,
    isFavorited,
    setIsFavorited,
    updateUser
  } = useVideoControls(id, player, auth);
  return (
    <div className={styles.body}>
      <div className={styles.text}>
        <div className={styles.title}>
          <h1>{title}</h1>
        </div>
        <div className={styles.btnContainer}>
          <div>
            <i className="fas fa-play" />
            Play
          </div>
          <div>
            <i className="fas fa-plus" />
            My List
          </div>
          <div>
            <i className="fas fa-info-circle" />
            More Info
          </div>
        </div>
        <div className={styles.description}>{overview}</div>
        <div className={styles.rightFloat}>
          <div className={styles.mute}>
            {" "}
            <i className="fas fa-volume-mute" />
          </div>
          <div className={styles.rating}>{maturity}</div>
        </div>
      </div>
    </div>
  );
}
