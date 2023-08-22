import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StarRatings from "../product-grid/StarRatings";
import AddToCartButton from "./AddToCartButton";

import { ToastContainer } from "react-toastify";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function ProductPage() {
    const [product, setProduct] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await fetch(`/api/products/${id}`);
                const data = await response.json();

                setProduct(data);
            } catch (error) {
                console.log("Problem with API connectivity", error);
            }
        };

        fetchProductData();
    }, []);

    return (
        <>
            <div className="max-w-screen-2xl mx-auto p-9 flex flex-col md:flex-col lg:flex-row mt-6 mb-6">
                {product ? (
                    product.map((product) => {
                        return (
                            <div
                                className="flex flex-col md:flex-row w-full"
                                key={product.id}
                            >
                                <div className="w-full md:w-2/4 first-letter:flex justify-end">
                                    <LazyLoadImage
                                        effect="blur"
                                        src={"../" + product.image}
                                        alt={product.description}
                                        width={550}
                                        height={550}
                                        className="w-10/12 min-w-[50%] mb-6"
                                        wrapperClassName="lazyimage"
                                    />
                                </div>

                                <div className="w-full md:w-2/4 flex flex-col">
                                    <h1 className="text-4xl font-bold mb-1">
                                        {product.title}
                                    </h1>
                                    <StarRatings rating={product.rating} />
                                    {product.discounted_price ? (
                                        <div className="float-left pt-3 pb-3">
                                            <span className="text-base line-through pr-2 text-xl">
                                                ${product.price}
                                            </span>
                                            <span className="text-emerald-600 text-2xl">
                                                ${product.discounted_price}
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="text-2xl pt-3 pb-3">
                                            ${product.price}
                                        </span>
                                    )}
                                    <p className="pt-3 pb-3 w-11/12">
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris
                                        nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                    <p className="pt-3 pb-3 w-11/12">
                                        Duis aute irure dolor in reprehenderit
                                        in voluptate velit esse cillum dolore eu
                                        fugiat nulla pariatur. Excepteur sint
                                        occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim
                                        id est laborum.
                                    </p>

                                    <AddToCartButton product={product} />
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p>Loading...</p>
                )}

                <ToastContainer />
            </div>
        </>
    );
}

export default ProductPage;
