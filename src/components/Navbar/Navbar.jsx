import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCartContext } from "../../contexts/CartContext";

function Navbar({ categoryNames, categoryMap }) {
  // const categoryNames = [
  //   "Women's Shoes",
  //   "Women's Curve Clothing",
  //   "Women's Lingerie & Lounge",
  //   "Men's Big & Tall",
  //   "Men's Underwear & Sleepwear",
  //   "Sports & Outdoors",
  //   "Jewelry & Acessories",
  //   "Beauty & Health",
  //   "Toys & Games",
  // ];

  // const [categoryNames, setCategoryNames] = useState([]);
  // const [categoryMap, setCategoryMap] = useState(new Map());
  // const c = [];

  const { cart } = useCartContext()
  const [openDropdown, setOpenDropDown] = useState(false);
  const [openSupport, setOpenSupport] = useState(false);
  const [openSearchDropDown, setOpenSearchDropDown] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState("");
  const [scrollDir, setScrollDir] = useState(null);
  const navigate = useNavigate()
  let categories;
  // let categoryMap = new Map();

  const toggleDropDownmenu = () => {
    setOpenDropDown(!openDropdown);
  };

  const toggleSupportMenu = () => {
    setOpenSupport(!openSupport);
    // console.log((Math.random() * 10).toFixed())
  };

  const capitalize = (str) => {
    return str[0].toUpperCase() + str.slice(1, str.length);
  };

  useEffect(() => {
    (openDropdown || openSupport) && setOpenSearchDropDown(false);
  }, [openDropdown, openSupport]);
  

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setScrollDir('down');
      } else if (currentScrollY < lastScrollY) {
        setScrollDir('up');
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <>
      <nav className={styles.navbar} style={{position: scrollDir === 'down' ? 'stick' : 'relative', top: "150"}}>
        {(openDropdown || openSupport || openSearchDropDown) && (
          <div
            className={styles.overlay}
            onClick={() => {
              setOpenSearchDropDown(false);
              setOpenDropDown(false);
              setOpenSupport(false);
            }}
          ></div>
        )}

        <div className={styles.leftSectionMobile}>
          <div className={styles.arrowDiv} onClick={() => navigate(-1)}>
            <img src="../assets/icons8-left-arrow-37.png" alt="" />
          </div>

          <div className={styles.secondLogo}>FLARE</div>
        </div>

        <ul className={styles.leftSection}>
          {/* <div className={styles.arrowDiv}>
            <img src="../assets/icons8-left-arrow-37.png" alt="" />
          </div>

          <div className={styles.secondLogo}>TEMU</div> */}

          <li>

            <Link to={"/"}>
            <div className={styles.logoDiv}>
              <img src="../assets/flare-high-resolution-logo-transparent.png" alt="" />
            </div>
            </Link>
            
          </li>
          <li className={styles.link}>
            <div>
              <img src="../assets/icons8-best-19.png" alt="" />
            </div>{" "}
            <div>Best-Selling Items</div>
          </li>

          <li className={styles.link}>
            <div>
              <img src="../assets/icons8-rating-19.png" alt="" />
            </div>{" "}
            <div>5-Star Rated</div>
          </li>

          <li className={styles.link}>
            <div>
              <img src="../assets/icons8-discount-19.png" alt="" />
            </div>{" "}
            <div>Special Offers</div>
          </li>

          <li className={styles.new}>
            <div>New Arrivals</div>
          </li>

          <li
            onMouseEnter={() => {
              toggleDropDownmenu();
              setHoveredCategory(categoryNames[(Math.random() * 10).toFixed()]);
              console.log(categoryNames[(Math.random() * 10).toFixed()]);
            }}
            onMouseLeave={toggleDropDownmenu}
            className={`${styles.link} ${styles.categoryContainer}`}
          >
            <div className={styles.title}>Categories</div>
            <div className={styles.arrow}>
              <img src="../assets/icons8-arrow-down-10.png" alt="" />
            </div>

            <div
              className={`${styles.dropDownMenu} ${
                openDropdown && styles.dropDownMenuActive
              }`}
            >
              <div className={styles.categoryNames}>
                <div className={styles.categoryNameContainer}>
                  <div className={styles.categoryName}>Women's Shoes</div>
                  <img src="../assets/icons8-right-arrow-11.png" alt="" />
                </div>

                <div className={styles.categoryNameContainer}>
                  <div className={styles.categoryName}>Men's Clothing</div>
                  <img src="../assets/icons8-right-arrow-11.png" alt="" />
                </div>

                {categoryNames.map((categoryName, id) => {
                  return (
                    <div
                      key={`name-${id}`}
                      className={`${styles.categoryNameContainer} ${
                        hoveredCategory === categoryName &&
                        styles.hoveredCategoryContainer
                      }`}
                      onMouseEnter={() => setHoveredCategory(categoryName)}
                    >
                      <div className={styles.categoryName}>{categoryName}</div>
                      <img src="../assets/icons8-right-arrow-11.png" alt="" />
                    </div>
                  );
                })}

                <div className={styles.categoryNameContainer}>
                  <div className={styles.categoryName}>Men's Shoes</div>
                  <img src="../assets/icons8-right-arrow-11.png" alt="" />
                </div>
              </div>
              <div className={styles.categoryItemsContainer}>
                <div className={styles.titleDiv}>
                  <h2 className={styles.categoryTitle}>
                    All {hoveredCategory}
                  </h2>
                  <img
                    width="15"
                    height="15"
                    src="https://img.icons8.com/ios-filled/50/forward--v1.png"
                    alt="forward--v1"
                  />
                </div>

                <div className={styles.itemsContainer}>
                  {typeof hoveredCategory === "string" &&
                    hoveredCategory.length > 0 &&
                    categoryMap.get(hoveredCategory).map((product) => {
                      return (
                        <div className={styles.item} key={crypto.randomUUID()}>
                          <div className={styles.imageDiv}>
                            <img src={product.thumbnail} alt="" />
                          </div>
                          <div className={styles.itemName}>
                            {product.title}
                            <br />
                          </div>
                        </div>
                      );
                    })}

                  {/* <div className={styles.item}>
                    <div className={styles.imageDiv}>
                      <img
                        src="../assets/jason-briscoe-GliaHAJ3_5A-unsplash.jpg"
                        alt=""
                      />
                    </div>
                    <div className={styles.itemName}>Kitchen</div>
                  </div>

                  <div className={styles.item}>
                    <div className={styles.imageDiv}>
                      <img
                        src="../assets/lotus-design-n-print-oCw5_evbWyI-unsplash.jpg"
                        alt=""
                      />
                    </div>
                    <div className={styles.itemName}>Kitchen</div>
                  </div>

                  <div className={styles.item}>
                    <div className={styles.imageDiv}>
                      <img
                        src="../assets/lotus-design-n-print-UDDULE_eIBY-unsplash.jpg"
                        alt=""
                      />
                    </div>
                    <div className={styles.itemName}>Kitchen</div>
                  </div>

                  <div className={styles.item}>
                    <div className={styles.imageDiv}>
                      <img
                        src="../assets/collov-home-design--aDGbdTsBZg-unsplash.jpg"
                        alt=""
                      />
                    </div>
                    <div className={styles.itemName}>Kitchen</div>
                  </div>

                  <div className={styles.item}>
                    <div className={styles.imageDiv}>
                      <img
                        src="../assets/sven-brandsma-3hEGHI4b4gg-unsplash.jpg"
                        alt=""
                      />
                    </div>
                    <div className={styles.itemName}>Kitchen</div>
                  </div>

                  <div className={styles.item}>
                    <div className={styles.imageDiv}>
                      <img
                        src="../assets/roam-in-color-zzMb7jacyBc-unsplash.jpg"
                        alt=""
                      />
                    </div>
                    <div className={styles.itemName}>Kitchen</div>
                  </div>

                  <div className={styles.item}>
                    <div className={styles.imageDiv}>
                      <img
                        src="../assets/roam-in-color-zzMb7jacyBc-unsplash.jpg"
                        alt=""
                      />
                    </div>
                    <div className={styles.itemName}>Kitchen</div>
                  </div>

                  <div className={styles.item}>
                    <div className={styles.imageDiv}>
                      <img
                        src="../assets/roam-in-color-zzMb7jacyBc-unsplash.jpg"
                        alt=""
                      />
                    </div>
                    <div className={styles.itemName}>Kitchen</div>
                  </div>

                  <div className={styles.item}>
                    <div className={styles.imageDiv}>
                      <img
                        src="../assets/roam-in-color-zzMb7jacyBc-unsplash.jpg"
                        alt=""
                      />
                    </div>
                    <div className={styles.itemName}>Kitchen</div>
                  </div>

                  <div className={styles.item}>
                    <div className={styles.imageDiv}>
                      <img
                        src="../assets/roam-in-color-zzMb7jacyBc-unsplash.jpg"
                        alt=""
                      />
                    </div>
                    <div className={styles.itemName}>Kitchen</div>
                  </div> */}
                </div>
              </div>
            </div>
          </li>
        </ul>

        <div className={styles.rightSection}>
          <div
            onClick={() => setOpenSearchDropDown(!openSearchDropDown)}
            className={styles.inputDiv}
          >
            <input type="text" placeholder="search" />
            <div
              tabindex="0"
              role="button"
              className={styles.searchDiv}
              aria-label="Submit search"
            >
              <svg
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                className={styles.searchIcon}
                alt="common_successful"
                aria-label="Search "
              >
                <path d="M486.4 102.4c212.1 0 384 171.9 384 384 0 78.4-23.5 151.3-63.8 212l147.5 132.4c21 18.9 22.8 51.3 3.9 72.3-17.4 19.4-46.4 22.4-67.2 7.9l-5.1-4-146.5-131.5c-67.5 59.1-156 94.9-252.8 94.9-212.1 0-384-171.9-384-384 0-212.1 171.9-384 384-384z m0 102.4c-155.5 0-281.6 126.1-281.6 281.6 0 155.5 126.1 281.6 281.6 281.6 155.5 0 281.6-126.1 281.6-281.6 0-155.5-126.1-281.6-281.6-281.6z"></path>
              </svg>
            </div>

            <div
              className={`${styles.searchDropDownMenu} ${
                openSearchDropDown && styles.searchDropDownMenuActive
              }`}
            >
              <div className={styles.recentlyContainer}>
                <div className={styles.recentlyHeader}>
                  <div className={styles.recently}>Recently searched</div>{" "}
                  <div className={styles.deleteButtonDiv}>
                    <img src="../assets/icons8-delete-18.png" alt="" />
                  </div>
                </div>

                <div className={styles.searchedItemsContainer}>
                  <div className={styles.searchedItem}>
                    <div className={styles.itemPicDiv}>
                      <img src="../assets/red-shoe.jpg" alt="" />
                    </div>
                    <div className={styles.searchedItemName}>shoe</div>
                  </div>

                  <div className={styles.searchedItem}>
                    <div className={styles.itemPicDiv}>
                      <img
                        src="../assets/fabian-heimann-4R_WEmhx8og-unsplash.jpg"
                        alt=""
                      />
                    </div>
                    <div className={styles.searchedItemName}>Watch</div>
                  </div>

                  <div className={styles.searchedItem}>
                    <div className={styles.itemPicDiv}>
                      <img
                        src="../assets/jason-briscoe-GliaHAJ3_5A-unsplash.jpg"
                        alt=""
                      />
                    </div>
                    <div className={styles.searchedItemName}>
                      kitchen & utensils
                    </div>
                  </div>

                  <div className={styles.searchedItem}>
                    <div className={styles.itemPicDiv}>
                      <img
                        src="../assets/alexandar-todov-vDTgx5wJwao-unsplash.jpg"
                        alt=""
                      />
                    </div>
                    <div className={styles.searchedItemName}>
                      phone accessories
                    </div>
                  </div>

                  <div className={styles.searchedItem}>
                    <div className={styles.itemPicDiv}>
                      <img
                        src="../assets/rezwan-ahmed-C1uFlpNdQh0-unsplash.jpg"
                        alt=""
                      />
                    </div>
                    <div className={styles.searchedItemName}>
                      gaming gadgets
                    </div>
                  </div>

                  <div className={styles.searchedItem}>
                    <div className={styles.itemPicDiv}>
                      <img
                        src="../assets/yang-deng-2loKxdi6Hmo-unsplash.jpg"
                        alt=""
                      />
                    </div>
                    <div className={styles.searchedItemName}>cap</div>
                  </div>
                </div>
              </div>

              <div className={styles.recentlyContainer}>
                <div className={styles.recentlyHeader}>
                  <div className={styles.recently}>Popular right now</div>{" "}
                </div>

                <div className={styles.searchedItemsContainer}>
                  <div className={styles.searchedItem}>
                    <div className={styles.itemPicDiv}>
                      <img
                        src="../assets/ruan-richard-rodrigues-m7D_mI4bgeI-unsplash.jpg"
                        alt=""
                      />
                    </div>
                    <div className={styles.searchedItemName}>
                      men accessories for men
                    </div>
                  </div>

                  <div className={styles.searchedItem}>
                    <div className={styles.itemPicDiv}>
                      <img
                        src="../assets/charlesdeluvio-1-nx1QR5dTE-unsplash.jpg"
                        alt=""
                      />
                    </div>
                    <div className={styles.searchedItemName}>shades</div>
                  </div>

                  <div className={styles.searchedItem}>
                    <div className={styles.itemPicDiv}>
                      <img
                        src="../assets/mahdi-bafande-XCU9ZV_ys5w-unsplash.jpg"
                        alt=""
                      />
                    </div>
                    <div className={styles.searchedItemName}>mens clothes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.hamburgerMenu}>
            <div>
              <img
                src="../assets/icons8-menu-vertical-31.png"
                alt=""
                className={styles.vertical}
              />
            </div>
            <div>
              <img src="../assets/icons8-menu-31.png" alt="" />
            </div>
          </div>

          <Link to={"/sign-in"} className={styles.orderLink}>
            <div className={styles.orderAccountContainer}>
              <div className={styles.iconDiv}>
                <img
                  src="../assets/icons8-user-30.png"
                  alt=""
                  className={styles.userPicOne}
                />
                <img
                  src="../assets/icons8-user-31.png"
                  alt=""
                  className={styles.userPicTwo}
                />
              </div>
              <div className={styles.orderContainer}>Order & Account</div>

              <div className={styles.signINContainer}></div>
            </div>
          </Link>

          <div
            onMouseEnter={toggleSupportMenu}
            onMouseLeave={toggleSupportMenu}
            className={styles.supportContainer}
          >
            <div className={styles.iconDiv}>
              <svg
                className={styles.supportIcon}
                alt=""
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                viewBox="0 0 1024 1024"
                width="1em"
                height="1em"
                fill="#222222"
              >
                <path d="M512 107.4c212.1 0 384 171.9 384 384 0 212.1-171.9 384-384 384-31.4 0-62.4-3.8-92.4-11.2l11.8 2.6-82.6 25c-38.6 11.7-79.2-8.5-93.7-45.3l-2.1-6c-2.3-7.6-3.4-15.4-3.3-23.3l0.7-44.8-3.8-3.5c-71.8-68.7-114.9-162.8-118.4-264.3l-0.2-13.2c0-212.1 171.9-384 384-384z m0 85.3c-164.9 0-298.7 133.7-298.7 298.7 0 89.7 39.8 172.9 107.4 229.3 9.9 8.2 15.5 20.5 15.3 33.3l-0.8 52.7 82.3-24.8c5.5-1.7 11.3-2.2 17-1.6l5.6 1c23.3 5.8 47.4 8.7 71.9 8.7 164.9 0 298.7-133.7 298.7-298.6 0-164.9-133.7-298.7-298.7-298.7z m-81.7 343.5c12.1 33.6 44 56.5 80.3 56.5 34 0 64.2-20 77.8-50.2l2.5-6.1c8-22.2 32.5-33.6 54.6-25.6 22.2 8 33.6 32.5 25.7 54.6-24.2 67.1-88.1 112.7-160.6 112.6-72.6 0-136.5-45.8-160.7-113-8-22.2 3.6-46.6 25.8-54.5 22.2-8 46.6 3.6 54.6 25.7z"></path>
              </svg>
            </div>
            <div className={styles.support}>Support</div>

            <div
              className={`${styles.supportMenu} ${
                openSupport && styles.dropDownMenuActive
              }`}
            >
              <div className={styles.supportLink}>Support Center</div>
              <div className={styles.supportLink}>Safety Center</div>
              <div className={styles.supportLink}>Chat with Flare</div>
              <div className={styles.supportLink}>Flare purchase protection</div>
              <div className={styles.supportLink}>privacy policy</div>
              <div className={styles.supportLink}>Terms of use</div>
            </div>
          </div>

          <Link to={"/cart"}>
            <div className={styles.cartDiv}>
              <img src="../assets/icons8-cart-31.png" alt="" />
              {cart.length > 0 && <div className={styles.cartCount}>{cart.length}</div>}
            </div>
          </Link>

        </div>
      </nav>
      {/* <div className={styles.notification}>
        <div>
          <img src="../assets/icons8-success-24.png" alt="" />
        </div>
        Successfully saved!
      </div> */}
    </>
  );
}

export default Navbar;
