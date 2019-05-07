import React from "react";
import Header from "../Header/Header";
import Home from "../Home/Home";
import Footer from "../Footer/Footer";
import styles from "./Page.module.css";
import Profile from "../Profile/Profile";

export default function Page(props) {
  const { content } = props;
  const Body = () => {
    switch (content) {
      case "home":
        return <Home {...props} />;
      case "profile":
        return <Profile {...props} />;
    }
  };
  return (
    <div>
      <Header {...props} />
      <Body />
      <Footer />
    </div>
  );
}
