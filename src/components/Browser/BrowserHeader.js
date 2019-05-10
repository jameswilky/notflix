import React from "react";
import banner from "../../images/placeholder.jpg";
import styles from "./Browser.module.css";

export default function BrowserHeader() {
  return (
    <div className={styles.bannerContainer}>
      <img className={styles.banner} src={banner} alt="" />
    </div>
  );
}
