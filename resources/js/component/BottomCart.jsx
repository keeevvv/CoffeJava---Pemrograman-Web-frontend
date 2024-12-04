import React from "react";
import { AiFillHeart } from "react-icons/ai"; // Importing a heart icon from react-icons

const BottomCart = () => {
    return (
        <div className="fixed w-full h-14 inset-x-0 bottom-0 flex items-center ml-2 z-50 lg:hidden">
            <button className="flex items-center justify-center bg-emerald-400 text-white py-2 rounded w-full">
                <span className="text-center">Masukkan ke Tas</span>
            </button>
            <button className="flex items-center text-emerald-400">
                <AiFillHeart size={40} className="mr-2" />
            </button>
        </div>
    );
};

export default BottomCart;
