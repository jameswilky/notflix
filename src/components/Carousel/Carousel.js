import React from "react";
import styles from "./Carousel.module.css";
import Slide from "./Slide";

export default function Carousel() {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.header}>
          <h4>Documentaries</h4>
        </div>
        <div className={styles.body}>
          <div className={styles.body__inner}>
            <Slide />
            <Slide />
            <Slide />
          </div>
        </div>
      </div>
    </div>
  );
}
