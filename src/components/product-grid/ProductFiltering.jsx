import React, { useState, useEffect } from "react";

const ProductFiltering = ({ products, setFilteredProducts }) => {
    // User selected colors from filter
    const [colors, setColors] = useState([]);
    // User selected Min and max price values from filter
    const [price, setPrice] = useState({});
    // Sets state for mobile menu
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        validate();
    }, [colors, price]);

    const filterByPrice = () => {
        return products.filter((product) => {
            // Gets discounted_price if available
            const productPrice = product.discounted_price || product.price;
            return (
                productPrice >= price.minValue && productPrice <= price.maxValue
            );
        });
    };

    const filterByColors = () => {
        return products.filter((product) => colors.includes(product.color));
    };

    const filterByPriceAndColor = () => {
        return filterByPrice().filter((product) =>
            filterByColors().includes(product)
        );
    };

    const getPrices = () => {
        // Returns discounted_price if available
        return products.map((product) => {
            return product.discounted_price !== undefined
                ? product.discounted_price
                : product.price;
        });
    };

    const getMaxProductPrice = () => {
        return Math.max(...getPrices());
    };

    const getMinProductPrice = () => {
        return Math.min(...getPrices());
    };

    // Validates user input to return / set the correct products
    const validate = () => {
        // If colors are set but no price input is provided
        if (filterByColors().length && !price.maxValue)
            return setFilteredProducts({
                products: filterByColors(),
                isFiltered: true,
            });

        // If the max price value is set but no color value is specified
        if (!filterByColors().length && price.maxValue)
            return setFilteredProducts({
                products: filterByPrice(),
                isFiltered: true,
            });

        // If both price and colors are set
        if (filterByColors().length && price.maxValue) {
            return setFilteredProducts({
                products: filterByPriceAndColor(),
                isFiltered: true,
            });
        }

        setFilteredProducts({ products: products, isFiltered: false });
    };

    const handleColorFilter = (event) => {
        const { value, checked } = event.target;

        // Adds and removes colors from colors state
        setColors((prevColors) =>
            checked
                ? [...prevColors, value]
                : prevColors.filter((color) => color !== value)
        );
    };

    // Saves the price input into state
    const handlePriceFilter = (event) => {
        // Saves user value input into state
        setPrice({
            ...price, // Adds existing elements back into state
            [event.target.name]: Number(event.target.value),
        });
    };

    return (
        <div className="sticky top-36 z-9">
            <div className="flex justify-between">
                <h2 className="text-2xl lg:text-4xl font-light mb-6">
                    Filter by
                </h2>

                {/* Mobile hamburger icon */}
                <div className="block lg:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
                    >
                        <svg
                            className={`w-5 h-5 text-gray-800 ${
                                isOpen ? "hidden" : "block"
                            }`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 8"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
                            />
                        </svg>
                        <svg
                            className={`fill-current h-5 w-5 ${
                                isOpen ? "block" : "hidden"
                            }`}
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div
                className={`lg:flex lg:flex-col ${isOpen ? "block" : "hidden"}`}
            >
                <div className="border-t border-gray-200 p-3 pt-5 pb-0">
                    {/* Colors filter */}
                    <span>Colors: </span>

                    <ul className="flex flex-row lg:flex-col mb-4 mt-4 lg:ml-4 flex-wrap">
                        {/* Creates a set to remove duplicates and renders each color */}
                        {[...new Set(products.map((product) => product.color))]
                            .sort()
                            .map((color, index) => (
                                <li
                                    key={index}
                                    className="flex items-center pt-2 pb-2 pl-4"
                                >
                                    <input
                                        id={color}
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                        onChange={handleColorFilter}
                                        value={color}
                                    />
                                    <label
                                        htmlFor={color}
                                        className="ml-2 text-sm font-medium text-gray-900"
                                    >
                                        {color}
                                    </label>
                                </li>
                            ))}
                    </ul>
                </div>

                <div className="border-t border-gray-200 p-3 pt-5 pb-5">
                    {/* Price filter */}
                    <span>Price: </span>

                    <div className="mb-4 mt-4 grid gap-4 grid-flow-col md:w-60">
                        <div className="md:w-28">
                            <span className="block text-sm mb-2">From</span>
                            <input
                                type="number"
                                placeholder={getMinProductPrice()}
                                className="border border-black w-full p-2 text-sm"
                                name="minValue"
                                onChange={handlePriceFilter}
                            ></input>
                        </div>

                        <div className="md:w-28">
                            <span className="block text-sm mb-2">To</span>
                            <input
                                type="number"
                                placeholder={getMaxProductPrice()}
                                className="border border-black w-full p-2 text-sm"
                                name="maxValue"
                                onChange={handlePriceFilter}
                            ></input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductFiltering;
