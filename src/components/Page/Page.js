import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Browser from "../Browser/Browser";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import Favourites from "../Favourites/Favourites";
import pageNames from "../../pageNames";

export default function Page(props) {
  const { HOME, MOVIES, TV_SHOWS, PROFILE, FAVOURITES } = pageNames;
  const { content, contentLoaded, videosByGenre } = props;

  //Transparent header if the page is home, tv shows or movies
  const isTransparent =
    content == HOME || content == TV_SHOWS || content == MOVIES;

  const Body = () => {
    switch (contentLoaded) {
      case true:
        switch (content) {
          case HOME:
            return (
              <Browser
                {...props}
                includeHeader={true}
                videosByGenre={videosByGenre}
              />
            );
          case TV_SHOWS:
            return (
              <Browser
                {...props}
                includeHeader={true}
                videosByGenre={videosByGenre}
              />
            );
          case MOVIES:
            return (
              <Browser
                {...props}
                includeHeader={true}
                videosByGenre={videosByGenre}
              />
            );
          case PROFILE:
            return <Profile {...props} />;
          case FAVOURITES:
            return (
              <Favourites
                {...props}
                includeHeader={false}
                videosByGenre={videosByGenre}
              />
            );
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
    <div>
      <Header {...props} isTransparent={isTransparent} />
      <Body />
      <Footer />
    </div>
  );
}
