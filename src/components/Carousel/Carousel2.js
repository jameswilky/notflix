import React, { useEffect, useState } from "react";
import styles from "./Carousel2.module.css";
import Slide from "./Slide2";
import uuid from "uuid";

const fitSlides = (screenWidth, min, n, videos) => {
  const nSlides = n;
  const parentWidth = screenWidth;
  const minWidth = min;
  const nVisibleSlides = Math.floor(parentWidth / minWidth) || 1;
  const slideWidth = Math.floor(parentWidth / nVisibleSlides);
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

  return { getTemplate, videosByColumn };
};

export default function Carousel(props) {
  const { videos, genre, screenWidth } = props;
  const bodyRef = React.createRef();
  const containerRef = React.createRef();
  const { getTemplate, videosByColumn } = fitSlides(
    screenWidth,
    200,
    videos.length,
    videos
  );

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
              />
            );
          })}
        </div>
      );
    });
  };
  return (
    <>
      <div className={styles.container} ref={containerRef}>
        <div className={styles.header}>
          <h4>{genre}</h4>
        </div>

        <div
          className={styles.body}
          ref={bodyRef}
          style={{ gridTemplateColumns: getTemplate() }}
        >
          <Columns />
        </div>
      </div>
    </>
  );
}
