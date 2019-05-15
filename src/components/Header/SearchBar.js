import React from "react";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  return (
    <div className={`${styles.container} ${styles.hideSearch}`}>
      <i className={`fas fa-search ${styles.searchBtn}`} onClick={() => {}} />
      <input
        className={styles.input}
        type="text"
        placeholder="Titles, people, genres"
      />
    </div>
  );
}
