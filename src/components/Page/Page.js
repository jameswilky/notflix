import React from "react";
import Header from "../Header/Header";
import Home from "../Home/Home";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import Favourites from "../Favourites/Favourites";

export default function Page(props) {
  const { content } = props;
  let isTransparent = true;

  const Body = () => {
    switch (content) {
      case "home":
        return <Home {...props} />;
      case "profile":
        return <Profile {...props} />;
      case "favourites":
        return <Favourites {...props} />;
      default:
        return <Home {...props} />;
    }
  };
  return (
    <div>
      <Header
        {...props}
        isTransparent={content === "home" ? isTransparent : null}
      />
      <Body />
      <Footer />
    </div>
  );
}
