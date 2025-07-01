import React, { useState, useEffect, useMemo } from "react";
import styles from "./App.module.css";
import axios from "axios";
import Navbar from "./components/Navbar/Navbar";
import CardList from "./components/CardList/CardList";
import SignIn from "./Pages/SignIn/SignInPage";
import ProductPage from "./Pages/Product/ProductPage";
import { Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import CartPage from "./Pages/Cart/CartPage";
import Loader from "./components/Loader/Loader";
import { toast } from "react-toastify";
import { useNetworkState } from "react-use";

function App() {
  const [items, setItems] = useState([]);
  const [categoryNames, setCategoryNames] = useState([]);
  const [categoryMap, setCategoryMap] = useState(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(false);
  const network = useNetworkState()
  const isSlowConnection = network.effectiveType === "slow-3g" || network.effectiveType === "3g" || (network.downlink && network.downlink < 1.5)
  const c = [];
  let categories;
  const location = useLocation();
  const hideNavbar = ["/sign-in"].includes(location.pathname);

  const capitalize = (str) => {
    return str[0].toUpperCase() + str.slice(1, str.length);
  };


  useEffect(() => {
    try {
      // throw new Error("Error")
      // setLoading(true);
      axios.get("https://fakestoreapi.com/products?limit=40").then((res) => {
        res.data && setItems(res.data);
        // console.log(res.data)
      });

      axios.get("https://dummyjson.com/products?limit=190").then((res) => {
        console.log(res.data);
        const products = res.data.products.map((product) => {
          return {
            id: `${product.id}-${product.title}`,
            title: product.title,
            image: product.thumbnail,
            description: product.description,
            price: product.price,
            rating: { rate: product.rating },
            discount: product.discountPercentage,
            category: product.category,
            images: product.images,
            availabilityStatus: product.availabilityStatus,
            brand: product.brand,
            stock: product.stock,
            tags: product.tags,
            reviews: product.reviews,
          };
        });

        products && setItems((prev) => [...prev, ...products]);

        categories = res.data.products.map((product) => product.category);
        categories = Array.from(new Set(categories)).map((category) => {
          const categoryItems = res.data.products.filter((product) => {
            return product.category === category;
          });

          // categoryMap.set(category, categoryItems);
          setCategoryMap((prev) =>
            prev.set(capitalize(category), categoryItems)
          );
          // setCategoryMap(categoryM);
        });
        // console.log(categoryMap);
        for (let [category, _] of categoryMap) c.push(capitalize(category));
        // console.log(categoryNames);
        setCategoryNames(c);
      });

      items.length > 0 && toast.success("Content Loaded Sucessfully");
    } catch (error) {
      toast.error("An Error Occurred");
    } finally {
      setLoading(false);
    }
  }, [reload]);

  // useEffect(() => {
  //   axios.get("https://fakestoreapi.com/products?limit=40").then((res) => {
  //     setItems(res.data);
  //     // console.log(res.data)
  //   });
  // }, []);

  // useEffect(() => {
  //   axios.get("https://dummyjson.com/products?limit=190").then((res) => {
  //     console.log(res.data);

  //     const products = res.data.products.map((product) => {
  //       return {id: product.id, title: product.title, image: product.thumbnail, description: product.description, price: product.price, rating: {rate: product.rating}, discount: product.discountPercentage}
  //     })

  //     setItems((prev) => [...prev, ...products])

  //   });
  // }, []);

  // if (items.length === 0) {
  //   toast.error("An error due to connection occured");
  //   return (
  //     <div className={styles.errorContainer}>
  //       <div className={styles.errorContent}>An error occured when trying to get the items</div>
  //       <button className={styles.errorBtn} onClick={() => setReload(!reload)}>
  //         Click here to Refresh the page
  //       </button>
  //     </div>
  //   );
  // }

  useEffect(() => {
    if (!isSlowConnection || items.length > 0) {
    toast.success("Content Loaded Sucessfully")
    
  } else if (isSlowConnection) {
    toast.error("Check your network connection")
  } else {
    setReload(true)
  }
  }, [reload])
  
 


  return (
    <div className={styles.App}>
      <CartProvider>
        {!hideNavbar && (
          <Navbar categoryNames={categoryNames} categoryMap={categoryMap} />
        )}
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route
            path="/"
            element={
              loading ? <Loader theme="blue" /> : <CardList items={items} isSlowConnection={isSlowConnection}/>
            }
          />
          <Route
            path="/item/:id"
            element={<ProductPage items={items} capitalize={capitalize} />}
          />
          <Route
            path="/cart"
            element={
              <CartPage capitalize={capitalize} />
            }
          />
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;
