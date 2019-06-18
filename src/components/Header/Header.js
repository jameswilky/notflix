import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../images/logo.png";
import userIcon from "../../images/userIcon.jpg";
import { AuthContext } from "../../contexts/AuthContext";
import SearchBar from "./SearchBar";
import useScreenSize from "../../hooks/useScreenSize";

export default function Header(props) {
  const { isTransparent } = props;

  const { auth } = useContext(AuthContext);
  const { isAuthenticated, login, logout, getProfile } = auth;

  const [showAccountDropDown, setShowAccountDropDown] = useState(false);
  const [showBrowserDropDown, setShowBrowserDropDown] = useState(false);

  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const { screenWidth, media } = useScreenSize();

  useEffect(() => {
    if (isAuthenticated()) {
      getProfile((profile, error) => {
        setProfile(profile);
        setError(error);
      });
    }
  }, []);

  const SubNav = function() {
    return (
      <>
        <div>
          <Link to="/">
            <h4>Home</h4>
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
            <Link to="/favorites">
              <p>My List</p>
            </Link>
          ) : null}
        </div>
      </>
    );
  };
  return (
    <>
      <header
        className={styles.nav}
        style={{
          backgroundColor: !isTransparent ? "none" : "var(--black)",
          gridTemplateColumns:
            media === "tablet" || "mobile"
              ? `minmax(50px, 100px) 1fr 1fr 50px 50px`
              : `minmax(70px, 100px) 1fr minmax(290px, 1fr) 50px 50px`,
          padding:
            media === "mobile" ? `0 0` : `0 calc(var(--slideWidth) * 0.12)`
        }}
      >
        <div className={styles.logoContainer}>
          <Link to="/">
            {" "}
            <img className={styles.img} src={logo} alt="" />
          </Link>
        </div>
        <div className={styles.innerNav}>
          {media === "desktop" ? (
            <SubNav />
          ) : (
            <div
              onMouseEnter={() => setShowBrowserDropDown(true)}
              onMouseLeave={() => setShowBrowserDropDown(false)}
            >
              <h4>Browse</h4>
              <i className="fas fa-caret-down" />
              {showBrowserDropDown ? (
                <>
                  <div className={styles.arrowBrowser}>
                    <i className={`fas fa-caret-up`} />
                  </div>
                  <div className={styles.browserDropdown}>
                    <SubNav />
                  </div>
                </>
              ) : null}
            </div>
          )}
        </div>
        <SearchBar key={1} {...props} />
        <div className={styles.notificationsBtn}>
          <i className="fas fa-bell" />
        </div>
        {isAuthenticated() && profile ? (
          <div
            className={styles.accountBtn}
            onMouseEnter={() => setShowAccountDropDown(true)}
            onMouseLeave={() => setShowAccountDropDown(false)}
          >
            <img
              className={styles.accountImg}
              src={userIcon}
              alt="Profile Avatar"
            />
            {showAccountDropDown ? (
              <>
                <div className={styles.arrow}>
                  <i className={`fas fa-caret-up`} />
                </div>
                <div className={styles.accountDropdown}>
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
      </header>
    </>
  );
}
