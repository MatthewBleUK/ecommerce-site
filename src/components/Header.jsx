import React, { useState, useContext } from "react";
import { Context } from "../App.jsx";

import { BrowserRouter, NavLink } from "react-router-dom";
import { useEffect } from "react";

function App({ navigationItems }) {
    // Sets state for mobile hamburger menu
    const [isOpen, setIsOpen] = useState(false);
    // Get cartCounter from useContext
    const [cartCounter, setCartCounter] = useContext(Context);

    useEffect(() => {
        // Calculates how many item quantities in cart
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        let counter = 0;

        for (let x in cart) {
            counter += cart[x].quantity;
        }

        setCartCounter(counter);
    }, []);

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
            {/* Logo */}
            <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-9">
                <div className="">
                    <a href="/">
                        <img
                            src="/logo-min.png"
                            className="w-100 h-10 mr-2"
                            alt="Logo"
                            width={145}
                            height={40}
                        />
                    </a>
                </div>
                {/* Mobile hamburger icon */}
                <div className="block lg:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
                    >
                        <svg
                            className={`fill-current h-6 w-6 ${
                                isOpen ? "hidden" : "block"
                            }`}
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                        </svg>
                        <svg
                            className={`fill-current h-6 w-6 ${
                                isOpen ? "block" : "hidden"
                            }`}
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                        </svg>
                    </button>
                </div>

                {/* navigation links */}
                <div
                    className={`w-full lg:flex lg:items-center lg:w-auto mt-4 lg:mt-0 ${
                        isOpen ? "block" : "hidden"
                    }`}
                >
                    <nav className="text-sm flex flex-col lg:flex-row lg:mt-0 relative top-4 lg:top-1 lg:items-center">
                        <BrowserRouter>
                            <NavLink
                                reloadDocument
                                to="/"
                                className={({ isActive, isPending }) =>
                                    isPending
                                        ? "pending"
                                        : isActive
                                        ? "mb-4 lg:mb-0 lg:mx-3 lg:border-b lg:border-gray-700 lg:pb-1.5 relative top-1"
                                        : "mb-4 lg:mb-0 lg:mx-3"
                                }
                            >
                                Home
                            </NavLink>
                            {navigationItems.map((item) => (
                                <NavLink
                                    reloadDocument
                                    key={item}
                                    to={item.toLowerCase()}
                                    className={({ isActive, isPending }) =>
                                        isPending
                                            ? "pending"
                                            : isActive
                                            ? "mb-4 lg:mb-0 lg:mx-3 lg:border-b lg:border-gray-700 lg:pb-1.5 relative top-1"
                                            : "mb-4 lg:mb-0 lg:mx-3"
                                    }
                                >
                                    {item}
                                </NavLink>
                            ))}

                            <NavLink
                                reloadDocument
                                to="cart"
                                className={({ isActive, isPending }) =>
                                    isPending
                                        ? "pending"
                                        : isActive
                                        ? "mb-4 lg:mb-0 lg:mx-3 lg:hidden"
                                        : "mb-4 lg:mb-0 lg:mx-3 lg:hidden"
                                }
                            >
                                Cart
                            </NavLink>
                        </BrowserRouter>
                    </nav>
                </div>

                {/* Right side cart, profile and search icons */}
                <div id="header-icons" className="hidden lg:flex">
                    <a
                        href="#"
                        className="px-4 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 duration-300"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M18 9.5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-1.736 6.024a8 8 0 1 1 .71-.704l4.62 4.62a.5.5 0 1 1-.707.706l-4.623-4.622Z"
                            ></path>
                        </svg>
                    </a>

                    <a
                        href="#"
                        className="px-4 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 duration-300"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M16 5.5a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm1 0a5 5 0 1 1-10 0 5 5 0 0 1 10 0Zm-12.5 14c0-2.143.486-3.732 1.596-4.796C7.212 13.634 9.058 13 12 13c2.942 0 4.788.635 5.904 1.704 1.11 1.064 1.596 2.652 1.596 4.796a.5.5 0 0 0 1 0c0-2.275-.514-4.186-1.904-5.518C17.212 12.656 15.058 12 12 12c-3.058 0-5.212.656-6.596 1.982C4.014 15.314 3.5 17.225 3.5 19.5a.5.5 0 0 0 1 0Z"
                            ></path>
                        </svg>
                    </a>

                    <a
                        href="/cart"
                        className="px-4 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 duration-300"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24">
                            <circle cx="16.75" cy="19.949" r=".75"></circle>
                            <circle cx="9.75" cy="19.949" r=".75"></circle>
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M18 18.2a.5.5 0 0 0 0-1h-7.99a2.5 2.5 0 0 1-2.46-2.06l-.123-.688h9.16a2.5 2.5 0 0 0 2.355-1.66l1.55-4.34a1.5 1.5 0 0 0-1.413-2.004H5.997l-.065-.364A3.5 3.5 0 0 0 2.488 3.2h-.99a.5.5 0 1 0 0 1h.99a2.5 2.5 0 0 1 2.46 2.06l1.617 9.057a3.5 3.5 0 0 0 3.446 2.884H18ZM6.176 7.45l12.903-.001a.5.5 0 0 1 .47.668l-1.548 4.34a1.5 1.5 0 0 1-1.413.996h-9.34L6.176 7.45Z"
                            ></path>
                        </svg>
                        <div className="absolute">
                            {cartCounter > 0 ? (
                                <span className="bg-white text-black border text-xs relative bottom-9 left-4 py-0.5 px-1.5 rounded-full">
                                    {cartCounter}
                                </span>
                            ) : (
                                <></>
                            )}
                        </div>
                    </a>
                </div>
            </div>
        </header>
    );
}
export default App;
