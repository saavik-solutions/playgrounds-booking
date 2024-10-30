import React from 'react';
import styles from './SearchCard.module.css';


export default function SearchCard() {
  return (
    <div className={styles.searchCard}>
      <h1 className={styles.logo}>LOGO HERE</h1>
      <div className={styles.searchContainer}>
        <input type="text" placeholder="Search for Venue" />
        <input type="date" placeholder="Date" />
        <button>Check Availability</button>
      </div>
    </div>
  );
}
