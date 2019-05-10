import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../images/logo.png";
import userIcon from "../../images/userIcon.jpg";

export default function Header(props) {
  const { isTransparent } = props;
  const { isAuthenticated, login, logout, getProfile } = props.auth;
  const [showDropdown, setShowDropdown] = useState(false);

  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated()) {
      getProfile((profile, error) => {
        setProfile(profile);
        setError(error);
      });
    }
  }, []);

  return (
    <>
      <div
        className={styles.nav}
        style={{ backgroundColor: isTransparent ? "none" : "var(--black)" }}
      >
        <div className={styles.logoContainer}>
          <Link to="/">
            {" "}
            <img className={styles.img} src={logo} alt="" />
          </Link>
        </div>
        <div className={styles.innerNav}>
          <div>
            <Link to="/">
              <h4>Browse</h4>
              <i className="fas fa-caret-down" />
            </Link>
          </div>
          <div>
            <Link to="/tvshows">
              <p>TV Shows</p>{" "}
            </Link>
          </div>
          <div>
            <Link to="/movies">
              <p>Movies</p>{" "}
            </Link>
          </div>
          <div>
            {isAuthenticated() && profile ? (
              <Link to="/favourites">
                <h4>My List</h4>
              </Link>
            ) : null}
          </div>
        </div>
        <div className={styles.searchContainer}>
          <i
            className={`fas fa-search ${styles.searchBtn}`}
            onClick={() => {}}
          />
        </div>
        <div className={styles.notificationsBtn}>
          <i className="fas fa-bell" />
        </div>
        {isAuthenticated() && profile ? (
          <div
            className={styles.accountBtn}
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <img
              className={styles.accountImg}
              src={userIcon}
              alt="Profile Avatar"
            />
            {showDropdown ? (
              <>
                <div className={styles.arrow}>
                  <i className={`fas fa-caret-up`} />
                </div>
                <div className={styles.dropdown}>
                  <ul>
                    <li>
                      <Link to="/profile">Account</Link>
                    </li>
                    <li>Help Center</li>
                    <li onClick={logout}>Log Out</li>
                  </ul>
                </div>
              </>
            ) : null}
          </div>
        ) : (
          <button onClick={login}> Log in</button>
        )}
      </div>
    </>
  );
}
