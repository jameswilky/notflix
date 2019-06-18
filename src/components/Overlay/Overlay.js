import React, { useState, useContext, useEffect } from "react";
import slideStyles from "./SlideOverlay.module.css";
import bannerStyles from "./BannerOverlay.module.css";

import { AuthContext } from "../../contexts/AuthContext";
import { UserContext } from "../../contexts/UserContext";
import uuid from "uuid";
import useVideoState from "./useVideoState";

export default function Overlay(props) {
  const {
    id,
    player,
    metaData,
    type,
    thumbnailRef,
    setShowThumbnail,
    showThumbnail,
    setLoadPlayer,
    position
  } = props;
  const { title, match, maturity, length, categories, overview } = metaData;
  const { auth } = useContext(AuthContext);
  const { updateUser, user, userLoaded } = useContext(UserContext);

  const playerLoading = new Promise(resolve => {
    if (player !== undefined) resolve(player);
  });

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

  useEffect(() => {
    if (showThumbnail) {
      thumbnailRef.current.style.visibility = "visible";
      thumbnailRef.current.style.opacity = "1";
    } else {
      thumbnailRef.current.style.visibility = "hidden";
      thumbnailRef.current.style.opacity = "0";
    }
  }, [showThumbnail]);

  const fullScreen = () => {
    player.playVideo();
    let iframe = player.a;
    let requestFullScreen =
      iframe.requestFullScreen ||
      iframe.mozRequestFullScreen ||
      iframe.webkitRequestFullScreen;
    if (requestFullScreen) {
      requestFullScreen.bind(iframe)();
    }
  };

  const like = () => {
    updateUser({ type: "LIKE", payload: !isLiked }, auth, id);
    setVideoState({
      ...videoState,
      isLiked: !isLiked,
      isDisliked: false
    });
  };
  const dislike = () => {
    updateUser({ type: "DISLIKE", payload: !isDisliked }, auth, id);

    setVideoState({
      ...videoState,
      isDisliked: !isDisliked,
      isLiked: false
    });
  };
  const favorite = () => {
    updateUser({ type: "FAVORITE", payload: !isFavorited }, auth, id);
    setVideoState({
      ...videoState,
      isFavorited: !isFavorited
    });
  };
  const mute = () => {
    if (player.isMuted()) {
      player.unMute();
      setVideoState({ ...videoState, isMuted: false });
    } else {
      player.mute();
      setVideoState({ ...videoState, isMuted: true });
    }
  };
  const BannerOverlay = () => {
    const styles = bannerStyles;
    return (
      <div className={styles.body}>
        <div className={styles.text}>
          <div className={styles.title}>
            <h1>{title}</h1>
          </div>
          <div className={styles.btnContainer}>
            <div
              onClick={() => {
                fullScreen();
              }}
            >
              <i className="fas fa-play" />
              Play
            </div>
            <div onClick={() => favorite()}>
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
            <div className={styles.mute} onClick={() => mute()}>
              {" "}
              <i className="fas fa-volume-mute" />
            </div>
            <div className={styles.rating}>{maturity}</div>
          </div>
        </div>
      </div>
    );
  };
  const SlideOverlay = () => {
    const styles = slideStyles;
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
            <div
              className={`${styles.btn} ${isMuted ? styles.btnSelected : ""}`}
            >
              <i className="fas fa-volume-mute" onClick={() => mute()} />{" "}
            </div>
            {auth.isAuthenticated() ? (
              <>
                <div
                  className={`${styles.btn} ${
                    isLiked ? styles.btnSelected : ""
                  }`}
                >
                  <i className="far fa-thumbs-up" onClick={() => like()} />
                </div>
                <div
                  className={`${styles.btn} ${
                    isDisliked ? styles.btnSelected : ""
                  }`}
                >
                  <i className="far fa-thumbs-down" onClick={() => dislike()} />
                </div>
                <div
                  className={`${styles.btn} ${
                    isFavorited ? styles.btnSelected : ""
                  }`}
                >
                  <i className="fas fa-plus" onClick={() => favorite()} />
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    );
  };
  return (
    <div
      onClick={e => {
        /* allows user to start video once loaded*/
        playerLoading.then(player => {
          try {
            player.playVideo();
          } catch {}
        });
      }}
      onMouseEnter={e => {
        /* Start loading youtube player and hide thumbnail*/
        setLoadPlayer(true);
        setShowThumbnail(false);

        /* Will push items to left further when hovering on last item*/
        if (position === "last") {
          document.documentElement.style.setProperty(
            "--slideTranslateMult",
            `-1`
          );
        }
      }}
      onMouseOver={e => {
        /* After re-render, if mouse is hovering over the video once the player is loaded, it will play*/
        playerLoading.then(player => {
          player.playVideo();
        });
      }}
      onMouseLeave={e => {
        /* If player is loaded, then pause when leaving slide and show thumbnail */
        playerLoading.then(player => {
          player.pauseVideo();
        });
        setShowThumbnail(true);

        document.documentElement.style.setProperty(
          "--slideTranslateMult",
          `-2`
        );
      }}
    >
      {type === "slide" ? <SlideOverlay /> : <BannerOverlay />}
    </div>
  );
}