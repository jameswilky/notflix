import React, { useEffect, useState, useContext } from "react";
import styles from "./Browser.module.css";
import Carousel from "../Carousel/Carousel";
import BrowserHeader from "./BrowserHeader";
import uuid from "uuid";
import Loading from "../Loading/Loading";
import useVideos from "../../hooks/useVideos";
import pageNames from "../../pageNames";
import { AuthContext } from "../../contexts/AuthContext";
import useScreenWidth from "../../hooks/useScreenWidth";
import Grid from "../Grid/Grid";

export default function Browser(props) {
  const { FAVOURITES, SEARCH } = pageNames;

  const { includeBanner, videoType = false, content } = props;

  const query = props.history.location.search;

  const { videosLoaded, videosByGenre, videos } = useVideos(
    content,
    query,
    props.location
  );
  const [listedVideos, setListedVideos] = useState([]);
  const { auth } = useContext(AuthContext);

  const userId = "google-oauth2|103091392578361804114";

  const { screenWidth } = useScreenWidth();

  /* get rid of and add to user context*/
  // useEffect(() => {
  //   fetch(`/users/${userId}`)
  //     .then(response => {
  //       if (response.ok) return response.json();
  //       console.log(response);
  //       // throw new Error("Network response was not ok.");
  //     })
  //     .then(response => {
  //       setListedVideos(response);
  //     });
  // }, []);

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
          <Carousel
            genre={genre}
            videos={videos}
            key={uuid()}
            {...props}
            screenWidth={screenWidth}
          />
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
  console.log(videos);
  const SearchResults = () => {
    return (
      <>
        {videosLoaded ? (
          <>
            {videos.length > 0 ? (
              <>
                <div className={styles.title}>
                  <h3>{`Results for ${query.slice(3)}`}</h3>
                </div>
                <div className={styles.container}>
                  <Grid
                    videos={videos}
                    key={uuid()}
                    {...props}
                    screenWidth={screenWidth}
                  />
                </div>
              </>
            ) : (
              <div className={styles.notFound}>
                Your Search for "{query.slice(3)}" did not have any matches.
                Suggestions:
                <ul>
                  <li>Try different keywords</li>
                  <li>Looking for a movie or TV show?</li>
                  <li>
                    Try using a movie, TV show title, an actor or director
                  </li>
                  <li> Try a genre like comedy, romance, sports or drama</li>
                </ul>
              </div>
            )}
          </>
        ) : (
          <Loading />
        )}
      </>
    );
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
