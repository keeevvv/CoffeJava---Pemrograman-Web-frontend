import React, { useEffect, useState } from "react";
import NavbarComponent from "../component/Navbar";
import CarouselComponent from "../component/Carousel";
import BottomCart from "../component/BottomCart";
import { TabsComponent } from "../component/Tabs";
import HorizontalCardList, { CardList } from "../component/CardList";
import ProductProfile from "../component/ProductProfile";
import StickyCard from "../component/StickyCard";
import FooterLanding from "../component/FooterSection";
import { router, usePage } from "@inertiajs/react";

const ProductDetail = () => {
    const { product, flash } = usePage().props;
    const [quantity, setQuantity] = useState(1);
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (flash?.error) {
            setShowError(true);

            // Hide the error after 2 seconds
            const timer = setTimeout(() => {
                setShowError(false);
            }, 2000);

            return () => clearTimeout(timer); // Cleanup timer
        } else if (flash?.success) {
            setShowSuccess(true);
            const timer = setTimeout(() => {
                setShowSuccess(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    console.log(flash);


    return (
        <div>
            <NavbarComponent />
            {showError && (
                <div
                    class="absolute top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                    role="alert"
                >
                    <svg
                        class="flex-shrink-0 inline w-4 h-4 me-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>

                    <div>{flash?.error}</div>
                </div>
            )}

            {showSuccess && (
                <div
                    class="absolute top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
                    role="alert"
                >
                    <svg
                        class="flex-shrink-0 inline w-4 h-4 me-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <div>{flash?.success}</div>
                </div>
            )}
            <div className=" flex flex-col sm:text-xl lg:flex-row lg:ml-10 xl:ml-20   relative mt-10 lg:mt-16 ">
                <div className="  h-96 lg:w-64  2xl:w-96 xl:w-[39rem] sm:w-96 sm:h-[29rem] bg-slate-950 my-5 mx-10 sm:mx-auto lg:mx-0  rounded-full">
                    <CarouselComponent
                        images={product.data.images}
                        className=""
                    />
                </div>

                <div className="mx-10 sm:mx-52 lg:ml-24 lg:mr-10  xl:mr-[370px] lg:w-96 xl:w-[800px] mt-5 ">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                        {product.data.pName}
                    </h1>
                    <h3 className="mt-2 text-lg sm:text-xl text-gray-600">
                        {product.data.brand}
                    </h3>
                    <h1 className="mt-4 text-lg sm:text-xl text-indigo-600 font-semibold">
                        {product.data.price}
                    </h1>

                    <h2 className="mt-6 text-xl font-medium">Description</h2>
                    <p className="lg:text-base xl:text-xl mt-2 text-justify text-gray-700 leading-relaxed ">
                        {product.data.decs}
                    </p>

                    <TabsComponent />

                    <StickyCard
                        price={product.data.price}
                        stock={product.data.stock}
                        product_id={product.data.product_id}
                    />
                </div>

                <BottomCart product_id={product.data.product_id} />
            </div>

            <FooterLanding />
        </div>
    );
};

export default ProductDetail;
