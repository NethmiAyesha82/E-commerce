import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png';

const ListProduct = () => {

    const [allproduct, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchInfo = async () => {
        try {
            const res = await fetch('https://e-commerce-five-snowy-66.vercel.app/allproducts');

            if (!res.ok) {
                throw new Error(`HTTP Error: ${res.status}`);
            }

            const data = await res.json();
            setAllProducts(data);
        } catch (error) {
            console.error("Fetch Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    const remove_product = async (id) => {
        try {
            const response = await fetch(
                'https://e-commerce-five-snowy-66.vercel.app/removeproduct',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id }),
                }
            );

            await response.json();
            await fetchInfo();
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
                    <p style={{ textAlign: 'center' }}>Loading...</p>
                ) : allproduct.length > 0 ? (
                    allproduct.map((product) => (
                        <div key={product.id}>
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
                    ))
                ) : (
                    <p
                        style={{
                            textAlign: 'center',
                            marginTop: '20px',
                        }}
                    >
                        No products found.
                    </p>
                )}
            </div>
        </div>
    );
};

export default ListProduct;