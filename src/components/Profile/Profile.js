import React from "react";
import styles from "./Profile.module.css";

export default function Profile(props) {
  const { auth } = props;
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>Account</h1>
        </div>
        <div className={styles.userInfoContainer}>
          <div>
            <h2>Membership & Billing</h2>
            <button>Cancel Membership</button>
          </div>
          <div>
            <div>
              <div>Name</div>
              <div>Password</div>
              <div>Phone</div>
            </div>
            <div>
              <div>Change account Email</div>
              <div>Change password</div>
              <div>Change phone number</div>
            </div>
          </div>
          <div>
            <div>
              <div>MasterCard 1234 1234 1234 1234</div>
              <div />
            </div>
            <div>
              <div>Update Payment info</div>
              <div>billing details</div>
            </div>
          </div>
          <div>
            <div>
              <div />
              <div />
            </div>
            <div>
              <div>Redeem gift card or promo code</div>
              <div>where to buy gift cards</div>
            </div>
          </div>
        </div>
        <div className={styles.planDetails} />
        <div className={styles.settings} />
        <div className={styles.myProfile} />
      </div>
    </div>
  );
}
