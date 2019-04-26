import React from "react";
import styles from "./Carousel.module.css";

export default function Carousel() {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.header}>
          <h4>Documentaries</h4>
        </div>
        <div className={styles.body}>
          <div className={styles.body__inner}>
            <div className={styles.tile}>
              <div className={styles.tile__media}>
                <img
                  class={styles.tile__img}
                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/70390/show-1.jpg"
                  alt=""
                />
              </div>
              <div className={styles.tile__details}>
                <div className={styles.tile__title}>Top Gear</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
