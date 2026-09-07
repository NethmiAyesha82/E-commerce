import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

const BASE_URL = "https://e-commerce-five-snowy-66.vercel.app";

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [cartSizes, setCartSizes] = useState({});

  useEffect(() => {
    fetch(`${BASE_URL}/allproducts`)
      .then((response) => response.json())
      .then((data) => {
        // Unique products පමණක් filter කරගන්නා logic එක
        const uniqueProducts = Array.from(
          new Map(data.map((item) => [item.id, item])).values()
        );
        setAll_Product(uniqueProducts);
      })
      .catch((error) => console.error("Error fetching products:", error));

    const token = localStorage.getItem("auth-token");

    if (token) {
      fetch(`${BASE_URL}/getcart`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({})
      })
        .then((response) => response.json())
        .then((data) => setCartItems(data))
        .catch((error) => console.error("Error getting cart:", error));
    }
  }, []);

  const addToCart = (itemId, selectedSize) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));

    setCartSizes((prev) => ({
      ...prev,
      [itemId]: selectedSize
    }));

    const token = localStorage.getItem("auth-token");

    if (token) {
      fetch(`${BASE_URL}/addtocart`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ itemId: itemId })
      })
        .then((response) => response.json())
        .then((data) => console.log("Add cart:", data))
        .catch((error) => console.error("Error adding to cart:", error));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      delete updatedCart[itemId];
      return updatedCart;
    });

    setCartSizes((prev) => {
      const updatedSizes = { ...prev };
      delete updatedSizes[itemId];
      return updatedSizes;
    });

    const token = localStorage.getItem("auth-token");

    if (token) {
      fetch(`${BASE_URL}/removefromcart`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ itemId: itemId })
      })
        .then((response) => response.json())
        .then((data) => console.log("Remove cart:", data))
        .catch((error) => console.error("Error removing from cart:", error));
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += 1;
      }
    }
    return totalItem;
  };

  const contextValue = {
    all_product,
    cartItems,
    cartSizes,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;