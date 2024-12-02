import React from "react";
import NavbarComponent from "../component/Navbar";
import CarouselComponent from "../component/Carousel";
import BottomCart from "../component/BottomCart";
import { TabsComponent } from "../component/Tabs";
import HorizontalCardList, { CardList } from "../component/CardList";

const ProductDetail = () => {
    return (
        <div>
            <NavbarComponent />
            <div className="flex flex-col sm:flex-row">
                <div className="max-w-screen-sm h-80 sm:w-96 bg-slate-950 my-5 mx-10">
                    <CarouselComponent />
                </div>

                <div className="mx-10 h-19">
                    <h1 className="font-semibold text-2xl">Kaguya Sama</h1>
                    <h3 className="opacity-75 ">Shinomiya Familly</h3>
                    <h1 className="mt-3 text-xl">
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

                    <HorizontalCardList />
                </div>

                <div className="h-96"></div>
            </div>
           
        </div>
    );
};

export default ProductDetail;
