import React, { useState, useEffect } from "react";
import queryString from "query-string";
import styles from "./SearchBar.module.css";
import { withRouter } from "react-router-dom";

function SearchBar(props) {
  const params = queryString.parse(props.location.search);
  const [show, setShow] = useState(true);
  const [value, setValue] = useState(params.q === undefined ? "" : params.q);

  /* On Click outside*/
  useEffect(() => {
    const clickedAway = e => {
      if (show && e.target.id !== "search") {
        setShow(!show);
      }
    };
    document.addEventListener("click", clickedAway);

    return () => document.removeEventListener("click", clickedAway);
  }, [show]);

  /* On value change */
  const handleValueChange = e => {
    if (e.target.value === "") {
      props.history.push({
        pathname: "/"
      });
    } else {
      props.history.push({
        pathname: "/search",
        search: `?q=${e.target.value}`
      });
    }
    setValue(e.target.value);
  };
  return (
    <div
      className={`${styles.container} ${show ? styles.show : ""}`}
      onClick={() => setShow(!show)}
    >
      <i className={`fas fa-search ${styles.searchBtn}`} onClick={() => {}} />
      {show ? (
        <input
          className={styles.input}
          value={value}
          onChange={e => {
            handleValueChange(e);
          }}
          id={"search"}
          onClick={e => e.stopPropagation()}
          type="text"
          placeholder="Titles, people, genres"
          autoFocus
        />
      ) : null}
    </div>
  );
}

export default withRouter(SearchBar);
