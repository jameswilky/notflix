import { useState, useEffect } from "react";
import Utilities from "../Utilities";
import genres from "../genres";

export default function useVideos() {
  const [videosLoaded, setVideosLoaded] = useState(false);
  const [videosByGenre, setVideosByGenre] = useState({});
  const { groupBy } = Utilities;
  useEffect(() => {
    fetch("/videos")
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Network respones was not ok.");
      })
      .then(response => {
        setVideosByGenre(groupBy(response, genres));
        setVideosLoaded(true);
      })
      .catch(error => console.log(error.message));
  }, []);
  return { videosLoaded, videosByGenre };
}
