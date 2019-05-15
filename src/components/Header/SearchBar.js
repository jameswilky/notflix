import React, { useState, useEffect } from "react";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const clickedAway = e => {
      if (show && e.target.id != "search") {
        setShow(!show);
      }
    };
    document.addEventListener("click", clickedAway);

    return () => document.removeEventListener("click", clickedAway);
  });
  return (
    <div
      className={`${styles.container} ${show ? styles.show : ""}`}
      onClick={() => setShow(!show)}
    >
      <i className={`fas fa-search ${styles.searchBtn}`} onClick={() => {}} />
      {show ? (
        <input
          id={"search"}
          onClick={e => e.stopPropagation()}
          className={styles.input}
          type="text"
          placeholder="Titles, people, genres"
          autoFocus
        />
      ) : null}
    </div>
  );
}
