import React from 'react';
import styles from './Loader.module.css';

const Loader = ({ size = 'medium', text = 'Loading...', theme = 'primary' }) => {
  const sizeClass = styles[size] || styles.medium;
  const themeClass = styles[theme] || styles.primary;
  
  return (
    <div className={styles.loaderContainer}>
      <div className={`${styles.spinner} ${sizeClass} ${themeClass}`}>
        <div className={styles.spinnerDot}></div>
        <div className={styles.spinnerDot}></div>
        <div className={styles.spinnerDot}></div>
        <div className={styles.spinnerDot}></div>
      </div>
      {text && <div className={styles.loaderText}>{text}</div>}
    </div>
  );
};

export default Loader;