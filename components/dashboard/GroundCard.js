import React from 'react';
import styles from './GroundCard.module.css';

export default function GroundCard({ stadiumName, price, location, rating, reviews, image }) {
  return (
    <div className={styles.groundCard}>
      <img src={image} alt="Stadium" className={styles.image} />
      <div className={styles.info}>
        <div className={styles.rating}>
          <span>⭐ {rating}</span>
          <span>({reviews})</span>
        </div>
        <h3>{stadiumName}</h3>
        <p>{location}</p>
        <div className={styles.priceAndButton}>
          <span>₹ {price}/hr</span>
          <button>Book Now</button>
        </div>
      </div>
    </div>
  );
}
