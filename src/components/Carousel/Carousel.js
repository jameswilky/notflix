import React, { useEffect, useState } from "react";
import styles from "./Carousel.module.css";
import Slide from "./Slide";
import uuid from "uuid";
import Utilities from "../../Utilities";

export default function Carousel(props) {
  const { addEvent, removeEvent } = Utilities;
  const { videos, genre } = props;
  const [screenWidth, setScreenWidth] = useState(
    window.document.body.clientWidth
  );

  const [position, setPosition] = useState(0);

  const bodyRef = React.createRef();
  useEffect(() => {
    const captureWidth = () => setScreenWidth(window.document.body.clientWidth);
    addEvent(window, "resize", captureWidth);
    return () => removeEvent(window, "resize", captureWidth);
  });

  const scroll = x => {
    bodyRef.current.scrollTo({
      left: x,
      behavior: "smooth"
    });
  };

  const slide = n => {
    if (position + n > 0) {
      scroll(screenWidth * (position + n));
      setPosition(position + n);
    } else {
      scroll(0);
      setPosition(0);
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.header}>
          <h4>{genre}</h4>
        </div>

        <div className={styles.body} ref={bodyRef}>
          <div className={styles.body__inner}>
            {videos.map(video => {
              return <Slide video={video} key={uuid()} {...props} />;
            })}
          </div>
        </div>
        <div
          className={`${styles.btn} ${styles.left} ${
            position !== 0 ? styles.hidden : ""
          }`}
          onClick={() => slide(-1)}
        >
          <i className="fas fa-chevron-left" />
        </div>

        <div
          className={`${styles.btn} ${styles.right}`}
          onClick={() => slide(1)}
        >
          <i className="fas fa-chevron-right" />
        </div>
      </div>
    </div>
  );
}
