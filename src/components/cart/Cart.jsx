import React from "react";
import { useState } from "react";
import { useEffect } from "react";

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState();

    // Holds state of products from GET request
    const [productData, setProductData] = useState({
        products: [],
        isDataLoaded: false,
    });

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

        fetchProductData();
    }, [cartItems]);

    useEffect(() => {
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

        if (productData.isDataLoaded) {
            const combinedObject = productData.products
                .filter((obj1) =>
                    existingCart.some((obj2) => obj2.id === obj1.id)
                )
                .map((item1) => {
                    const matchingItem2 = existingCart.find(
                        (item2) => item2.id === item1.id
                    );

                    // Creates new properies for combinedObject
                    if (matchingItem2) {
                        const totalPrice = matchingItem2.value * item1.price;

                        return {
                            id: item1.id,
                            title: item1.title,
                            img: item1.img,
                            price: item1.price,
                            value: matchingItem2.value,
                            total_price: totalPrice,
                        };
                    }
                });

            setCartItems(combinedObject);
            calculateTotalPrice();
        }
    }, [productData]);

    const calculateTotalPrice = () => {
        setTotalPrice(
            cartItems.reduce((totalPrice, object) => {
                return totalPrice + object.total_price;
            }, 0)
        );
    };

    const handleRemoveFromCart = (id) => {
        let updatedCart = cartItems;

        const findIndex = updatedCart.findIndex((object) => {
            return object.id === id;
        });

        // Remove 1 item with that index
        updatedCart.splice(findIndex, 1);

        if (cartItems.length != 0) {
            localStorage.setItem("cart", JSON.stringify(updatedCart));
        } else {
            localStorage.removeItem("cart");
        }

        setCartItems(updatedCart);
    };

    const handleQuantityChange = (event, id) => {
        let updatedCart = cartItems;
        let quantity = event.target.value;

        const findIndex = updatedCart.findIndex((object) => {
            return object.id === id;
        });

        // if it equals 0 and cartItem length is equal to 1, empty state and delete local storage
        if (quantity == 0 && cartItems.length == 1) {
            updatedCart = [];
            localStorage.removeItem("cart");
        }

        // if it equals 0, remove from state and local storage
        if (quantity == 0) {
            updatedCart.splice(findIndex, 1);
        }

        // If it is not just update value
        if (quantity != 0) {
            updatedCart[findIndex].value = event.target.value;
        }

        localStorage.setItem("cart", JSON.stringify(updatedCart));

        setCartItems(updatedCart);
    };

    const handleCheckOut = () => {
        alert("success");
    };

    return (
        <div className="max-w-screen-2xl mx-auto p-9 flex-col pt-24">
            <h1 className="w-11/12 md:w-4/5 mx-auto text-4xl font-semibold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl mb-20 text-center">
                Your cart
            </h1>

            {cartItems.length > 0 ? (
                <>
                    <table className="w-11/12 md:w-4/5 mx-auto">
                        <thead className="border-b">
                            <tr className="text-left">
                                <th className="py-3 font-normal">Product</th>
                                <th className="py-3 font-normal pl-4 sm:pl-0 items-center sm:items-start">
                                    Quantity
                                </th>
                                <th className="py-3 font-normal text-right">
                                    Total
                                </th>
                            </tr>
                        </thead>

                        <tbody className="border-b">
                            {cartItems.map((product) => (
                                <tr key={product.id} className="border-b">
                                    <td className="py-10">
                                        <div className="flex items-center">
                                            <img
                                                src={product.img}
                                                alt=""
                                                width={150}
                                                height={150}
                                                className="mr-8"
                                            ></img>
                                            <div className="hidden sm:flex sm:flex flex-col">
                                                <span className="text-lg font-medium text-gray-900">
                                                    {product.title}
                                                </span>
                                                <span className="pt-2">
                                                    ${product.price}
                                                </span>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="py-10">
                                        <div className="flex flex-col items-center sm:items-start">
                                            <input
                                                type="number"
                                                min={0}
                                                max={100}
                                                placeholder={product.value}
                                                className="w-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                                onChange={(event) =>
                                                    handleQuantityChange(
                                                        event,
                                                        product.id
                                                    )
                                                }
                                            ></input>

                                            <button
                                                className="w-16 underline pt-4 text-sm sm:text-base"
                                                onClick={() =>
                                                    handleRemoveFromCart(
                                                        product.id
                                                    )
                                                }
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </td>

                                    <td className="py-10 text-right">
                                        <span className="text-sm sm:text-lg pl-4">
                                            ${product.total_price}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex flex-col items-end justify-between text-right w-11/12 md:w-4/5 mx-auto">
                        <h2 className="mt-8 text-lg">
                            Subtotal:{" "}
                            <span className="pl-2">${totalPrice}</span>
                        </h2>
                        <p className="mt-2 text-sm">
                            Taxes and shipping calculated at checkout
                        </p>
                        <button
                            type=""
                            className="washed-gray-bg hover:bg-gray-700 text-white font-bold py-2 px-4 mb-8 w-48 mt-8"
                            onClick={() => handleCheckOut()}
                        >
                            Checkout
                        </button>
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
