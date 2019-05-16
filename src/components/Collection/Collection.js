import React, { useEffect, useState, useContext } from "react";
import styles from "./Collection.module.css";
import Carousel from "../Carousel/Carousel";
import { AuthContext } from "../../AuthContext";

export default function Collection(props) {
  const [videos, setVideos] = useState([]);

  const { auth } = useContext(AuthContext);

  const query = props.history.location.search;

  useEffect(() => {
    fetch(`/search${query}`)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Network respones was not ok.");
      })
      .then(response => setVideos(response.videos));
  });
  return (
    <div className={styles.main}>
      <div className={styles.container} />
      <div>{/* <Carousel key={5} {...props} /> */}</div>
      <p>{JSON.stringify(videos)}</p>
    </div>
  );
}
