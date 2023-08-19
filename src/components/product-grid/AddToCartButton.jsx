import React, { useContext } from "react";
import { Context } from "../../App.jsx";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddToCartButton({ product }) {
    // Get cartCounter from useContext
    const [cartCounter, setCartCounter] = useContext(Context);

    const handleAddToCart = () => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Checks if product id exists in cart
        const itemIndex = cart.findIndex((item) => item.id === product.id);

        // If item exists, increment else add to cart
        if (itemIndex !== -1) {
            cart[itemIndex].quantity++;
        } else {
            cart.push({ id: product.id, quantity: parseInt(1) });
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        // Increment cartCounter
        setCartCounter(cartCounter + 1);

        displayCartNotification(product.title);
    };

    const displayCartNotification = (title) => {
        toast.success(`${title} has been added to cart`, {
            position: toast.POSITION.BOTTOM_RIGHT,
        });
    };

    return (
        <>
            <button
                className="text-sm p-1 mt-2.5 w-32 transition ease-in duration-200 bg-white hover:bg-gray-800 text-black hover:text-white border border-gray-300"
                onClick={() => handleAddToCart()}
            >
                Add to Cart
            </button>
        </>
    );
}

export default AddToCartButton;
