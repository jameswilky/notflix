import React, { useEffect } from "react";
import Slide from "../Slide/Slide";
import uuid from "uuid";
import styles from "./Grid.module.css";
import Utilities from "../../Utilities";

export default function Grid(props) {
  const { screenWidth, videos } = props;
  const { fitSlides } = Utilities;
  const {
    getTemplate,
    videosByColumn,
    slideWidth,
    containerWidth,
    nCols,
    colSize
  } = fitSlides(screenWidth, 200, videos.length, videos);

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
    <div className={styles.container}>
      <div className={styles.body}>
        <Columns />
      </div>
    </div>
  );
}
