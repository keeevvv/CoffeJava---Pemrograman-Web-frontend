import React from "react";
import NavbarComponent from "../component/Navbar";
import CarouselComponent from "../component/Carousel";
import BottomCart from "../component/BottomCart";
import { TabsComponent } from "../component/Tabs";
import HorizontalCardList, { CardList } from "../component/CardList";
import ProductProfile from "../component/ProductProfile";
import StickyCard from "../component/StickyCard";

const ProductDetail = () => {
    return (
        <div>
            <NavbarComponent />
            <div className="flex flex-col sm:text-xl lg:flex-row lg:ml-20  ">
                <div className=" h-96 lg:w-72  xl:w-96 sm:w-96 sm:h-[29rem] bg-slate-950 my-5 mx-10 sm:mx-auto lg:mx-0 rounded-full">
                    <CarouselComponent className="" />
                </div>

                <div className="mx-10 sm:mx-52 lg:ml-24 lg:mr-[370px] lg:w-96 xl:w-[800px] ">
                    <h1 className="font-semibold text-2xl sm:text-3xl">
                        Kaguya Sama
                    </h1>
                    <h3 className="opacity-75 ">Shinomiya Familly</h3>
                    <h1 className="mt-3 text-xl sm:text-2xl">
                        Not For Sale (Special only made for kevin)
                    </h1>

                    <h1 className="mt-3">Description</h1>
                    <p className="text-justify">
                        Kaguya is a beautiful, fair-skinned young girl with long
                        black hair that is usually tied by a black-red ribbon
                        (her hair appears to be mid-back length when she lets it
                        down) with bangs/hair strands hanging on either side,
                        large, almond-shaped red eyes (that can look sharper,
                        depending on her mood), thin eyebrows and a slim, but
                        feminine build, with a noticeably small chest. She is
                        described in her manga character profile as possessing
                        'stunning beauty'.
                    </p>

                    <TabsComponent />

                    <StickyCard />
                </div>

                <BottomCart />
            </div>
            <div className="mx-10">
                <HorizontalCardList />
            </div>
        </div>
    );
};

export default ProductDetail;
