import React, { useState, useContext, useEffect } from "react";

const userData = {
  liked: false,
  disliked: false,
  favorited: false
};

/* Learn Higher Order components*/

export default function useVideoControls(props) {
  const { liked, disliked, favorited } = userData;

  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(liked);
  const [isDisliked, setIsDisliked] = useState(disliked);
  const [isFavorited, setIsFavorited] = useState(favorited);

  const updateUser = (action, auth, id) => {
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

  return {
    isMuted,
    setIsMuted,
    isLiked,
    setIsLiked,
    isDisliked,
    setIsDisliked,
    isFavorited,
    setIsFavorited,
    updateUser
  };
}
