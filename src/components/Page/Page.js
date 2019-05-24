import React from "react";
import Header from "../Header/Header";
import Browser from "../Browser/Browser";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import Collection from "../Collection/Collection";
import pageNames from "../../pageNames";
import { VideoProvider } from "../../contexts/VideoContext";

export default function Page(props) {
  const { HOME, MOVIES, TV_SHOWS, PROFILE, FAVOURITES, SEARCH } = pageNames;
  const { content } = props;

  //Transparent header if the page is home, tv shows or movies
  const isTransparent =
    content === HOME || content === TV_SHOWS || content === MOVIES;

  const Body = () => {
    switch (content) {
      case HOME:
        return <Browser {...props} includeBanner={true} />;
      case SEARCH:
        return <Collection {...props} includeBanner={false} />;
      case TV_SHOWS:
        return <Browser {...props} includeBanner={true} videoType={"show"} />;
      case MOVIES:
        return <Browser {...props} includeBanner={true} videoType={"movie"} />;
      case PROFILE:
        return <Profile {...props} />;
      case FAVOURITES:
        return <Collection {...props} includeBanner={false} />;
      default:
        return <Browser {...props} />;
    }
  };
  return (
    <>
      <Header {...props} isTransparent={isTransparent} />
      <VideoProvider>
        <Body />
      </VideoProvider>
      <Footer />
    </>
  );
}
