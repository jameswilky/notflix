import React from "react";
import styles from "./Header.module.css";
import logo from "../../images/logo.png";
import userIcon from "../../images/userIcon.jpg";

export default function Header() {
  return (
    <div className={styles.nav}>
      <div className={styles.logoContainer}>
        <img className={styles.img} src={logo} alt="" />
      </div>
      <div className={styles.innerNav}>
        <h4>Browse</h4>
        <i className="fas fa-caret-down" />
      </div>
      <div className={styles.searchContainer}>
        <i className={`fas fa-search ${styles.searchBtn}`} onClick={() => {}} />
      </div>
      <div className={styles.notificationsBtn}>
        <i className="fas fa-bell" />
      </div>
      <div className={styles.accountBtn}>
        <img className={styles.img} src={userIcon} alt="" />
      </div>
    </div>
  );
}
