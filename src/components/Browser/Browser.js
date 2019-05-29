import React, { useEffect, useState, useContext } from "react";
import styles from "./Browser.module.css";
import Carousel from "../Carousel/Carousel";
import BrowserHeader from "./BrowserHeader";
import uuid from "uuid";
import Loading from "../Loading/Loading";
import useVideos from "../../hooks/useVideos";
import pageNames from "../../pageNames";
import { AuthContext } from "../../contexts/AuthContext";

export default function Browser(props) {
  const { FAVOURITES, SEARCH } = pageNames;

  const { includeBanner, videoType = false, content } = props;
  const { videosLoaded, videosByGenre } = useVideos();
  const [listedVideos, setListedVideos] = useState([]);
  const { auth } = useContext(AuthContext);

  const query = props.history.location.search;
  const userId = "google-oauth2|103091392578361804114";

  /* get rid of and add to user context*/
  useEffect(() => {
    fetch(`/users/${userId}`)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        setListedVideos(response);
      });
  }, []);

  const BrowserBody = () => {
    return videosByGenre.map(items => {
      const genre = Object.keys(items)[0];
      let videos = Object.values(items)[0];
      //if type specified
      if (videoType) {
        // Only include videos of specified type
        videos = items[genre].filter(video => {
          return video.type === videoType;
        });
      }
      if (videos.length > 5) {
        return (
          <Carousel genre={genre} videos={videos} key={uuid()} {...props} />
        );
      } else return null;
    });
  };
  const Favourites = () => {
    return (
      <>
        {" "}
        <div className={styles.container} />
        <Carousel genre={""} videos={listedVideos} key={uuid()} {...props} />
      </>
    );
  };
  const SearchResults = () => {
    return BrowserBody();
  };
  const Body = () => {
    switch (content) {
      case FAVOURITES:
        return Favourites();
      case SEARCH:
        return SearchResults(); // Temp
      default:
        return BrowserBody();
    }
  };

  return (
    <div className={styles.main}>
      {videosLoaded ? (
        <>
          {includeBanner ? <BrowserHeader /> : null}
          <div className={styles.carouselContainer}>{<Body />}</div>{" "}
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
