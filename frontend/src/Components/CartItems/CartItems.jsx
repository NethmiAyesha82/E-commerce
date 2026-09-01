import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

const CartItems = () => {

  const {
    getTotalCartAmount,
    all_product,
    cartItems,
    cartSizes,
    removeFromCart
  } = useContext(ShopContext);


  return (
    <div className='cartitems'>

      {/* CART HEADER */}

      <div className="cartitems-format-main">

        <p>Products</p>
        <p>Title</p>
        <p>Size</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>

      </div>

      <hr />


      {/* CART PRODUCTS */}

      {all_product.map((e) => {

        if (cartItems[e.id] > 0) {

          return (

            <div key={e.id}>

              <div className="cartitems-format cartitems-format-main">

                {/* PRODUCT IMAGE */}

                <img
                  src={e.image}
                  alt=""
                  className='carticon-product-icon'
                />


                {/* PRODUCT NAME */}

                <p>
                  {e.name}
                </p>


                {/* SELECTED SIZE */}

                <p className="cartitems-size">
                  {cartSizes[e.id] || 'N/A'}
                </p>


                {/* PRICE */}

                <p>
                  ${e.new_price}
                </p>


                {/* QUANTITY */}

                <div className="cartitems-quantity">
                  {cartItems[e.id]}
                </div>


                {/* TOTAL PRICE */}

                <p>
                  ${(e.new_price * cartItems[e.id]).toFixed(2)}
                </p>


                {/* REMOVE */}

                <img
                  className='carticons-remove-icon'
                  src={remove_icon}
                  alt="Remove"
                  onClick={() => removeFromCart(e.id)}
                />

              </div>

              <hr />

            </div>

          );

        }

        return null;

      })}


      {/* CART TOTAL */}

      <div className="cartitems-down">

        <div className="cartitems-total">

          <h1>
            Cart Totals
          </h1>


          <div>

            {/* SUBTOTAL */}

            <div className="cartitems-total-item">

              <p>
                Subtotal
              </p>

              <p>
                ${getTotalCartAmount().toFixed(2)}
              </p>

            </div>

            <hr />


            {/* SHIPPING */}

            <div className="cartitems-total-item">

              <p>
                Shipping Fee
              </p>

              <p>
                Free
              </p>

            </div>

            <hr />


            {/* TOTAL */}

            <div className="cartitems-total-item">

              <h3>
                Total
              </h3>

              <h3>
                ${getTotalCartAmount().toFixed(2)}
              </h3>

            </div>

          </div>


          {/* CHECKOUT */}

          <button>
            PROCEED TO CHECKOUT
          </button>

        </div>

      </div>

    </div>
  );
};


export default CartItems;