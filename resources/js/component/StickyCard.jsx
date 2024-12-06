import React, { useEffect, useState } from "react";

const StickyCard = () => {
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(3000000);
    const price = 300000;
    const [selectedSize, setSelectedSize] = useState(-1);

    const handleSelectSize = (index) => {
        setSelectedSize(index);
    };

    const handleIncreaseQuantity = () => {
        setQuantity(quantity + 1);
    };
    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    useEffect(() => {
        setTotalPrice(quantity * price);
    }, [quantity]);
    return (
        <div className="absolute right-4 bottom-0 h-full pt-7">
            <div className="sticky top-20 hidden lg:block bg-emerald-400 p-5 rounded-lg shadow-lg lg:w-[290px] xl:w-80 transition-all font-sans">
                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={handleDecreaseQuantity}
                        className="text-xl font-bold text-gray-800 hover:text-gray-900 transition"
                    >
                        -
                    </button>
                    <span className="text-xl font-bold text-gray-900">
                        {quantity}
                    </span>
                    <button
                        onClick={handleIncreaseQuantity}
                        className="text-xl font-bold text-gray-800 hover:text-gray-900 transition"
                    >
                        +
                    </button>
                </div>

                <div className="grid grid-cols-4 gap-3 mb-6">
                    {["S", "M", "L", "XL"].map((size, index) => (
                        <button
                            key={size}
                            onClick={() => handleSelectSize(index)} // Mengatur ukuran yang dipilih
                            className={`border rounded-md py-2 text-center font-medium 
                    transition-all ${
                        selectedSize === index
                            ? "bg-gray-900 text-white" // Warna ketika dipilih
                            : "text-gray-800 hover:bg-gray-900 hover:text-white" // Warna default
                    }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
                <div className="text-sm text-gray-700 mb-4 italic">
                    * Size information available in the product description
                </div>

                <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-semibold text-gray-800">
                        Subtotal
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                        Rp {totalPrice}
                    </span>
                </div>

                <button className="w-full bg-white border py-3 rounded-lg font-semibold text-gray-800 hover:bg-gray-900 hover:text-white transition-all">
                    ADD TO CART
                </button>
            </div>
        </div>
    );
};

export default StickyCard;
