import React, { useState, useContext } from "react";
import { Context } from "../../App.jsx";

function CartTable({ cartItems, setCartItems }) {
    // Get cartCounter from useContext
    const [cartCounter, setCartCounter] = useContext(Context);

    // Remove an item from the cart
    const handleRemoveFromCart = (id) => {
        const updatedCart = cartItems.filter((item) => item.id !== id);

        setCartItems(updatedCart);
        setLocalStorage(updatedCart);
    };

    // Handle quantity change for an item in the cart
    const handleQuantityChange = (event, id) => {
        const updatedCart = [...cartItems];
        const quantity = event.target.value;

        const index = updatedCart.findIndex((item) => item.id === id);

        if (quantity !== "") {
            let price = 0;

            updatedCart[index].quantity = Number(quantity);

            if (updatedCart[index].discounted_price) {
                price =
                    updatedCart[index].discounted_price * event.target.value;
            } else {
                price = updatedCart[index].price * event.target.value;
            }

            // Update total price
            updatedCart[index].total_price = price.toFixed(2);
        }

        // Remove item if equals 0 quantity
        if (quantity === "0") {
            updatedCart.splice(index, 1);
        }

        setLocalStorage(updatedCart);
        setCartItems(updatedCart);
        calculateCartQuantity();
    };

    const setLocalStorage = (updatedCart) => {
        let newItems = [];

        // If cart is not empty
        if (updatedCart.length !== 0) {
            newItems = updatedCart.map((product) => {
                return {
                    id: product.id,
                    quantity: product.quantity,
                };
            });

            localStorage.setItem("cart", JSON.stringify(newItems));
        } else {
            localStorage.removeItem("cart");
        }

        calculateCartQuantity();
    };

    const calculateCartQuantity = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        let counter = 0;

        for (let x in cart) {
            counter += cart[x].quantity;
        }

        setCartCounter(counter);
    };

    return (
        <table className="w-11/12 md:w-4/5 mx-auto">
            <thead className="border-b">
                <tr className="text-left">
                    <th className="py-3 font-normal">Product</th>
                    <th className="py-3 font-normal pl-4 sm:pl-0 items-center sm:items-start">
                        Quantity
                    </th>
                    <th className="py-3 font-normal text-right w-1/4">Total</th>
                </tr>
            </thead>

            <tbody className="border-b">
                {cartItems.map((product) => (
                    <tr key={product.id} className="border-b">
                        <td className="py-10">
                            <div className="flex items-center">
                                <a href={"products/" + product.uri}>
                                    <img
                                        src={product.image}
                                        alt=""
                                        width={150}
                                        height={150}
                                        className="mr-8"
                                    ></img>
                                </a>
                                <div className="hidden sm:flex flex-col mr-2">
                                    <a href={"products/" + product.uri}>
                                        <span className="text-lg font-medium text-gray-900">
                                            {product.title}
                                        </span>
                                    </a>

                                    {product.discounted_price ? (
                                        <div>
                                            <span className="pt-2 line-through mr-2">
                                                ${product.price}
                                            </span>
                                            <span className="pt-2 text-emerald-600">
                                                ${product.discounted_price}
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="pt-2">
                                            ${product.price}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </td>

                        <td className="py-10">
                            <div className="flex flex-col items-center sm:items-start">
                                <input
                                    type="number"
                                    min={0}
                                    max={99}
                                    defaultValue={product.quantity}
                                    className="w-12 sm:w-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                    onChange={(event) =>
                                        handleQuantityChange(event, product.id)
                                    }
                                    step="1"
                                ></input>

                                <button
                                    className="w-16 underline pt-4 text-sm sm:text-base"
                                    onClick={() =>
                                        handleRemoveFromCart(product.id)
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
    );
}

export default CartTable;
