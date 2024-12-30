import React, { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai"; // Importing a heart icon from react-icons
import { router } from "@inertiajs/react";
import toast from "react-hot-toast";

const BottomCart = ({ product_id, isAddedFavorite, flash, selectedStock }) => {
    const [isFavorite, setIsFavorite] = useState(isAddedFavorite);
    const handleAddFavorite = () => {
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
    useEffect(() => {
        if (flash == "Item successfully added to favorites") {
            setIsFavorite(true);
        } else {
            if (flash == "Item successfully removed from favorites") {
                setIsFavorite(false);
            }
        }
    }, []);

    const handleAddToCart = () => {
        if (selectedStock === undefined) {
            alert("undefinasdsaded");
        } else {
            router.visit("/addToCart", {
                method: "post",
                data: {
                    product_id: product_id,
                    quantity: 1,
                    size: selectedStock,
                },
            });
        }
    };

    return (
        <div className="fixed w-full h-14 inset-x-0 bottom-0 flex items-center ml-2 z-50 lg:hidden">
            <button
                onClick={handleAddToCart}
                className="flex items-center justify-center bg-NusantaraGold text-white py-2 rounded w-full"
            >
                <span className="text-center">Masukkan ke Tas</span>
            </button>
            <button
                className={`flex items-center ${
                    isFavorite === true ? "text-red-400 " : "bg-transparent"
                }`}
                onClick={handleAddFavorite}
            >
                <AiFillHeart size={45} className="mr-2 " />
            </button>
        </div>
    );
};

export default BottomCart;
