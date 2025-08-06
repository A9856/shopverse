import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

export default function Navbar() {
    let navigate = useNavigate()

    function logout() {
        localStorage.removeItem("login")
        localStorage.removeItem("name")
        localStorage.removeItem("userid")
        localStorage.removeItem("role")
        navigate("/login")
    }
    return (
        <>
            <header id="header" className="header d-flex align-items-center fixed-top">
                <div className="container-fluid container-xl position-relative d-flex align-items-center">

                    <Link to="/" className="logo d-flex align-items-center me-auto">
                        {/* <img src="assets/img/logo.png" alt=""/> */}
                        <h1 className="sitename">{process.env.REACT_APP_SITE_NAME}</h1>
                    </Link>

                    <nav id="navmenu" className="navmenu">
                        <ul>
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/about">About</NavLink></li>
                            <li><NavLink to="/shop">Shop</NavLink></li>
                            <li><NavLink to="/services">Services</NavLink></li>
                            <li><NavLink to="/features">Features</NavLink></li>
                            <li><NavLink to="/testimonials">Testimonials</NavLink></li>
                            <li><NavLink to="/contactus">ContactUs</NavLink></li>
                        </ul>
                        <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
                    </nav>

                    {
                        localStorage.getItem("login") ?
                            <>
                                <nav id="navmenu" className="navmenu">
                                    <ul>
                                        <li className="dropdown"><a href="#"><span>{localStorage.getItem("name")}</span> <i className="bi bi-chevron-down toggle-dropdown"></i></a>
                                            <ul>
                                                <li><Link to={localStorage.getItem("role") === "Buyer" ? "/profile" : "/admin"}>Profile</Link></li>
                                                <li><Link to="/cart">Cart</Link></li>
                                                <li><Link to="/checkout">Checkout</Link></li>
                                                <li><button className='btn ms-2 text-dark' onClick={logout}>Logout</button></li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
                                </nav>

                            </> :
                            <Link className="cta-btn" to="/login">Login</Link>
                    }

                </div>
            </header>
        </>
    )
}
