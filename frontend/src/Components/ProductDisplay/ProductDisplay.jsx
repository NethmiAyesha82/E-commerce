import React, { useContext, useState } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext'

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);

    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);

    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div className='productdisplay'>

            <div className="productdisplay-left">

                <div className="productdisplay-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>

                <div className="productdisplay-img">
                    <img
                        className='productdisplay-main-img'
                        src={product.image}
                        alt=""
                    />
                </div>

            </div>


            <div className="productdisplay-right">

                <h1>{product.name}</h1>


                <div className="productdisplay-right-stars">

                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />

                    <p>(122)</p>

                </div>


                <div className="productdisplay-right-prices">

                    <div className="productdisplay-right-price-old">
                        ${product.old_price}
                    </div>

                    <div className="productdisplay-right-price-new">
                        ${product.new_price}
                    </div>

                </div>


                <div className="productdisplay-right-description">

                    A lightweight, usually knitted, pullover shirt, close-fitting and with
                    a round neckline and short sleeves, worn as an undershirt or outer
                    garment.

                </div>


                {/* SIZE */}

                <div className="productdisplay-right-size">

                    <h1>Select Size</h1>

                    <div className="productdisplay-size-options">

                        {sizes.map((size) => (

                            <div
                                key={size}
                                className={
                                    selectedSize === size
                                        ? 'selected'
                                        : ''
                                }
                                onClick={() => setSelectedSize(size)}
                            >
                                {size}
                            </div>

                        ))}

                    </div>

                </div>


                {/* QUANTITY */}

                <div className="productdisplay-quantity">

                    <h1>Quantity</h1>

                    <div className="productdisplay-quantity-selector">

                        <button
                            onClick={decreaseQuantity}
                        >
                            -
                        </button>

                        <span>
                            {quantity}
                        </span>

                        <button
                            onClick={increaseQuantity}
                        >
                            +
                        </button>

                    </div>

                </div>


                {/* ADD TO CART */}

                <button
                    className="productdisplay-add-cart"
                    onClick={() => {

                        if (!selectedSize) {
                            alert('Please select a size');
                            return;
                        }

                        for (let i = 0; i < quantity; i++) {
                            addToCart(
                                product.id,
                                selectedSize
                            );
                        }

                    }}
                >
                    ADD TO CART
                </button>


                <p className='productdisplay-right-category'>

                    <span>Category :</span> {product.category}

                </p>


                <p className='productdisplay-right-category'>

                    <span>Tags :</span> Modern, Latest

                </p>

            </div>

        </div>
    )
}

export default ProductDisplay