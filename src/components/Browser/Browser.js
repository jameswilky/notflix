import React, { useContext } from "react";
import styles from "./Browser.module.css";
import Carousel from "../Carousel/Carousel";
import uuid from "uuid";
import Loading from "../Loading/Loading";
import useVideos from "../../hooks/useVideos";
import pageNames from "../../pageNames";
import { AuthContext } from "../../contexts/AuthContext";
import useScreenWidth from "../../hooks/useScreenWidth";
import Grid from "../Grid/Grid";
import VideoPlayer from "../VideoPlayer/VideoPlayer";

export default function Browser(props) {
  const { FAVOURITES, SEARCH } = pageNames;

  const { includeBanner, videoType = false, content } = props;

  const query = props.history.location.search;

  const { videosLoaded, videosByGenre, videos } = useVideos(
    content,
    query,
    props.location
  );
  const { auth } = useContext(AuthContext);

  const userId = "google-oauth2|103091392578361804114";

  const { screenWidth } = useScreenWidth();

  const CarouselBody = () => {
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
    return <div />;
  };
  const SearchResults = () => {
    return (
      <>
        {videosLoaded ? (
          <>
            {videos.length > 0 ? (
              <>
                <div className={styles.gridContainer}>
                  <div className={styles.title}>
                    <h3>{`Results for ${query.slice(3)}`}</h3>
                  </div>
                  <div className={styles.gridBody}>
                    <Grid
                      videos={videos}
                      key={uuid()}
                      {...props}
                      screenWidth={screenWidth}
                    />
                  </div>
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
        return SearchResults();
      default:
        return CarouselBody();
    }
  };
  console.log(screenWidth);
  return (
    <div className={styles.main}>
      {videosLoaded ? (
        <>
          {includeBanner ? (
            <VideoPlayer
              position="middle"
              video={Object.values(videosByGenre[0])[0][1]}
              width={screenWidth}
              style={{
                width: `100%`,
                maxHeight: `95vh`,
                zIndex: 0,
                height: `calc(100vw * 0.7)`,
                marginBottom: "calc(100vh * -0.1)"
              }}
            />
          ) : null}

          <Body />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
