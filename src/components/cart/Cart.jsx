import React, { useState, useEffect } from "react";

import TotalPrice from "./TotalPrice";
import CartTable from "./CartTable";
import CheckOutButton from "./CheckOutButton";
import TitleMessage from "./TitleMessage";

function Cart() {
    // State for cart items and total price
    const [cartItems, setCartItems] = useState([]);

    // State for product data from API
    const [productData, setProductData] = useState({
        products: [],
        isDataLoaded: false,
    });

    // Fetch product data from API when cart items change
    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await fetch("/api/products");
                const data = await response.json();

                setProductData({
                    products: data,
                    isDataLoaded: true,
                });
            } catch (error) {
                console.log("Problem with API connectivity", error);
            }
        };

        // Fetch product data when the component mounts
        fetchProductData();
    }, []);

    useEffect(() => {
        // Update cart items from local storage
        const updateCartItems = () => {
            const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

            // Find items in productData.products that match items from local storage
            const matchingItems = productData.products.filter((product) =>
                existingCart.find((cartItem) => cartItem.id === product.id)
            );

            setCartItems(
                /* Maps through matchingItems, finds corrosponding local storage item,
             and returns new object */
                matchingItems.map((product) => {
                    const item = existingCart.find(
                        (item) => item.id === product.id
                    );

                    const totalProductPrice = (
                        item.quantity * product.price
                    ).toFixed(2);

                    if (product.discounted_price) {
                        var totalDiscountedPrice = (
                            item.quantity * product.discounted_price
                        ).toFixed(2);
                    }

                    return {
                        ...product,
                        quantity: item.quantity,
                        total_price: totalDiscountedPrice || totalProductPrice,
                    };
                })
            );
        };

        // Update cart items when productData changes
        updateCartItems();
    }, [productData]);

    return (
        <div className="max-w-screen-2xl mx-auto p-9 flex-col pt-24">
            <TitleMessage />

            {cartItems.length > 0 ? (
                <>
                    <CartTable
                        cartItems={cartItems}
                        setCartItems={setCartItems}
                    />

                    <div className="flex flex-col items-end justify-between text-right w-11/12 md:w-4/5 mx-auto">
                        <TotalPrice cartItems={cartItems} />
                        <CheckOutButton />
                    </div>
                </>
            ) : (
                <p className="text-center mb-32">
                    No Items in cart. Try adding some products.
                </p>
            )}
        </div>
    );
}

export default Cart;
