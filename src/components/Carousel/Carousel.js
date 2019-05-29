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

  const [snapPosition, setSnapPosition] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const [sliderAtStart, setSliderAtStart] = useState(true);
  const [sliderAtEnd, setSliderAtEnd] = useState(true);

  const bodyRef = React.createRef();
  useEffect(() => {
    const captureWidth = () => setScreenWidth(window.document.body.clientWidth);
    addEvent(window, "resize", captureWidth);
    return () => removeEvent(window, "resize", captureWidth);
  });

  const atStart = () => bodyRef.current.scrollLeft <= 0;

  const atEnd = () =>
    bodyRef.current.clientWidth + bodyRef.current.scrollLeft + 1 >
    bodyRef.current.scrollWidth;

  const scroll = x => {
    bodyRef.current.scrollTo({
      left: x,
      behavior: "smooth"
    });
  };

  const slide = n => {
    if (snapPosition + n > 0) {
      scroll(screenWidth * (snapPosition + n));
      setSnapPosition(snapPosition + n);
    } else {
      scroll(0);
      setSnapPosition(0);
    }
  };

  return (
    <div>
      <div
        className={styles.container}
        onMouseEnter={() => setShowButtons(true)}
        onMouseLeave={() => setShowButtons(false)}
      >
        <div className={styles.header}>
          <h4>{genre}</h4>
        </div>

        <div
          className={styles.body}
          ref={bodyRef}
          onScroll={() => {
            console.log(
              bodyRef.current.clientWidth,
              bodyRef.current.scrollLeft
            );
            atStart() ? setSliderAtStart(true) : setSliderAtStart(false);
            atEnd() ? setSliderAtEnd(true) : setSliderAtEnd(false);
          }}
        >
          <div className={styles.body__inner}>
            {videos.map(video => {
              return <Slide video={video} key={uuid()} {...props} />;
            })}
          </div>
        </div>

        <div
          className={`${styles.btn} ${styles.left} ${
            !sliderAtStart && showButtons ? "" : styles.hidden
          }`}
          onClick={() => slide(-1)}
        >
          <i className="fas fa-chevron-left" />
        </div>
        <div
          className={`${styles.btn} ${styles.right} ${
            !sliderAtEnd && showButtons ? "" : styles.hidden
          }`}
          onClick={() => slide(1)}
        >
          <i className="fas fa-chevron-right" />
        </div>
      </div>
    </div>
  );
}
