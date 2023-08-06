import React, { useState, useEffect } from "react";
import productList from "../products.json";

import CategoryDescription from "./CategoryDescription";
import ProductSorting from "./ProductSorting";
import ProductFiltering from "./ProductFiltering";
import AddToCartButton from "./addToCartButton";

import { ToastContainer } from "react-toastify";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import ProductCounter from "./ProductCounter";
import StarRatings from "./StarRatings";

const ITEMS_PER_PAGE = 16;
const INITIAL_PAGE_COUNT = 1;

function ProductGrid({ category, title, desc }) {
    const [products, setProducts] = useState([]); // Holds the filtered / sorted products in the correct order
    const [pageCount, setPageCount] = useState(INITIAL_PAGE_COUNT); // Sets the page count state
    const [sortedProducts, setSortedProducts] = useState([]); // Holds the sorted products
    const [filteredProducts, setFilteredProducts] = useState([]); // Holds the filtered products

    useEffect(() => {
        orderProducts();
    }, [sortedProducts, filteredProducts]);

    const getCategoryProducts = () => {
        // Only returns the products with the correct category
        if (category) {
            return productList.products.filter(
                (product) => product.category === category
            );
        }
        // Callback was used to fix state update problem with 'return productList.products'
        return productList.products.filter(
            (product) => typeof product.title === "string"
        );
    };

    const handleLoadMore = () => {
        setPageCount((prevPageCount) => prevPageCount + 1);
    };

    const getPaginatedData = () => {
        const startIndex = (pageCount - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return products.slice(0, endIndex);
    };

    // Makes sure setProducts consists of the correct filtered products and sorted order
    const orderProducts = () => {
        // Sets the products state if it has not been sorted
        if (sortedProducts.length == 0) {
            return setProducts(filteredProducts); // filteredProducts will return all the products when no filter is applied
        }

        // Set products state, only if it has been sorted
        setProducts(
            sortedProducts.filter((product) =>
                filteredProducts.includes(product)
            )
        );
    };

    return (
        <>
            <CategoryDescription title={title} desc={desc} />

            <div className="max-w-screen-2xl mx-auto p-9 flex">
                <ProductFiltering
                    products={getCategoryProducts()}
                    setFilteredProducts={setFilteredProducts}
                />

                <div className="flex flex-col">
                    <div className="flex max-w-screen-2xl gap-5 justify-between items-center text-sm">
                        <ProductCounter total={getCategoryProducts().length} />
                        <ProductSorting
                            products={getCategoryProducts()}
                            setSortedProducts={setSortedProducts}
                        />
                    </div>
                    <ul className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 col-span-4 mt-2 mb-12">
                        {/* Renders products */}
                        {getPaginatedData().map((product) => {
                            return (
                                <li
                                    key={product.id}
                                    className="flex flex-col product-item"
                                >
                                    <a
                                        href=""
                                        className="hover:underline flex flex-col"
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
                                    </a>

                                    <StarRatings rating={product.rating} />

                                    <p className="w-3/4 text-sm my-1">
                                        {product.desc}
                                    </p>
                                    <span className="text-lg">
                                        ${product.price}
                                    </span>

                                    <AddToCartButton title={product.title} />
                                </li>
                            );
                        })}
                    </ul>

                    <div className="flex max-w-screen-2xl justify-center mx-auto">
                        <div className="d-grid text-center">
                            <div className="text-sm p-6">
                                <ProductCounter
                                    count={getPaginatedData().length}
                                    total={getCategoryProducts().length}
                                />
                            </div>

                            {products.length > pageCount * ITEMS_PER_PAGE && (
                                <button
                                    onClick={handleLoadMore}
                                    className="washed-gray-bg hover:bg-gray-700 text-white font-bold py-2 px-4 mb-8"
                                >
                                    Load More
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </>
    );
}
export default ProductGrid;
