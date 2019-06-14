import React, { useState, useContext, useEffect } from "react";
import styles from "./SlideOverlay.module.css";
import useVideoState from "./useVideoState";
import { AuthContext } from "../../contexts/AuthContext";
import { UserContext } from "../../contexts/UserContext";
import uuid from "uuid";

export default function Overlay(props) {
  const { id, player, metaData } = props;
  const { title, match, maturity, length, categories } = metaData;
  const { auth } = useContext(AuthContext);
  const { updateUser, user, userLoaded } = useContext(UserContext);
  const [videoState, setVideoState] = useVideoState();

  const { isMuted, isLiked, isDisliked, isFavorited } = videoState;
  useEffect(() => {
    if (userLoaded) {
      setVideoState({
        isMuted: videoState.isMuted,
        isLiked: user.likes.includes(id),
        isDisliked: user.dislikes.includes(id),
        isFavorited: user.favorites.includes(id)
      });
    }
  }, [userLoaded]);

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

  return children;
}
