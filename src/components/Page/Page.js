import React from "react";
import Header from "../Header/Header";
import Browser from "../Browser/Browser";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import Collection from "../Collection/Collection";
import pageNames from "../../pageNames";

export default function Page(props) {
  const { HOME, MOVIES, TV_SHOWS, PROFILE, FAVOURITES, SEARCH } = pageNames;
  const { content, videosLoaded, videosByGenre } = props;

  //Transparent header if the page is home, tv shows or movies
  const isTransparent =
    content === HOME || content === TV_SHOWS || content === MOVIES;

  const Body = () => {
    switch (videosLoaded) {
      case true:
        switch (content) {
          case HOME:
            return (
              <Browser
                {...props}
                includeBanner={true}
                videosByGenre={videosByGenre}
              />
            );
          case SEARCH:
            return <Collection {...props} includeBanner={false} />;
          case TV_SHOWS:
            return (
              <Browser
                {...props}
                includeBanner={true}
                videosByGenre={videosByGenre}
                videoType={"show"}
              />
            );
          case MOVIES:
            return (
              <Browser
                {...props}
                includeBanner={true}
                videosByGenre={videosByGenre}
                videoType={"movie"}
              />
            );
          case PROFILE:
            return <Profile {...props} />;
          case FAVOURITES:
            return <Collection {...props} videosByGenre={videosByGenre} />;
          default:
            return <Browser {...props} />;
        }
      default:
        return (
          <div
            style={{
              height: "100vh",
              backgroundColor: "var(--black)",
              padding: "25% 50% 25% 50%"
            }}
          >
            {" "}
            Loading Content{" "}
          </div>
        );
    }
  };
  return (
    <>
      <Header {...props} isTransparent={isTransparent} />
      <Body />
      <Footer />
    </>
  );
}
