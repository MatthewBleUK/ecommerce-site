import React, { useState, useEffect } from "react";

import productList from "../products.json";

import ProductSorting from "./ProductSorting";
import ProductFiltering from "./ProductFiltering";
import AddToCartButton from "./addToCartButton";
import ProductCounter from "./ProductCounter";
import StarRatings from "./StarRatings";

import { ToastContainer } from "react-toastify";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ITEMS_PER_PAGE = 12;
const INITIAL_PAGE_COUNT = 1;

function ProductGrid({ category }) {
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
        // Callback was used instead of 'return productList.products'  to fix state update problem with sorting
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

    /* This function makes sure 'products' state consists of the correct order and 
       filtered product items */
    const orderProducts = () => {
        /* Sets filtered products. If no filtered option is selected, filteredProduct
           returns an object with all the products */
        if (sortedProducts.length == 0) {
            return setProducts(filteredProducts);
        }

        setProducts(
            // filters sortedProducts based on items in filteredProducts
            sortedProducts.filter((product) =>
                filteredProducts.includes(product)
            )
        );
    };

    return (
        <>
            <div className="max-w-screen-2xl mx-auto p-9 flex flex-col md:flex-col lg:flex-row">
                <div className="flex flex-col relative lg:mr-8  mb-5 lg:mb-0">
                    <ProductFiltering
                        products={getCategoryProducts()}
                        setFilteredProducts={setFilteredProducts}
                    />
                </div>

                <div className="flex flex-col w-full">
                    <div className="flex justify-end md:justify-between items-center text-sm mb-2">
                        <div className="hidden md:block">
                            <ProductCounter
                                total={getCategoryProducts().length}
                            />
                        </div>
                        <ProductSorting
                            products={getCategoryProducts()}
                            setSortedProducts={setSortedProducts}
                        />
                    </div>

                    <div className="min-h-[80%]">
                        <ul className="mt-2 mb-12 product-list overflow-hidden">
                            {/* Renders products */}
                            {getPaginatedData().map((product) => {
                                return (
                                    <li
                                        key={product.id}
                                        className="flex flex-col product-item justify-between"
                                    >
                                        <a
                                            href=""
                                            className="hover:underline flex flex-col"
                                        >
                                            <LazyLoadImage
                                                effect="blur"
                                                src={product.img}
                                                alt={product.desc}
                                                width={250}
                                                height={250}
                                                className="product-image"
                                            />

                                            <span className="text-base">
                                                {product.title}
                                            </span>
                                        </a>

                                        <StarRatings rating={product.rating} />

                                        <p className="h-fit text-sm my-1">
                                            {product.desc}
                                        </p>

                                        {product.discounted_price ? (
                                            <div className="float-left">
                                                <span className="text-base line-through pr-2">
                                                    ${product.price}
                                                </span>
                                                <span className="text-emerald-600 text-lg">
                                                    ${product.discounted_price}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="text-lg">
                                                ${product.price}
                                            </span>
                                        )}

                                        <AddToCartButton
                                            title={product.title}
                                        />
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div className="flex justify-center mx-auto">
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
