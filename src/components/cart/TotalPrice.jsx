import React, { useState, useEffect } from "react";

function TotalPrice({ cartItems }) {
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        calculateTotalPrice();
    }, [cartItems]);

    // Calculate total price of items in the cart
    const calculateTotalPrice = () => {
        const totalPrice = cartItems.reduce((total, item) => {
            return (
                total +
                parseFloat(item.total_discounted_price || item.total_price)
            );
        }, 0);

        setTotalPrice(totalPrice.toFixed(2));
    };

    return (
        <>
            <h2 className="mt-8 text-lg">
                Subtotal:
                <span className="pl-2">${totalPrice}</span>
            </h2>
            <p className="mt-2 text-sm">
                Taxes and shipping calculated at checkout
            </p>
        </>
    );
}

export default TotalPrice;
