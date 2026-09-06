import React, { useContext, useRef, useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import vart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import nav_dropdown from '../Assets/nav_dropdown.png';

export const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const { getTotalCartItems } = useContext(ShopContext);
    const menuRef = useRef();

    useEffect(() => {
        if (localStorage.getItem('admin-active')) {
            localStorage.removeItem('auth-token');
            localStorage.removeItem('admin-active');
            window.location.reload();
        }
    }, []);

    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    };

    const logout = () => {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('admin-active');
        window.location.replace('/');
    };

    return (
        <div className='navbar'>

            <div className="nav-logo">
                <img src={logo} alt="logo" />
                <p>TRENDLY</p>
            </div>

            <img
                className='nav-dropdown'
                onClick={dropdown_toggle}
                src={nav_dropdown}
                alt="menu"
            />

            <ul ref={menuRef} className="nav-menu">
                <li onClick={() => setMenu("shop")}>
                    <Link to='/'>COLLECTIONS</Link>
                    {menu === "shop" ? <hr /> : <></>}
                </li>

                <li onClick={() => setMenu("mens")}>
                    <Link to='/mens'>MEN</Link>
                    {menu === "mens" ? <hr /> : <></>}
                </li>

                <li onClick={() => setMenu("womens")}>
                    <Link to='/womens'>WOMEN</Link>
                    {menu === "womens" ? <hr /> : <></>}
                </li>

                <li onClick={() => setMenu("kids")}>
                    <Link to='/kids'>KIDS</Link>
                    {menu === "kids" ? <hr /> : <></>}
                </li>
            </ul>

            <div className="nav-login-cart">
                {localStorage.getItem('auth-token') ? (
                    <button onClick={logout}>Logout</button>
                ) : (
                    <Link to='/login'>
                        <button>Login</button>
                    </Link>
                )}

                <Link to='/cart'>
                    <img src={vart_icon} alt="cart" />
                </Link>

                <div className="nav-cart-count">
                    {getTotalCartItems()}
                </div>
            </div>

        </div>
    );
};

export default Navbar;