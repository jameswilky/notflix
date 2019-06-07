import React, { useEffect, useState, useRef } from "react";
import styles from "./Carousel2.module.css";
import Slide from "./Slide2";
import uuid from "uuid";
import ReactDOM from "react-dom";

/* 
Need to take a 1 unidirectional approach to scrolling

buttons should not trigger a scroll, but a scroll should trigger a state change,
rerendering to the correct scroll position
*/

const fitSlides = (screenWidth, min, n, videos) => {
  const padding = 30;
  const scrollBarWidth = 17;
  const nSlides = n;
  const containerWidth = screenWidth - (scrollBarWidth + padding * 2);
  const minWidth = min;
  const nVisibleSlides = Math.floor(containerWidth / minWidth) || 1;
  const slideWidth = Math.floor(containerWidth / nVisibleSlides);
  const colSize = slideWidth * nVisibleSlides;
  const nCols =
    (nSlides % nVisibleSlides) + Math.floor(nSlides / nVisibleSlides);

  const getTemplate = () => `${colSize}px `.repeat(nCols);

  const videosByColumn = videos
    .map(function(e, i) {
      return i % nVisibleSlides === 0
        ? videos.slice(i, i + nVisibleSlides)
        : null;
    })
    .filter(function(e) {
      return e;
    });

  /* imperative operation, set CSS width*/
  document.documentElement.style.setProperty("--slideWidth", `${slideWidth}px`);

  return {
    getTemplate,
    videosByColumn,
    slideWidth,
    containerWidth,
    nCols,
    colSize
  };
};

export default function Carousel(props) {
  const { videos, genre, screenWidth } = props;
  const containerRef = React.createRef();
  const {
    getTemplate,
    videosByColumn,
    slideWidth,
    containerWidth,
    nCols,
    colSize
  } = fitSlides(screenWidth, 200, videos.length, videos);

  const [snapPosition, setSnapPosition] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const [sliderAtStart, setSliderAtStart] = useState(true);
  const [sliderAtEnd, setSliderAtEnd] = useState(false);
  const bodyRef = useRef(null);

  let scrollTimer = null;
  const handleScroll = element => {
    if (element.scrollLeft > 0) {
      const nextSnap = Math.round(element.scrollLeft / colSize);
      scroll(element, colSize * nextSnap);
      setSnapPosition(nextSnap);
    }
  };
  useEffect(() => {
    ReactDOM.findDOMNode(bodyRef.current).addEventListener("scroll", function(
      e
    ) {
      if (scrollTimer) {
        clearTimeout(scrollTimer);
      }
      e.preventDefault();
      scrollTimer = setTimeout(() => handleScroll(this), 100);
    });
    return () =>
      ReactDOM.findDOMNode(bodyRef.current).removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  useEffect(() => {
    snapPosition === 0 ? setSliderAtStart(true) : setSliderAtStart(false);
    snapPosition >= nCols - 1 ? setSliderAtEnd(true) : setSliderAtEnd(false);
  }, [snapPosition]);

  const scroll = (element, x) => {
    element.scrollTo({
      left: x,
      behavior: "smooth"
    });
  };

  const slide = (element, n) => {
    if (snapPosition + n >= nCols) {
      return;
    } else if (snapPosition + n > 0) {
      scroll(element, containerWidth * (snapPosition + n));
      setSnapPosition(snapPosition + n);
    } else {
      scroll(element, 0);
      setSnapPosition(0);
    }
  };

  const Columns = () => {
    return videosByColumn.map(column => {
      return (
        <div className={styles.column} key={uuid()}>
          {column.map((video, i, self) => {
            return (
              <Slide
                video={video}
                key={uuid()}
                {...props}
                position={
                  i === 0 ? "first" : i < self.length - 1 ? "middle" : "last"
                }
                width={slideWidth}
              />
            );
          })}
        </div>
      );
    });
  };

  return (
    <>
      <div
        className={styles.container}
        ref={containerRef}
        onMouseEnter={() => {
          setShowButtons(true);
        }}
        onMouseLeave={() => setShowButtons(false)}
      >
        <div className={styles.header}>
          <h4>{genre}</h4>
        </div>

        <div
          className={styles.body}
          ref={bodyRef}
          id={"test"}
          style={{ gridTemplateColumns: getTemplate() }}
        >
          <Columns />
        </div>

        <div
          className={`${styles.btn} ${styles.left} ${
            showButtons && !sliderAtStart ? styles.show : styles.hidden
          }`}
          onClick={() => bodyRef.current && slide(bodyRef.current, -1)}
        >
          <i className="fas fa-chevron-left" />
        </div>
        <div
          className={`${styles.btn} ${styles.right} ${
            showButtons && !sliderAtEnd ? styles.show : styles.hidden
          }`}
          onClick={() => bodyRef.current && slide(bodyRef.current, 1)}
        >
          <i className="fas fa-chevron-right" />
        </div>
      </div>
    </>
  );
}
