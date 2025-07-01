import axios from "axios";
import styles from "./CardList.module.css";
import { useEffect } from "react";
import { useState } from "react";
import Card from "../Card/Card";
import { Link } from "react-router-dom";

function CardList({ items, isSlowConnection}) {
  // const [items, setItems] = useState([]);

  const onMobile = () => {
    return /Mobi|Android|iPhone/i.test(navigator.userAgent);
  }

  if (onMobile()) console.log("On a mobile device");

  

  return (
    <>
      <section className={styles.gridSection}>
        <div className={styles.result}>Result for "Flare"</div>
        <div className={styles.gridContainer}>
          {items.map((item) => (
            <Link to={`/item/${item.id}`} className={styles.cardLink}>
            <Card item={item} key={crypto.randomUUID()} isSlowConnection={isSlowConnection}/>
            </Link>
          ))}
          {/* <div className={styles.itemCard}>
            <div className={styles.wrapper}>
              <div className={styles.top}></div>
              <div className={styles.right}></div>
              <div className={styles.bottom}></div>
              <div className={styles.left}></div>
              <div className={styles.itemPicDiv}>
                <img
                  className={styles.itemPicture}
                  src="../assets/laptop.jpg"
                  alt=""
                />
              </div>
            </div>

            <div className={styles.itemContent}>
              <div className={styles.itemDescription}>
                Hp laptop 45GB RAM Core 169MCV...
              </div>
              <div className={styles.itemPrices}>
                <div className={styles.priceRateDiv}>
                  <span className={styles.itemPrice}>&#8358;124,456</span>
                  <span className={styles.itemSold}>3.2k+ sold</span>
                </div>

                <div className={styles.cartDiv}>
                  <img src="../assets/icons8-add-shopping-cart-23.png" alt="" />
                </div>
              </div>
              <div className={styles.rating}>
                <div>
                  <img src="../assets/icons8-star-12.png" alt="" />
                </div>
                <div>
                  <img src="../assets/icons8-star-12.png" alt="" />
                </div>
                <div>
                  <img src="../assets/icons8-star-12.png" alt="" />
                </div>
                <div>
                  <img src="../assets/icons8-star-12.png" alt="" />
                </div>
                <div>
                  <img src="../assets/icons8-star-half-12.png" alt="" />
                </div>
                <div className={styles.ratingNo}>424</div>
              </div>
            </div>
          </div>
          <div className={styles.itemCard}>
            <div className={styles.wrapper}>
              <div className={styles.itemPicDiv}>
                <img
                  className={styles.itemPicture}
                  src="../assets/shoes.jpg"
                  alt=""
                />
              </div>
            </div>

            <div className={styles.itemContent}>
              <div className={styles.itemDescription}>
                Hp laptop 45GB RAM...
              </div>
              <div className={styles.itemPrices}>
                <div className={styles.priceRateDiv}>
                  <span className={styles.itemPrice}>&#8358;124,456</span>
                  <span className={styles.itemSold}>3.2k+ sold</span>
                </div>
                <div className={styles.cartDiv}>
                  <img src="../assets/icons8-add-shopping-cart-23.png" alt="" />
                </div>
              </div>
              <div className={styles.rating}>
                <div>
                  <img src="../assets/icons8-star-12.png" alt="" />
                </div>
                <div>
                  <img src="../assets/icons8-star-12.png" alt="" />
                </div>
                <div>
                  <img src="../assets/icons8-star-12.png" alt="" />
                </div>
                <div>
                  <img src="../assets/icons8-star-12.png" alt="" />
                </div>
                <div>
                  <img src="../assets/icons8-star-half-12.png" alt="" />
                </div>
                <div className={styles.ratingNo}>424</div>
              </div>
            </div>
          </div>
          <div className={styles.itemCard}>
            <div className={styles.wrapper}>
              <div className={styles.itemPicDiv}>
                <img
                  className={styles.itemPicture}
                  src="../assets/brown-shoes.jpg"
                  alt=""
                />
              </div>
            </div>

            <div className={styles.itemContent}>
              <div className={styles.itemDescription}>
                Hp laptop 45GB RAM...
              </div>
              <div className={styles.itemPrices}>
                <span className={styles.itemPrice}>&#8358;124,456</span>
                <span className={styles.itemSold}>3.2k+ sold</span>
                <div className={styles.cartDiv}>
                  <img src="../assets/icons8-add-shopping-cart-23.png" alt="" />
                </div>
              </div>
              <div className={styles.rating}>
                <div>
                  <img src="../assets/icons8-star-12.png" alt="" />
                </div>
                <div>
                  <img src="../assets/icons8-star-12.png" alt="" />
                </div>
                <div>
                  <img src="../assets/icons8-star-12.png" alt="" />
                </div>
                <div>
                  <img src="../assets/icons8-star-12.png" alt="" />
                </div>
                <div>
                  <img src="../assets/icons8-star-half-12.png" alt="" />
                </div>
                <div className={styles.ratingNo}>424</div>
              </div>
            </div>
          </div>
          <div className={styles.itemCard}>
            <div className={styles.wrapper}>
              <div className={styles.itemPicDiv}>
                <img
                  className={styles.itemPicture}
                  src="../assets/caps.jpg"
                  alt=""
                />
              </div>
            </div>

            <div className={styles.itemContent}>
              <div className={styles.itemDescription}>
                Hp laptop 45GB RAM...
              </div>
              <div className={styles.itemPrices}>
                <span className={styles.itemPrice}>&#8358;124,456</span>
                <span className={styles.itemSold}>3.2k+ sold</span>
                <div className={styles.cartDiv}>
                  <img src="../assets/icons8-add-shopping-cart-23.png" alt="" />
                </div>
              </div>
              <div className={styles.rating}>
                <div>
                  <img src="../assets/icons8-star-12.png" alt="" />
                </div>
                <div>
                  <img src="../assets/icons8-star-12.png" alt="" />
                </div>
                <div>
                  <img src="../assets/icons8-star-12.png" alt="" />
                </div>
                <div>
                  <img src="../assets/icons8-star-12.png" alt="" />
                </div>
                <div>
                  <img src="../assets/icons8-star-half-12.png" alt="" />
                </div>
                <div className={styles.ratingNo}>424</div>
              </div>
            </div>
          </div>
          <div className={styles.itemCard}>
            <div className={styles.wrapper}>
              <div className={styles.itemPicDiv}>
                <img
                  className={styles.itemPicture}
                  src="../assets/silver-watch.jpg"
                  alt=""
                />
              </div>
            </div>

            <div className={styles.itemContent}>
              <div className={styles.itemDescription}>
                Hp laptop 45GB RAM...
              </div>
              <div className={styles.itemPrices}>
                <span className={styles.itemPrice}>&#8358;124,456</span>
                <span className={styles.itemSold}>3.2k+ sold</span>
                <div className={styles.cartDiv}>
                  <img src="../assets/icons8-add-shopping-cart-23.png" alt="" />
                </div>
              </div>
              <div className={styles.rating}>
                <div>
                  <img src="../assets/icons8-star-12.png" alt="" />
                </div>
                <div>
                  <img src="../assets/icons8-star-12.png" alt="" />
                </div>
                <div>
                  <img src="../assets/icons8-star-12.png" alt="" />
                </div>
                <div>
                  <img src="../assets/icons8-star-12.png" alt="" />
                </div>
                <div>
                  <img src="../assets/icons8-star-half-12.png" alt="" />
                </div>
                <div className={styles.ratingNo}>424</div>
              </div>
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
}

export default CardList;
