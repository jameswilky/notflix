import React, { useEffect, useState, Fragment } from "react";
import styles from "./Home.module.css";
import banner from "../../images/placeholder.jpg";
import Carousel from "../Carousel/Carousel";

/*
  embedding videos:
  https://gomakethings.com/how-to-play-a-video-in-full-screen-mode-when-its-thumbnail-is-clicked-with-vanilla-js/
*/

export default function Home(props) {
  const [message, setMessage] = useState("");
  const [videos, setVideos] = useState([{ id: "", title: "" }]);
  const { getAccessToken } = props.auth;

  useEffect(() => {
    fetch("/public", {
      headers: { Authorization: `Bearer ${getAccessToken()}` }
    })
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Network respones was not ok.");
      })
      .then(response => {
        const sortedVideos = sortBy(response.videos, "genre");

        setVideos(sortedVideos);
        console.log(response.videos, sortedVideos);
      })
      .catch(error => setMessage(error.message));
  }, [false]);

  const sortBy = (videos, field) => {
    return videos.sort((a, b) => {
      const A = a[field].toUpperCase();
      const B = b[field].toUpperCase();
      if (A < B) return -1;
      if (A > B) return 1;
      return 0;
    });
  };

  return (
    <div className={styles.main}>
      <div className={styles.bannerContainer}>
        <img className={styles.banner} src={banner} alt="" />
      </div>
      <div className={styles.carouselContainer} />
    </div>
  );
}
