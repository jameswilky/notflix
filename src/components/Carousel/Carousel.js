import React from "react";
import styles from "./Carousel.module.css";
import Slide from "./Slide";
import uuid from "uuid";

export default function Carousel(props) {
  const { videos, genre } = props;
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.header}>
          <h4>{genre}</h4>
        </div>
        <div className={styles.body}>
          <div className={styles.body__inner}>
            {/* {videos.map(video => {
              return <Slide video={video} key={uuid()} {...props} />;
            })} */}
          </div>
        </div>
      </div>
    </div>
  );
}
