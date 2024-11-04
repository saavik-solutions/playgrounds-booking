import React from 'react';
import styles from './SearchCard.module.css';

export default function SearchCard() {
  return (
    <div
      className={styles.searchCard}
      style={{
        backgroundImage: `url('/images/background-image.jpg')`, // Ensure this path is accessible from your public folder
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px', // Adjust padding as needed
        borderRadius: '8px', // Optional rounded corners
      }}
    >
      <h1 className={styles.logo}>LOGO HERE</h1>
      <div className={styles.searchContainer}>
        <input type="text" placeholder="Search for Venue" />
        <input type="date" placeholder="Date" />
        <button>Check Availability</button>
      </div>
    </div>
  );
}
