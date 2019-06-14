import React, { useState, useEffect } from "react";

/* Learn Higher Order components*/

export default function useVideoState(props) {
  const { user, userLoaded } = props;
  const [videoState, setVideoState] = useState({
    isMuted: false,
    isLiked: false,
    isDisliked: false,
    isFavorited: false
  });

  useEffect(() => {
    if (userLoaded) {
      setVideoState({
        isMuted: state.isMuted,
        isLiked: user.likes > 0,
        isDisliked: user.dislikes > 0,
        isFavorited: user.favorites > 0
      });
    }
  }, [userLoaded]);
  return [videoState, setVideoState];
}
