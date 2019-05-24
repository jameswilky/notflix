import React, { useEffect, useState, useContext } from "react";
import styles from "./Collection.module.css";
import Carousel from "../Carousel/Carousel";
import { AuthContext } from "../../contexts/AuthContext";
import uuid from "uuid";
import pageNames from "../../pageNames";

export default function Collection(props) {
  const [videos, setVideos] = useState([]);
  const { FAVOURITES } = pageNames;

  const { auth } = useContext(AuthContext);

  const query = props.history.location.search;
  const userId = "google-oauth2|103091392578361804114";
  useEffect(() => {
    fetch(`/list/${userId}`)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Network respones was not ok.");
      })
      .then(response => setVideos(response));
  }, []);
  // useEffect(() => {
  //   fetch(`/search${query}`)
  //     .then(response => {
  //       if (response.ok) return response;
  //       throw new Error("Network respones was not ok.");
  //     })
  //     .then(response => setVideos(response.videos));
  // }, [query]);
  console.log(props);
  return (
    <div className={styles.main}>
      <div className={styles.container} />
      <div>
        <Carousel genre={"MyList"} videos={videos} key={uuid()} {...props} />
      </div>
    </div>
  );
}
