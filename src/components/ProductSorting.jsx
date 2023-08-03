import React, { useState } from "react";
import Select from "react-select";

const ProductSorting = ({ jsonData, setSortedData, setIsSorted }) => {
    const [sortCriteria, setSortCriteria] = useState("");

    const options = [
        { value: "A-Z", label: "Alphabetical, A - Z" },
        { value: "Z-A", label: "Alphabetical, Z - A" },
        { value: "PriceAsc", label: "Price Ascending" },
        { value: "PriceDesc", label: "Price Descending" },
    ];

    const handleSort = (selectedOption) => {
        setSortCriteria(selectedOption.value);
        let sortedData = [...jsonData];

        switch (selectedOption.value) {
            case "A-Z":
                sortedData.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case "Z-A":
                sortedData.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case "PriceAsc":
                sortedData.sort((a, b) => a.price - b.price);
                break;
            case "PriceDesc":
                sortedData.sort((a, b) => b.price - a.price);
                break;
            default:
                break;
        }

        setIsSorted(true);
        setSortedData(sortedData);
    };

    return (
        <div className="flex max-w-screen-2xl mx-auto p-9 gap-2 justify-end">
            <label htmlFor="sortBy" className="flex gap-2 items-center">
                <svg width="16" height="12" viewBox="0 0 16 12">
                    <path d="M11.87 3.8a2.5 2.5 0 0 1-4.74 0H1.25a.75.75 0 1 1 0-1.5H7.1a2.5 2.5 0 0 1 4.8 0h2.85a.75.75 0 0 1 0 1.5h-2.88ZM10.5 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM.5 9.05c0-.41.34-.75.75-.75H4.1a2.5 2.5 0 0 1 4.8 0h5.85a.75.75 0 0 1 0 1.5H8.87a2.5 2.5 0 0 1-4.74 0H1.25a.75.75 0 0 1-.75-.75Zm6 .95a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path>
                </svg>
                Sort by:{" "}
            </label>
            <Select
                options={options}
                value={options.find((option) => option.value === sortCriteria)}
                onChange={handleSort}
                id="sortBy"
                className=""
            />
        </div>
    );
};

export default ProductSorting;
