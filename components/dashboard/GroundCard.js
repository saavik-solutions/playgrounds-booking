import React from 'react';
import styles from './GroundCard.module.css';

export default function GroundCard({ stadiumName, price, location, rating, reviews, image }) {
  return (
    <div className={styles.groundCard}>
      {/* Ground Image */}
      <img
        src={image || '/images/soccer-players-action-professional-stadium.jpg'} // Use this image if no specific image is provided
        alt={`${stadiumName} Stadium`}
        className={styles.image}
        loading="lazy"
      />

      {/* Ground Information */}
      <div className={styles.info}>
        <div className={styles.rating}>
          <span>⭐ {rating}</span>
          <span>({reviews || 0} reviews)</span>
        </div>
        <h3 className={styles.heading}>{stadiumName}</h3>
        <p>{location}</p>
        <div className={styles.priceAndButton}>
          <span>₹ {price}/hr</span>
          <button>Book Now</button>
        </div>
      </div>
    </div>
  );
}
