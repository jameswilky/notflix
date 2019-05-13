import React, { useContext } from "react";
import styles from "./Profile.module.css";
import { AuthContext } from "../../AuthContext";

// Breakpoints = 0-450 = mobile. 450-667 = tablet, 668 = desktop

export default function Profile() {
  const { auth } = useContext(AuthContext);
  console.log(auth);
  console.log(styles);
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.title}>
          <p>Account</p>
        </div>
        <div className={styles.innerContainer}>
          <div>
            <p className={styles.subTitle}>Membership & Billing</p>
          </div>
          <div>
            <div>
              <div className={styles.name}>James Wilkinson</div>
              <div className={styles.password}>Password: *******</div>
              <div className={styles.phone}>Phone: 0412 123 123</div>
            </div>
            <div>
              <div className={`${styles.tile} ${styles.lineBreak} `}>
                Change account Email
                <i className={` ${styles.arrowIcon} fas fa-chevron-right`} />
              </div>
              <div className={`${styles.tile} ${styles.lineBreak} `}>
                Change password
                <i className={` ${styles.arrowIcon} fas fa-chevron-right`} />
              </div>
              <div className={`${styles.tile} ${styles.lineBreak} `}>
                Change phone number
                <i className={` ${styles.arrowIcon} fas fa-chevron-right`} />
              </div>
            </div>
          </div>
          <div>
            <div
              className={`${styles.tile} ${styles.lineBreak} 
              `}
            >
              <div className={`${styles.tile} ${styles.lineBreak} `}>
                MasterCard 1234 1234 1234 1234
              </div>
              <div />
            </div>
            <div>
              <div className={`${styles.tile} ${styles.lineBreak} `}>
                Update Payment info
                <i className={` ${styles.arrowIcon} fas fa-chevron-right`} />
              </div>
              <div className={`${styles.tile} ${styles.lineBreak} `}>
                billing details
                <i className={` ${styles.arrowIcon} fas fa-chevron-right`} />
              </div>
            </div>
          </div>
          <div className={`${styles.tile} ${styles.lineBreak} `}>
            <div>
              <div />
              <div />
            </div>
            <div>
              <div>
                Redeem gift card or promo code
                <i className={` ${styles.arrowIcon} fas fa-chevron-right`} />
              </div>

              <div>
                where to buy gift cards
                <i className={` ${styles.arrowIcon} fas fa-chevron-right`} />
              </div>
            </div>
            <button className={styles.cancelBtn}>Cancel Membership</button>
          </div>
        </div>
        <div className={styles.innerContainer}>
          <div>Test</div>
        </div>
        <div className={styles.innerContainer} />
        <div className={styles.innerContainer} />
      </div>
    </div>
  );
}
