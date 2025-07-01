import { useState } from "react";
import styles from "./Card.module.css";
import RatingStars from "../RatingStar/RatingStar";
import { BsCartPlus } from "react-icons/bs";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


function Card({ item, isSlowConnection }) {
  const [top, setTop] = useState(0);
  const [right, setRight] = useState(0);
  const [left, setLeft] = useState(0);

  const handleDecriptionPositiing = (e) => {
    // console.log(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    const div = e.currentTarget.getBoundingClientRect();
    setRight(e.clientX - div.left + 20);
    setTop(e.clientY - div.top + 20);
    setLeft(e.clientX - div.right + 20);
    // console.log(top, right);
  };

  // handleDecriptionPositiing();

  return (
    <div onMouseEnter={handleDecriptionPositiing} className={styles.itemCard}>
      <div className={styles.wrapper}>
        {isSlowConnection ? <div className={styles.itemPicDiv}>
          <img className={styles.itemPicture} src={item.image} alt="" />
        </div> : <Skeleton height={400}/>}
      </div>

      <div className={styles.itemContent}>
        {item ? <div className={styles.itemDescription}>{item.title.length <= 23 ? item.title : item.title.slice(0, 24) + "..."}</div> : <Skeleton/>}
        <div className={styles.subcontent}>
          {item ? <div className={styles.itemPrices}>
            <div className={styles.priceRateDiv}>
              <span className={styles.itemPrice}>&#8358;{item.price.toFixed() * 155}</span>
              <span className={styles.itemSold}>{item.rating.rate}k+ sold</span>
              <span className={styles.discount}>
                -{item.discount ? item.discount.toFixed() : "60"}%
              </span>
            </div>

            <div className={styles.cartWrapper}>
              <div className={styles.cartDiv}>
                {/* <img src="../assets/icons8-add-shopping-cart-23.png" alt="" /> */}
                {<BsCartPlus size={22}/> ?? <Skeleton/>}
              </div>
            </div>

          </div> : <Skeleton/>}
          {item ? <div className={styles.rating}>
            <RatingStars rating={item.rating.rate} starColor="#000000"/>
            <div className={styles.ratingNo}>
              {item.rating.count
                ? item.rating.count
                : (item.price * item.rating.rate).toFixed()}
            </div>
          </div> : <Skeleton/>}
        </div>
      </div>
      {item && top != 0 && right != 0 && (
        <div
          className={styles.toolTip}
          style={{ top: top, right: right, left: left }}
        >
          {item.description.length <= 200
            ? item.description
            : item.description.slice(0, 200)}
        </div>
      )}
    </div>
  );
}

export default Card;
