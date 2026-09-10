import React, { useEffect, useState, useRef } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png';

const ListProduct = () => {
    const [allproduct, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const bottomRef = useRef(null);

    const BACKEND_URL = "https://e-commerce-five-snowy-66.vercel.app";

    const fetchInfo = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${BACKEND_URL}/allproducts`, {
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!res.ok) {
                throw new Error(`HTTP Error: ${res.status}`);
            }

            const data = await res.json();
            
            const uniqueProducts = Array.from(
                new Map(data.map((item) => [item.id, item])).values()
            );

            setAllProducts(uniqueProducts);
        } catch (error) {
            console.error("Fetch Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    useEffect(() => {
        if (!loading && allproduct.length > 0) {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [allproduct, loading]);

    const remove_product = async (id) => {
        try {
            const response = await fetch(`${BACKEND_URL}/removeproduct`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            if (response.ok) {
                setAllProducts((prev) => prev.filter((p) => p.id !== id));
            }
        } catch (error) {
            console.error("Delete Error:", error);
        }
    };

    return (
        <div className="list-product">
            <h1>All Products List</h1>

            <div className="listproduct-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
            </div>

            <div className="listproduct-allproduct">
                <hr />

                {loading ? (
                    <p style={{ textAlign: 'center', padding: '20px' }}>Loading products...</p>
                ) : allproduct.length > 0 ? (
                    <>
                        {allproduct.map((product) => (
                            <div key={product._id || product.id}>
                                <div className="listproduct-format-main listproduct-format">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="listproduct-product-icon"
                                    />

                                    <p>{product.name}</p>
                                    <p>${product.old_price}</p>
                                    <p>${product.new_price}</p>
                                    <p>{product.category}</p>

                                    <img
                                        src={cross_icon}
                                        alt="remove"
                                        className="listproduct-remove-icon"
                                        onClick={() => remove_product(product.id)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                                <hr />
                            </div>
                        ))}
                        <div ref={bottomRef} />
                    </>
                ) : (
                    <p style={{ textAlign: 'center', marginTop: '20px' }}>No products found.</p>
                )}
            </div>
        </div>
    );
};

export default ListProduct;