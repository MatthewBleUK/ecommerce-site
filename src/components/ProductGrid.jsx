import React, { useState, useEffect } from "react";
import productsData from "../products.json";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import CategoryDescription from "./CategoryDescription";

const ITEMS_PER_PAGE = 16;
const INITIAL_PAGE_COUNT = 1;

function ProductGrid({ category, title, desc }) {
    const [jsonData, setJsonData] = useState([]);
    const [pageCount, setPageCount] = useState(INITIAL_PAGE_COUNT);

    useEffect(() => {
        /* Filters the productsData array to only return the correct category */
        const filteredProducts = productsData.products.filter(
            (product) => product.category === category
        );

        setJsonData(filteredProducts);
    }, [pageCount]);

    const handleLoadMore = () => {
        setPageCount((prevPageCount) => prevPageCount + 1);
    };

    const getPaginatedData = () => {
        const startIndex = (pageCount - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return jsonData.slice(0, endIndex);
    };

    return (
        <>
            <CategoryDescription title={title} desc={desc} />
            <div
                id="product-grid"
                className="max-w-screen-2xl justify-between mx-auto p-9"
            >
                <ul
                    id="product-list"
                    className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3"
                >
                    {getPaginatedData().map((product) => {
                        return (
                            <li
                                key={product.id}
                                className="flex flex-col product-item p-2.5 m-5"
                            >
                                <LazyLoadImage
                                    effect="blur"
                                    src={product.img}
                                    alt={product.desc}
                                    width={216}
                                    height={216}
                                />
                                <span className="text-base">
                                    {product.title}
                                </span>
                                <p className="w-3/4 text-sm my-1">
                                    {product.desc}
                                </p>
                                <span className="text-lg">
                                    ${product.price}
                                </span>
                            </li>
                        );
                    })}
                </ul>

                {jsonData.length > pageCount * ITEMS_PER_PAGE && (
                    <div className="d-grid mt-20 mb-7 text-center">
                        <button
                            onClick={handleLoadMore}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                        >
                            Load More
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
export default ProductGrid;
