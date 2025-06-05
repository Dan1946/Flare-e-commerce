import React from "react";
import styles from "./RatingStar.module.css";

const RatingStars = ({ rating, maxStars = 5, starColor = "#FFD700", width = "16", height = "16"}) => {
  // Ensure rating is a number and between 0 and maxStars
  const normalizedRating = Math.min(Math.max(0, Number(rating) || 0), maxStars);
  
  // Round to nearest half star
  const roundedRating = Math.round(normalizedRating * 2) / 2;
  
  return (
    <div className={styles.ratingContainer} title={`${normalizedRating} out of ${maxStars}`}>
      {[...Array(maxStars)].map((_, index) => {
        // Calculate what type of star to show
        let starType;
        if (index + 0.5 === roundedRating) {
          starType = "half"; // Half star
        } else if (index < roundedRating) {
          starType = "full"; // Full star
        } else {
          starType = "empty"; // Empty star
        }
        
        return (
          <span key={index} className={styles.star}>
            {starType === "full" && (
              <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill={starColor} stroke={starColor} strokeWidth="1" className={styles.starIcon}>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            )}
            {starType === "half" && (
              <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill={starColor} stroke={starColor} strokeWidth="1" className={styles.starIcon}>
                <path d="M12 2 L15.09 8.26 L22 9.27 L17 14.14 L18.18 21.02 L12 17.77 L5.82 21.02 L7 14.14 L2 9.27 L8.91 8.26 L12 2" fill="none" />
                <path d="M12 2 L12 17.77 L5.82 21.02 L7 14.14 L2 9.27 L8.91 8.26 Z" />
              </svg>
            )}
            {starType === "empty" && (
              <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={starColor} strokeWidth="1" className={styles.starIcon}>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            )}
          </span>
        );
      })}
      <span className={styles.ratingText}>({rating})</span>
    </div>
  );
};

export default RatingStars;