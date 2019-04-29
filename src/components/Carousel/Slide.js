import React from "react";
import styles from "./Slide.module.css";

export default function Slide() {
  return (
    <div className={styles.body}>
      <div className={styles.body__media}>
        <img
          class={styles.body__img}
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/70390/show-1.jpg"
          alt=""
        />
      </div>
      <div className={styles.body__overlay}>
        <div className={styles.overlay__left}>
          <div className={styles.overlay__play}>
            <i className="fas fa-play" />
          </div>
          <div>
            <h3>Title</h3>
          </div>
          <div className={styles.overlay__card}>
            <div className={styles.overlay__match}>94% match</div>
            <div className={styles.overlay__maturity}>M</div>
            <div>4 Seasons</div>
          </div>
          <div className={styles.overlay__card}>
            <div>Category</div>
            <div>
              <span className={styles.dot}>&middot;</span> Category
            </div>
            <div>
              <span className={styles.dot}>&middot;</span> Category
            </div>
          </div>
        </div>
        <div className={styles.overlay__right} />
      </div>
    </div>
  );
}
