import React from "react";
import styles from "./Carousel.module.css";
import Slide from "./Slide";

export default function Carousel() {
  const resp = async () => {};

  const x = async user => {
    const profileResponse = await fetch(
      `https://api.github.com/users/${user}?client_id=${
        this.client_id
      }&client_secret=${this.client_secret}`
    );

    const repoResponse = await fetch(
      `https://api.github.com/users/${user}/repos?per_pafge=${
        this.repos_count
      }&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${
        this.client_secret
      }`
    );

    const profile = await profileResponse.json();
    const repos = await repoResponse.json();

    console.log(profile);
    return {
      profile,
      repos
    };
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.header}>
          <h4>Documentaries</h4>
          {/* <div onClick={() => x("jameswilky")}>TEST</div> */}
        </div>
        <div className={styles.body}>
          <div className={styles.body__inner}>
            <Slide />
            <Slide />
            <Slide />
          </div>
        </div>
      </div>
    </div>
  );
}
