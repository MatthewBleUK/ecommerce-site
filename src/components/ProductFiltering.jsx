import React, { useState, useEffect } from "react";

const ProductFiltering = ({ products, setFilteredProducts }) => {
    // User selected colors from filter
    const [colors, setColors] = useState([]);
    // User selected Min and max price values from filter
    const [price, setPrice] = useState({});

    useEffect(() => {
        validate();
    }, [colors, price]);

    const filterByPrice = () => {
        return products.filter(
            (product) =>
                product.price >= price.minValue &&
                product.price <= price.maxValue
        );
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
        return products.map((product) => product.price);
    };

    const getMaxProductPrice = () => {
        return Math.max(...getPrices());
    };

    const getMinProductPrice = () => {
        return Math.min(...getPrices());
    };

    // Validates user input to return / set the correct products
    const validate = () => {
        // If no filter is set
        if (!filterByColors().length && !price.maxValue)
            return setFilteredProducts(products);

        // If colors are set but no price input is provided
        if (filterByColors().length && !price.maxValue)
            return setFilteredProducts(filterByColors());

        // If the max price value is set but no color value is specified
        if (!filterByColors().length && price.maxValue)
            return setFilteredProducts(filterByPrice());

        // If both price and colors are set
        setFilteredProducts(
            filterByPriceAndColor(filterByPrice(), filterByColors())
        );
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
        <div className="flex flex-col w-72 relative mr-5">
            <h2 className="text-4xl font-light mb-6">Filter by</h2>

            <div className="border-t border-gray-200 p-3 pt-5 pb-0">
                {/* Colors filter */}
                <span>Colors: </span>

                <ul className="flex flex-col mb-4 mt-4 ml-4">
                    {/* Creates a set to remove duplicates and renders each color */}
                    {[...new Set(products.map((product) => product.color))].map(
                        (color, index) => (
                            <li
                                key={index}
                                className="flex items-center pt-2 pb-2"
                            >
                                <input
                                    id={color}
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    onChange={handleColorFilter}
                                    value={color}
                                />
                                <label
                                    htmlFor={color}
                                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    {color}
                                </label>
                            </li>
                        )
                    )}
                </ul>
            </div>

            <div className="border-t border-gray-200 p-3 pt-5 pb-5">
                {/* Price filter */}
                <span>Price: </span>

                <div className="mb-4 mt-4 grid gap-4 grid-flow-col">
                    <div className="">
                        <span className="block text-sm mb-2">From</span>
                        <input
                            type="number"
                            placeholder={getMinProductPrice()}
                            className="border border-black w-full p-2 text-sm"
                            name="minValue"
                            onChange={handlePriceFilter}
                        ></input>
                    </div>

                    <div className="">
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
    );
};

export default ProductFiltering;
