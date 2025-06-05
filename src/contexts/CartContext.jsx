import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    try {
      const storedItems = localStorage.getItem("cart");

      if (storedItems) setCart(JSON.parse(storedItems));
    } catch (err) {
      console.log("Error parsing cart from localstorage", err);
    //   localStorage.removeItem("cart");
    //   setCart([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    if (item) setCart((prev) => [...prev, item]);
  };

  const deleteFromCart = (item) => {
    const filteredCart = cart.filter((product) => product.id !== item.id);
    setCart(filteredCart);
  };

  const isInCart = (item) => {
    return cart.some((product) => product.id === item.id);
  };

  const logCartState = () => {
    console.log("Current cart state:", cart);
    console.log("localStorage cart:", localStorage.getItem("cart"));
  };

  const value = {
    cart,
    addToCart,
    deleteFromCart,
    isInCart,
    logCartState,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
