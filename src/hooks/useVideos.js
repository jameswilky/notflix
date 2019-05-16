import React, { useState, useEffect } from "react";
import Utilities from "../Utilities";

export default function useVideos() {
  const { sortBy, groupBy } = Utilities;
  console.log("running videos hook");
  const [videosLoaded, setVideosLoaded] = useState(false);
  const [videosByGenre, setVideosByGenre] = useState([]);
  useEffect(() => {
    console.log("fetching videos");
    fetch("/public")
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Network respones was not ok.");
      })
      .then(response => {
        const sortedVideos = sortBy(response.videos, "genre");
        const groupByGenre = groupBy("genre");
        setVideosByGenre(groupByGenre(sortedVideos));
        setVideosLoaded(true);
      })
      .catch(error => console.log(error.message));
  }, []);
  return { videosLoaded, videosByGenre };
}
