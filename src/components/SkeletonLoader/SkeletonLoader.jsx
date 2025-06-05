import React from 'react';
import styles from './SkeletonLoader.module.css';

// Base skeleton component
const Skeleton = ({ width, height, borderRadius, className }) => {
  const style = {
    width: width || '100%',
    height: height || '20px',
    borderRadius: borderRadius || '4px',
  };

  return <div className={`${styles.skeleton} ${className || ''}`} style={style}></div>;
};

// Product card skeleton
export const ProductCardSkeleton = () => {
  return (
    <div className={styles.productCard}>
      <Skeleton height="200px" className={styles.productImage} />
      <Skeleton width="70%" height="24px" className={styles.productTitle} />
      <Skeleton width="40%" className={styles.productPrice} />
      <Skeleton width="90%" className={styles.productDescription} />
      <Skeleton width="60%" className={styles.productRating} />
    </div>
  );
};

// Product details page skeleton
export const ProductDetailsSkeleton = () => {
  return (
    <div className={styles.productDetails}>
      <div className={styles.productGallery}>
        <Skeleton height="400px" className={styles.mainImage} />
        <div className={styles.thumbnails}>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} height="80px" width="80px" />
          ))}
        </div>
      </div>
      
      <div className={styles.productInfo}>
        <Skeleton width="80%" height="32px" className={styles.productTitle} />
        <Skeleton width="60%" height="24px" className={styles.productPrice} />
        <Skeleton width="100%" height="100px" className={styles.productDescription} />
        <Skeleton width="40%" height="24px" className={styles.productRating} />
        <Skeleton width="100%" height="48px" className={styles.addToCartButton} />
      </div>
    </div>
  );
};

// Review skeleton
export const ReviewSkeleton = () => {
  return (
    <div className={styles.review}>
      <div className={styles.reviewHeader}>
        <Skeleton width="40px" height="40px" borderRadius="50%" />
        <div className={styles.reviewUser}>
          <Skeleton width="120px" height="20px" />
          <Skeleton width="80px" height="16px" />
        </div>
      </div>
      <Skeleton width="100px" height="20px" className={styles.reviewRating} />
      <Skeleton width="100%" height="60px" className={styles.reviewContent} />
    </div>
  );
};

// Grid of product card skeletons
export const ProductGridSkeleton = ({ count = 8 }) => {
  return (
    <div className={styles.productGrid}>
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default {
  Skeleton,
  ProductCardSkeleton,
  ProductDetailsSkeleton,
  ReviewSkeleton,
  ProductGridSkeleton
};