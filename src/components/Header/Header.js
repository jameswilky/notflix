import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../images/logo.png";
import userIcon from "../../images/userIcon.jpg";

export default function Header(props) {
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
  }, [profile, error]);

  return (
    <>
      <div className={styles.nav}>
        <div className={styles.logoContainer}>
          <img className={styles.img} src={logo} alt="" />
        </div>
        <div className={styles.innerNav}>
          <h4>Browse</h4>
          <i className="fas fa-caret-down" />
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
