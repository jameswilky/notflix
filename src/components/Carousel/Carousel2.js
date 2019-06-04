import React, { useEffect, useState } from "react";
import styles from "./Carousel2.module.css";
import Slide from "./Slide2";
import uuid from "uuid";
import Utilities from "../../Utilities";

const useResizeColumns = (parentWidth, slideWidth) => {
  const [state, setState] = useState({
    parentWidth: parentWidth,
    minWidth: slideWidth,
    nVisibleSlides: 0,
    maxWidth: 0,
    colSize: 0,
    nCols: 0
  });
  console.log(state.parentWidth);
  return {};
};

export default function Carousel(props) {
  const { addEvent, removeEvent } = Utilities;
  const { videos, genre } = props;

  const bodyRef = React.createRef();
  const containerRef = React.createRef();

  const [containerWidth, setContainerWidth] = useState();

  useEffect(() => {
    const captureWidth = () => {
      setContainerWidth(containerRef.current.offsetWidth);
    };
    addEvent(window, "resize", captureWidth);
    captureWidth();
    return () => removeEvent(window, "resize", captureWidth);
  }, [containerWidth]);

  return (
    <>
      <div
        className={styles.container}
        ref={containerRef}
        onClick={() => console.log(containerWidth)}
      >
        <div className={styles.header}>
          <h4>{genre}</h4>
        </div>

        <div className={styles.body} ref={bodyRef}>
          <div className={styles.column}>
            {videos.map(video => {
              return <Slide video={video} key={uuid()} {...props} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
