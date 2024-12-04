import React, { useEffect, useState } from "react";

const StickyCard = () => {
    const [cartPosition, setCartPosition] = useState("70px"); 

    useEffect(() => {
        const handleScroll = () => {
            const tabbarElement = document.getElementById("tabbar");
            const cartElement = document.getElementById("sticky-cart");

       

            const tabbarOffset = tabbarElement.offsetTop;
            const tabbarHeight = tabbarElement.offsetHeight;
            const stopPoint = tabbarOffset + tabbarHeight;
            const cartHeight = cartElement.offsetHeight;
            const scrollY = window.scrollY;

            const offset = 70;

            if (stopPoint <= scrollY + cartHeight + offset) {
                setCartPosition(`${stopPoint - scrollY - cartHeight}px`);
            } else {
                setCartPosition(`${offset}px`);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            id="sticky-cart"
            style={{ top: cartPosition }}
            className="fixed right-10 hidden lg:block bg-emerald-400 p-4 rounded-lg shadow-lg w-80 transition-all"
        >
            <div className="flex justify-between items-center mb-4">
                <button className="text-lg font-bold">-</button>
                <span className="text-lg font-bold">1</span>
                <button className="text-lg font-bold">+</button>
            </div>
            <div className="grid grid-cols-4 gap-2 mb-4">
                {["S", "M", "L", "XL"].map((size) => (
                    <button
                        key={size}
                        className="border rounded-md py-1 px-2 text-center hover:bg-black hover:text-white"
                    >
                        {size}
                    </button>
                ))}
            </div>
            <div className="text-sm mb-2">size info</div>
            <div className="flex justify-between items-center mb-4">
                <span className="font-bold">Subtotal</span>
                <span className="font-bold">Rp 300.000,00</span>
            </div>
            <button className="w-full bg-white border py-2 rounded-lg hover:bg-black hover:text-white">
                ADD TO CART
            </button>
        </div>
    );
};

export default StickyCard;
