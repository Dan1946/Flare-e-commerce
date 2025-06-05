import React from "react";
import styles from "./Notification.module.css";

function Notification({ message = "Succesfully added", success = true}) {
  return (
    <div className={styles.notification}>
      <div>
        {success ? <img src="../assets/icons8-success-24.png" alt="" /> : <img src="../assets/icons8-error-24.png" alt="" />}
      </div>
      {message}
    </div>
  );
}

export default Notification;
