import React, { useState, useEffect } from "react";

function Cart() {
    // State for cart items and total price
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

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

        fetchProductData();
    }, [cartItems]);

    // Update cart items and total price when product data is loaded
    useEffect(() => {
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

        setCartItems(
            productData.products
                .filter((product) =>
                    existingCart.some((cartItem) => cartItem.id === product.id)
                )
                .map((product) => {
                    const matchingCartItem = existingCart.find(
                        (cartItem) => cartItem.id === product.id
                    );

                    if (matchingCartItem.quantity > 0) {
                        const totalProductPrice = (
                            matchingCartItem.quantity * product.price
                        ).toFixed(2);

                        return {
                            ...product,
                            quantity: matchingCartItem.quantity,
                            total_price: parseFloat(totalProductPrice),
                        };
                    }

                    return null;
                })
                .filter(Boolean)
        );

        calculateTotalPrice();
    }, [productData]);

    // Calculate total price of items in the cart
    const calculateTotalPrice = () => {
        let totalPrice = cartItems.reduce((total, item) => {
            return total + parseFloat(item.total_price);
        }, 0);

        setTotalPrice(parseFloat(totalPrice.toFixed(2)));
    };

    // Remove an item from the cart
    const handleRemoveFromCart = (id) => {
        const updatedCart = cartItems.filter((item) => item.id !== id);

        if (updatedCart.length !== 0) {
            localStorage.setItem("cart", JSON.stringify(updatedCart));
        } else {
            localStorage.removeItem("cart");
        }

        setCartItems(updatedCart);
    };

    // Handle quantity change for an item in the cart
    const handleQuantityChange = (event, id) => {
        const updatedCart = [...cartItems];
        const newQuantity = event.target.value;

        const index = updatedCart.findIndex((item) => item.id === id);

        if (newQuantity != 0 || (newQuantity == 0 && newQuantity != "")) {
            updatedCart[index].quantity = Number(newQuantity);
        }

        localStorage.setItem("cart", JSON.stringify(updatedCart));

        setCartItems(updatedCart);
    };

    // Handle checkout
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
                                <th className="py-3 font-normal text-right w-1/4">
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
                                            <div className="hidden sm:flex flex-col mr-2">
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
                                                max={99}
                                                defaultValue={product.quantity}
                                                className="w-12 sm:w-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                                onKeyUp={(event) =>
                                                    handleQuantityChange(
                                                        event,
                                                        product.id
                                                    )
                                                }
                                                step="1"
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
