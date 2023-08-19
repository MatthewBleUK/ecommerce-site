import React, { useState } from "react";
import Select from "react-select";

const ProductSorting = ({ products, setSortedProducts }) => {
    const [sortCriteria, setSortCriteria] = useState(""); // Used to update state of HTML select value

    const options = [
        { value: "Featured", label: "Featured" },
        { value: "A-Z", label: "Alphabetical, A - Z" },
        { value: "Z-A", label: "Alphabetical, Z - A" },
        { value: "PriceAsc", label: "Price Ascending" },
        { value: "PriceDesc", label: "Price Descending" },
    ];

    const handleSort = (selectedOption) => {
        let sortedProducts = products;

        setSortCriteria(selectedOption.value);

        switch (selectedOption.value) {
            case "Featured":
                sortedProducts.sort((a, b) => a.id - b.id);
                break;
            case "A-Z":
                sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case "Z-A":
                sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case "PriceAsc":
                // Sorts price low to high, uses discounted_price if available
                sortedProducts.sort((a, b) => {
                    const aPrice =
                        a.discounted_price != undefined
                            ? a.discounted_price
                            : a.price;
                    const bPrice =
                        b.discounted_price != undefined
                            ? b.discounted_price
                            : b.price;

                    return aPrice - bPrice;
                });

                break;
            case "PriceDesc":
                // Sorts price high to low, uses discounted_price if available
                sortedProducts.sort((a, b) => {
                    const aPrice =
                        a.discounted_price != undefined
                            ? a.discounted_price
                            : a.price;
                    const bPrice =
                        b.discounted_price != undefined
                            ? b.discounted_price
                            : b.price;

                    return bPrice - aPrice;
                });

                break;
            default:
                break;
        }

        setSortedProducts({ products: sortedProducts, isSorted: true });
    };

    return (
        <div className="flex gap-2.5">
            <label className="gap-2 items-center flex">
                <svg width="16" height="12" viewBox="0 0 16 12">
                    <path d="M11.87 3.8a2.5 2.5 0 0 1-4.74 0H1.25a.75.75 0 1 1 0-1.5H7.1a2.5 2.5 0 0 1 4.8 0h2.85a.75.75 0 0 1 0 1.5h-2.88ZM10.5 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM.5 9.05c0-.41.34-.75.75-.75H4.1a2.5 2.5 0 0 1 4.8 0h5.85a.75.75 0 0 1 0 1.5H8.87a2.5 2.5 0 0 1-4.74 0H1.25a.75.75 0 0 1-.75-.75Zm6 .95a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path>
                </svg>
                Sort by:
            </label>
            <Select
                defaultValue={options[0]}
                options={options}
                value={options.find((option) => option.value === sortCriteria)}
                onChange={handleSort}
                className="sortByDropDown items-center w-36 sm:w-48"
            />
        </div>
    );
};

export default ProductSorting;
