import React, { useEffect, useState, Fragment } from "react";
import styles from "./Home.module.css";
import banner from "../../images/placeholder.jpg";
import Carousel from "../Carousel/Carousel";
import Utilities from "../../Utilities";
import uuid from "uuid";

export default function Home(props) {
  const [message, setMessage] = useState("");
  const [videosByGenre, setVideosByGenre] = useState([[{ id: "", title: "" }]]);

  const { getAccessToken } = props.auth;
  const { sortBy, groupBy } = Utilities;

  useEffect(() => {
    fetch("/public", {
      headers: { Authorization: `Bearer ${getAccessToken()}` }
    })
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Network respones was not ok.");
      })
      .then(response => {
        console.log(response.videos);
        const sortedVideos = sortBy(response.videos, "genre");
        const groupByGenre = groupBy("genre");
        setVideosByGenre(groupByGenre(sortedVideos));
      })
      .catch(error => setMessage(error.message));
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.bannerContainer}>
        <img
          className={styles.banner}
          src={banner}
          alt=""
          onClick={console.log(videosByGenre)}
        />
      </div>
      <div className={styles.carouselContainer}>
        {Object.keys(videosByGenre).map(genre => {
          return (
            <Carousel
              genre={genre}
              videos={videosByGenre[genre]}
              key={uuid()}
              {...props}
            />
          );
        })}
      </div>
    </div>
  );
}
