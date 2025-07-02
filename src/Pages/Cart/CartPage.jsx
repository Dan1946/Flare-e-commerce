import React, { useState, useEffect, useMemo } from "react";
import styles from "./CartPage2.module.css";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../contexts/CartContext";
import RatingStars from "../../components/RatingStar/RatingStar";
import { FcLike } from "react-icons/fc";
import { MdDeleteOutline } from "react-icons/md";


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
                           <MdDeleteOutline size={25} color="gray"/>
                          </div>
                          <span>1</span>
                          <div className={styles.plusDiv}>+</div>
                        </div>

                        <div className={styles.favoriteDiv}>
                          <FcLike size={25}/>
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
