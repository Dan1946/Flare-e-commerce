import { useEffect, useState } from "react";
import styles from "./ProductPage2.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useCartContext } from "../../contexts/CartContext";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";
import RatingStars from "../../components/RatingStar/RatingStar";
import QuantitySelect from "../../components/QuantitySelect/QuantitySelect";

function ProductPage({ items, capitalize}) {
  const {addToCart, isInCart}  = useCartContext()
  const [hoveredPic, setHoveredPic] = useState("");
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(false);
  const [add, setAdd] = useState(true)
  const [currentItem, setCurrentItem] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  

  useEffect(() => {
    // setloading(true);
    if (items && Array.isArray(items)) {
      const item = items.find((item) => item.id == id);

      setCurrentItem(item);
      setloading(false);
    } else {
      setloading(false);
      setError(true);
    }

    console.log("working");
  }, [items, id, error, loading]);

  if (!currentItem || loading) {
    // currentItem && setloading(false)
    return (
      <div>
        <Loader theme="blue" />
      </div>
    );
  }


  if (error) {
    toast.error("Couldn't load product");
    return (
      <div className={styles.errorDiv}>
        <div>Error loading product</div>
        <button
          onClick={() => {
            setError(false);
            setloading(true);
          }}
        >
          Refresh Page
        </button>
      </div>
    );
  }

  let currentPic;

  if (currentItem.images) {
    currentPic = hoveredPic ? hoveredPic : currentItem.image;
  } else {
    currentPic = hoveredPic ? `../assets/${hoveredPic}` : currentItem.image;
  }

  return (
    <section className={styles.productSection}>
      <div className={styles.subnav}>
        {" "}
        <div className={styles.subLink} onClick={() => navigate(-1)}>
          Home
        </div>{" "}
        <div className={styles.miniArrow}>
          <img src="../assets/icons8-arrow-19.png" alt="" />
        </div>{" "}
        <div className={styles.subLink}>
          {currentItem.category && capitalize(currentItem.category)}
        </div>
        <div className={styles.miniArrow}>
          <img src="../assets/icons8-arrow-19.png" alt="" />
        </div>
        <div className={styles.subLink}>
          {currentItem.title.length <= 23
            ? currentItem.title
            : currentItem.title.slice(0, 24) + "..."}
        </div>
      </div>

      <div className={styles.productContainer}>
        <div className={styles.leftSection}>
          <div className={styles.productPicDiv}>
            <div className={styles.sidePicDiv}>
              {currentItem.images && (
                currentItem.images.map((image) => (
                  <div
                    className={styles.subPicDiv}
                    onMouseEnter={() => setHoveredPic(image)}
                  >
                    <img src={image} alt={currentItem.title} />
                  </div>
                ))
              )}
            </div>

            <div className={styles.productPic}>
              <div className={styles.leftArrowDiv}>
                <img
                  className={styles.leftArrow}
                  src="../assets/icons8-arrow-19.png"
                  alt=""
                />
              </div>
              <div className={styles.picDiv}>
                <img className={styles.pic} src={currentPic} alt="" />
              </div>
              <div className={styles.rightArrowDiv}>
                <img src="../assets/icons8-arrow-19.png" alt="" />
              </div>
            </div>
          </div>

          <div className={styles.reviewSection}>
            <div className={styles.reviewHeader}>
              <div className={styles.reviewContainer}>
                <div className={styles.noReviews}>484 reviews</div>

                <div className={styles.line}></div>

                <div className={styles.ratingDiv}>
                  <RatingStars rating={currentItem.rating.rate} starColor="#000000"/>
                </div>
              </div>

              <div className={styles.verifyDiv}>
                All reviews are from verified purchases
              </div>
            </div>

            <div className={styles.subFeedDiv}>
              <div className={styles.feed}>Basic Shoe</div>{" "}
              <div className={styles.feed}>Lovely(265)</div>{" "}
              <div className={styles.feed}>Great Item</div>
            </div>

            <div className={styles.review}>
              <div className={styles.header}>
                <div>
                  <img src="" alt="" className={styles.reviewPic} />
                </div>
                <div className={styles.reviewName}>Emmanuel ONI</div>

                <div className={styles.logoDateDiv}>
                  <div>
                    <img
                      src="../assets/icons8-nigeria-flag-22.png"
                      alt=""
                      className={styles.flag}
                    />
                  </div>
                  <div className={styles.date}>on Mar 7, 2025</div>
                </div>
              </div>

              <div className={styles.starsDiv}>
                <RatingStars rating={4.5} starColor="#000000" width="19" height="19"/>
              </div>

              <div className={styles.reviewContent}>
                Great product as seen and very stylish. Thank you Flare.
              </div>
            </div>

            {currentItem.reviews &&
              currentItem.reviews.map((review) => (
                <div key={crypto.randomUUID()} className={styles.review}>
                  <div className={styles.header}>
                    <div>
                      <img src="" alt="" className={styles.reviewPic} />
                    </div>
                    <div className={styles.reviewName}>
                      {review.reviewerName}
                    </div>

                    <div className={styles.logoDateDiv}>
                      <div>
                        <img
                          src="../assets/icons8-nigeria-flag-22.png"
                          alt=""
                          className={styles.flag}
                        />
                      </div>
                      <div className={styles.date}>on Mar 7, 2025</div>
                    </div>
                  </div>

                  <div className={styles.starsDiv}>
                    {/* <img src="../assets/icons8-star-20.png" alt="" />
                    <img src="../assets/icons8-star-20.png" alt="" />
                    <img src="../assets/icons8-star-20.png" alt="" />
                    <img src="../assets/icons8-star-20.png" alt="" />
                    <img src="../assets/icons8-star-20.png" alt="" /> */}
                    <RatingStars rating={review.rating} starColor="#000000" width="19" height="19"/>
                  </div>

                  <div className={styles.reviewContent}>{review.comment}</div>
                </div>
              ))}

            <button className={styles.reviewsBtn}>See all reviews</button>
          </div>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.titleDescripDiv}>
            <div className={styles.title}>{currentItem.title}</div>{" "}
            <div className={styles.description}>{currentItem.description}</div>
          </div>

          <div className={styles.soldDiv}>
            <div className={styles.soldBy}>
              {currentItem.rating.rate}k+ sold - Best Seller arrow
            </div>
            <div className={styles.starsDiv}>4.7 stars</div>
          </div>

          <div className={styles.bestSeller}>
            Best-Selling currentItem in Mens shoe section
          </div>

          <div className={styles.allPriceDiv}>
            <div className={styles.price}>
              <span>Est.</span> &#8358;
              <span>
                {(currentItem.price * currentItem.discount).toFixed()}
              </span>{" "}
              after applying the promos to &#8358;<span>160,500</span> | Ends in
              50secs
            </div>

            <div className={styles.discount}>
              <span>&#8358;300,000</span> <div>{currentItem.discount}% off</div>{" "}
              <div>All most sold out</div>
            </div>
          </div>

          <div className={styles.qty}>
            {/* <div>Qty</div>{" "} */}
            {/* <div>
              <select name="" id="qty" value={1}>
                <option value="" disabled>
                  0
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
             
            </div> */}
             <QuantitySelect/>
          </div>

          <button
            className={styles.addToCartBtn}
            onClick={() => {
              if (!isInCart(currentItem) && add) {
                addToCart(currentItem);
                toast.success("Sucessfully Added to Cart")
              }
              else {
                toast.warning("Go to cart to increase quantity")
                setTimeout(() => {
                  setAdd(false)
                }, 300);
              } 
            }}
          >
            Add to cart!
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductPage;
