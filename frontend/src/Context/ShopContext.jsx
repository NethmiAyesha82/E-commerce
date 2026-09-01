import React, {
  createContext,
  useState,
  useEffect
} from "react";

export const ShopContext = createContext(null);


const ShopContextProvider = (props) => {

  const [all_product, setAll_Product] =
    useState([]);

  const [cartItems, setCartItems] =
    useState({});

  const [cartSizes, setCartSizes] =
    useState({});


  /* =========================
     GET PRODUCTS + CART
     ========================= */

  useEffect(() => {

    /* GET ALL PRODUCTS */

    fetch("http://localhost:4000/allproduct")

      .then((response) =>
        response.json()
      )

      .then((data) => {

        setAll_Product(data);

      })

      .catch((error) => {

        console.error(
          "Error fetching products:",
          error
        );

      });


    /* GET USER CART */

    const token =
      localStorage.getItem("auth-token");


    if (token) {

      fetch(
        "http://localhost:4000/getcart",
        {
          method: "POST",

          headers: {

            Accept:
              "application/json",

            "auth-token":
              token,

            "Content-Type":
              "application/json"

          },

          body: JSON.stringify({})

        }
      )

        .then((response) =>
          response.json()
        )

        .then((data) => {

          console.log(
            "Cart from database:",
            data
          );

          setCartItems(data);

        })

        .catch((error) => {

          console.error(
            "Error getting cart:",
            error
          );

        });

    }

  }, []);


  /* =========================
     ADD TO CART
     ========================= */

  const addToCart = (
    itemId,
    selectedSize
  ) => {


    /* UPDATE FRONTEND */

    setCartItems((prev) => ({

      ...prev,

      [itemId]:
        (prev[itemId] || 0) + 1

    }));


    /* SAVE SIZE */

    setCartSizes((prev) => ({

      ...prev,

      [itemId]: selectedSize

    }));


    /* SAVE TO DATABASE */

    const token =
      localStorage.getItem(
        "auth-token"
      );


    if (token) {

      fetch(
        "http://localhost:4000/addtocart",
        {

          method: "POST",

          headers: {

            Accept:
              "application/json",

            "auth-token":
              token,

            "Content-Type":
              "application/json"

          },

          body: JSON.stringify({

            itemId: itemId

          })

        }
      )

        .then((response) =>
          response.json()
        )

        .then((data) => {

          console.log(
            "Add cart:",
            data
          );

        })

        .catch((error) => {

          console.error(
            "Error adding to cart:",
            error
          );

        });

    }

  };


  /* =========================
     REMOVE PRODUCT COMPLETELY
     ========================= */

  const removeFromCart = (
    itemId
  ) => {


    /* REMOVE FROM FRONTEND */

    setCartItems((prev) => {

      const updatedCart =
        { ...prev };

      delete updatedCart[itemId];

      return updatedCart;

    });


    /* REMOVE SIZE */

    setCartSizes((prev) => {

      const updatedSizes =
        { ...prev };

      delete updatedSizes[itemId];

      return updatedSizes;

    });


    /* REMOVE FROM DATABASE */

    const token =
      localStorage.getItem(
        "auth-token"
      );


    if (token) {

      fetch(
        "http://localhost:4000/removefromcart",
        {

          method: "POST",

          headers: {

            Accept:
              "application/json",

            "auth-token":
              token,

            "Content-Type":
              "application/json"

          },

          body: JSON.stringify({

            itemId: itemId

          })

        }
      )

        .then((response) =>
          response.json()
        )

        .then((data) => {

          console.log(
            "Remove cart:",
            data
          );

        })

        .catch((error) => {

          console.error(
            "Error removing from cart:",
            error
          );

        });

    }

  };


  /* =========================
     TOTAL CART AMOUNT
     ========================= */

  const getTotalCartAmount = () => {

    let totalAmount = 0;


    for (const item in cartItems) {

      if (cartItems[item] > 0) {

        const itemInfo =
          all_product.find(
            (product) =>
              product.id ===
              Number(item)
          );


        if (itemInfo) {

          totalAmount +=
            itemInfo.new_price *
            cartItems[item];

        }

      }

    }


    return totalAmount;

  };


  /* =========================
     CART COUNT
     
     Different products only
     ========================= */

  const getTotalCartItems = () => {

    let totalItem = 0;


    for (const item in cartItems) {

      if (cartItems[item] > 0) {

        totalItem += 1;

      }

    }


    return totalItem;

  };


  /* =========================
     CONTEXT VALUE
     ========================= */

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

    <ShopContext.Provider
      value={contextValue}
    >

      {props.children}

    </ShopContext.Provider>

  );

};


export default ShopContextProvider;