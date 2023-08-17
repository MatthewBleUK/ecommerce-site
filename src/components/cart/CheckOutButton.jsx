import React from "react";

function CheckOutButton() {
    // Handle checkout
    const handleCheckOut = () => {
        alert("success");
    };

    return (
        <button
            type=""
            className="washed-gray-bg hover:bg-gray-700 text-white font-bold py-2 px-4 mb-8 w-48 mt-8"
            onClick={() => handleCheckOut()}
        >
            Checkout
        </button>
    );
}

export default CheckOutButton;
