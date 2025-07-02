import React, { useState, useEffect, useMemo } from "react";
import styles from "./CartPage2.module.css";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../contexts/CartContext";
import RatingStars from "../../components/RatingStar/RatingStar";

function CartPage({ capitalize }) {
  const navigate = useNavigate();
  const { cart, deleteFromCart, logCartState } = useCartContext();
  logCartState();
  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0).toFixed();

  return (
    <section className={styles.cartSection}>
      <div className={styles.subnav}>
        {" "}
        <div className={styles.subLink} onClick={() => navigate(-1)}>
          Home
        </div>{" "}
        <div className={styles.miniArrow}>
          <img src="/icons8-arrow-19.png" alt="" />
        </div>{" "}
        <div className={styles.subLink}>Cart</div>
      </div>

      <div className={styles.secondaryDiv}>
        <div className={styles.leftSide}>
          <div className={styles.cart}>Cart</div>

          <div className={styles.itemsDiv}>
            {cart.length !== 0 ? (
              cart.map((item) => (
                <div className={styles.productInfoDiv} key={item.id}>
                  <div className={styles.productInfoWrapper}>
                    <div className={styles.picQtyWrapper}>
                      <div className={styles.picDiv}>
                        <img
                          className={styles.productPic}
                          src={item.image}
                          alt=""
                        />
                      </div>

                      <div className={styles.qtyWrapper}>
                        <div className={styles.qtyDiv}>
                          <div
                            className={styles.deleteDiv}
                            onClick={() => deleteFromCart(item)}
                          >
                            <img src="/icons8-delete-18.png" alt="" />
                          </div>
                          <span>1</span>
                          <div className={styles.plusDiv}>+</div>
                        </div>

                        <div className={styles.favoriteDiv}>
                          {/* <img src="/icons8-love-18.png" alt="" /> */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            // color="red"
                            class="love-icon"
                            viewBox="0 0 16 16"
                          >
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className={styles.productDetails}>
                      <div className={styles.productName}>{item.title}</div>
                      <div className={styles.productCatergory}>
                        {capitalize(item.category)}
                      </div>
                      <div className={styles.rating}>
                        <RatingStars rating={item.rating.rate} />
                        Rating: {item.rating.rate}
                      </div>
                      <div className={styles.availability}>
                        {item.availabilityStatus
                          ? item.availabilityStatus
                          : "In Stock"}
                      </div>
                    </div>
                  </div>

                  <div className={styles.priceDiv}>&#8358;{item.price}</div>
                </div>
              ))
            ) : (
              <div className={styles.emptyDiv}>
                <div className={styles.emptyCart}><img src="/icons8-empty-cart-64.png" alt="" /></div>
                <div className={styles.noItems}>Cart is currently empty</div>
              </div> 
            )}
          </div>
        </div>{" "}
        <div className={styles.rightSide}>
          <div className={styles.summary}>Summary</div>

          <div className={styles.subtotalDiv}>
            <div className={styles.subtotal}>
              <span>Subtotal</span>{" "}
              <div>
                <img src="/icons8-plus-20.png" alt="" />
              </div>
            </div>
            <div className={styles.price}>&#8358;{totalAmount}</div>
          </div>

          <div className={styles.estDiv}>
            <div>Estimated Delivery and handling</div>
            <div>Free</div>
          </div>

          <div className={styles.line}></div>
          <div className={styles.totalDiv}>
            <div>Total</div>
            <div>&#8358;{totalAmount}</div>
          </div>
          <div className={styles.line}></div>

          <button className={styles.guestBtn}>Guest Checkout</button>
          <button className={styles.memberBtn}>Member Checkout</button>
        </div>
      </div>
    </section>
  );
}

export default CartPage;
