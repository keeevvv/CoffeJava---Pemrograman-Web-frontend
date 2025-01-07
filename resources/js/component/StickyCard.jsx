import React, { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import { CiHeart } from "react-icons/ci";
import { AiFillHeart } from "react-icons/ai";

const StickyCard = ({
    price,
    stock,
    product_id,
    message,
    isAddedFavorite,
    flash,
}) => {
    console.log(flash, "asdsadas");
    const [quantity, setQuantity] = useState(1);
    const initialprice = Math.round(price);
    const [totalPrice, setTotalPrice] = useState(initialprice);

    const [isFavorite, setIsFavorite] = useState(isAddedFavorite);

    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 2, // Jumlah angka di belakang koma
        }).format(number);
    };

    const [erorSize, setErorSize] = useState(false);

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
        setTotalPrice(quantity * initialprice);
    }, [quantity]);

    useEffect(() => {
        
        if (flash == "Item successfully added to favorites") {
            setIsFavorite(true);
            
        } else {
            if (flash == "Item successfully removed from favorites") {
                setIsFavorite(false);
            }
        }
    }, []);

    const handleAddFavorite = () => {
        console.log("Current isFavorite:", isFavorite);
        console.log("Product ID:", product_id);

        if (!isFavorite) {
            router.visit("/addToFavorites", {
                preserveState: true,
                method: "post",
                data: {
                    productId: product_id,
                },
            });
            setIsFavorite(true);
            console.log("Attempting to add to favorites");
        } else {
            router.visit(`/delete/favorite/${product_id}`, {
                method: "delete",
                data: {
                    productId: product_id,
                },
            });
            setIsFavorite(false);
            console.log("Attempting to remove from favorites");
        }
    };

    const handleAddToCart = () => {
        if (selectedSize != -1) {
            router.visit("/addToCart", {
                method: "post",
                data: {
                    product_id: product_id,
                    quantity: quantity,
                    size: stock[selectedSize].size,
                },
            });
        } else {
            setErorSize(true);
        }
    };
    return (
        <div className="absolute right-4 bottom-0 h-full pt-7">
            <div className="sticky top-20 hidden lg:block bg-NusantaraGoldLight p-5 rounded-lg shadow-lg lg:w-[290px] xl:w-80 transition-all font-sans">
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
                <div className={`${erorSize ? "block" : "hidden"}`}>
                    <p className="text-xs text-red-800">
                        {" "}
                        size must be selected first
                    </p>
                </div>
                <div className="grid grid-cols-4 gap-3 mb-6">
                    {stock.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                handleSelectSize(index);
                            }} // Mengatur ukuran yang dipilih
                            className={`border rounded-md py-2 text-center font-medium
                    transition-all ${
                        item.quantity == 0
                            ? "bg-none"
                            : selectedSize === index
                            ? "bg-gray-900 text-white" // Warna ketika dipilih
                            : "text-gray-800 hover:bg-gray-900 hover:text-white" // Warna default
                    }`}
                        >
                            {item.size}
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
                    <span className="text-base font-bold text-gray-900">
                        {formatRupiah(totalPrice)}
                    </span>
                </div>

                <div className="flex items-center">
                    <button
                        onClick={handleAddToCart}
                        className="w-[90%] bg-white border py-3 rounded-lg font-semibold text-gray-800 hover:bg-NusantaraGold hover:text-black transition-all"
                    >
                        ADD TO CART
                    </button>
                    <button
                        onClick={handleAddFavorite}
                       
                    >
                        <AiFillHeart size={45} color={isFavorite == true ? "red": "white"}  className="mr-2 " />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StickyCard;
