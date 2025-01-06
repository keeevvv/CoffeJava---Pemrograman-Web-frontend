import React, { useState } from "react";
import { Carousel } from "flowbite-react";
import banner01 from "../assets/images/banner.png";
import banner02 from "../assets/images/banner2.png";
import banner03 from "../assets/images/banner3.png";

const ShopCarouselComponent = () => {
    return (
        <div
            id="default-carousel"
            className="relative container mx-auto w-full h-56 sm:h-64 xl:h-80 2xl:h-96"
        >
            <Carousel>
                <div>
                    <img src={banner01} alt="banner-01" />
                </div>
                <div>
                    <img src={banner02} alt="banner-02" />
                </div>
                <div>
                    <img src={banner03} alt="banner-03" />
                </div>
            </Carousel>
        </div>
    );
};

export default ShopCarouselComponent;
