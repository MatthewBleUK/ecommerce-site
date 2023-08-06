import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddToCartButton({ title }) {
    const handleAddToCart = (title) => {
        toast.success(`${title} has been added to cart`, {
            position: toast.POSITION.BOTTOM_RIGHT,
        });
    };

    return (
        <>
            <button
                className="text-sm p-1 my-5 w-32 transition ease-in duration-200 bg-white hover:bg-gray-800 text-black hover:text-white border border-gray-900"
                onClick={() => handleAddToCart(title)}
            >
                Add to Cart
            </button>
        </>
    );
}

export default AddToCartButton;
