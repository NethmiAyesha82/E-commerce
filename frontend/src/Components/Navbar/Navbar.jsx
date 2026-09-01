import React, { useContext, useRef, useState } from 'react';

import './Navbar.css';

import logo from '../Assets/logo.png';

import vart_icon from '../Assets/cart_icon.png';

import { Link } from 'react-router-dom';

import { ShopContext } from '../../Context/ShopContext';

import nav_dropdown from '../Assets/nav_dropdown.png';


export const Navbar = () => {

    const [menu, setMenu] = useState("shop");

    const {
        getTotalCartItems
    } = useContext(ShopContext);

    const menuRef = useRef();


    /* =========================
       MOBILE MENU
       ========================= */

    const dropdown_toggle = (e) => {

        menuRef.current.classList.toggle(
            'nav-menu-visible'
        );

        e.target.classList.toggle('open');

    };


    /* =========================
       LOGOUT
       ========================= */

    const logout = () => {

        localStorage.removeItem('auth-token');

        window.location.replace('/');

    };


    return (

        <div className='navbar'>


            {/* =========================
                LOGO
               ========================= */}

            <div className="nav-logo">

                <img
                    src={logo}
                    alt="logo"
                />

                <p>TRENDLY</p>

            </div>


            {/* =========================
                DROPDOWN
               ========================= */}

            <img
                className='nav-dropdown'
                onClick={dropdown_toggle}
                src={nav_dropdown}
                alt="menu"
            />


            {/* =========================
                NAV MENU
               ========================= */}

            <ul
                ref={menuRef}
                className="nav-menu"
            >

                {/* COLLECTIONS */}

                <li
                    onClick={() => {
                        setMenu("shop");
                    }}
                >

                    <Link to='/'>
                        COLLECTIONS
                    </Link>

                    {menu === "shop"
                        ? <hr />
                        : <></>
                    }

                </li>


                {/* MEN */}

                <li
                    onClick={() => {
                        setMenu("mens");
                    }}
                >

                    <Link to='/mens'>
                        MEN
                    </Link>

                    {menu === "mens"
                        ? <hr />
                        : <></>
                    }

                </li>


                {/* WOMEN */}

                <li
                    onClick={() => {
                        setMenu("womens");
                    }}
                >

                    <Link to='/womens'>
                        WOMEN
                    </Link>

                    {menu === "womens"
                        ? <hr />
                        : <></>
                    }

                </li>


                {/* KIDS */}

                <li
                    onClick={() => {
                        setMenu("kids");
                    }}
                >

                    <Link to='/kids'>
                        KIDS
                    </Link>

                    {menu === "kids"
                        ? <hr />
                        : <></>
                    }

                </li>

            </ul>


            {/* =========================
                LOGIN / LOGOUT + CART
               ========================= */}

            <div className="nav-login-cart">


                {/* LOGIN / LOGOUT */}

                {localStorage.getItem('auth-token') ? (

                    <button
                        onClick={logout}
                    >
                        Logout
                    </button>

                ) : (

                    <Link to='/login'>

                        <button>
                            Login
                        </button>

                    </Link>

                )}


                {/* =========================
                    CART ICON
                   ========================= */}

                <Link to='/cart'>

                    <img
                        src={vart_icon}
                        alt="cart"
                    />

                </Link>


                {/* =========================
                    CART COUNT
                    
                    Different products
                    count wenawa.
                   ========================= */}

                <div className="nav-cart-count">

                    {getTotalCartItems()}

                </div>


            </div>

        </div>

    );

};


export default Navbar;