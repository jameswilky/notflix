import React, { useState, useEffect } from "react";
import Utilities from "../Utilities";

export default function useVideos() {
  const { sortBy, groupBy } = Utilities;

  const [contentLoaded, setContentLoaded] = useState(false);
  const [videosByGenre, setVideosByGenre] = useState([]);
  useEffect(() => {
    fetch("/public")
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Network respones was not ok.");
      })
      .then(response => {
        const sortedVideos = sortBy(response.videos, "genre");
        const groupByGenre = groupBy("genre");
        setVideosByGenre(groupByGenre(sortedVideos));
        setContentLoaded(true);
      })
      .catch(error => console.log(error.message));
  }, []);
  return { contentLoaded, videosByGenre };
}
