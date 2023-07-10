"use client"
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.banterLoader}>
      <div className={styles.banterLoaderBox}></div>
      <div className={styles.banterLoaderBox}></div>
      <div className={styles.banterLoaderBox}></div>
      <div className={styles.banterLoaderBox}></div>
      <div className={styles.banterLoaderBox}></div>
      <div className={styles.banterLoaderBox}></div>
      <div className={styles.banterLoaderBox}></div>
      <div className={styles.banterLoaderBox}></div>
      <div className={styles.banterLoaderBox}></div>
    </div>
  );
};

export default Loader;
