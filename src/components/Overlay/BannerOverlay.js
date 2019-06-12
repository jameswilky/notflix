import React, { useState, useContext } from "react";
import styles from "./SlideOverlay.module.css";
import useVideoControls from "./useVideoControls";
import { AuthContext } from "../../contexts/AuthContext";

export default function BannerOverlay(props) {
  const { id, player, metaData } = props;
  const { title, match, maturity, length, categories } = metaData;
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
    <>
      <div className={styles.left}>
        <div className={styles.title} />
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
        <div className={styles.description} />
      </div>
      <div className={styles.right}>
        <div className={styles.rightBtnContainer} />
        <div className={styles.rating} />
      </div>
    </>
  );
}
