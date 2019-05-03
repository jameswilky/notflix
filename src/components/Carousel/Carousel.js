import React from "react";
import styles from "./Carousel.module.css";
import Slide from "./Slide";

export default function Carousel(props) {
  const { auth } = props;
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.header}>
          <h4>Documentaries</h4>
          {/* <div onClick={() => x("jameswilky")}>TEST</div> */}
        </div>
        <div className={styles.body}>
          <div className={styles.body__inner}>
            <Slide id={"Y7d42LJfkqQ"} {...props} />
            <Slide id={"bkk2H3Ztrfk"} {...props} />
            <Slide id={"4CCfYi1u8Y4"} {...props} />
          </div>
        </div>
      </div>
    </div>
  );
}
