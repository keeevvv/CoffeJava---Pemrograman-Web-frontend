import React, {useState} from "react";
import { Banner, Carousel } from "flowbite-react";
import ShopBanner from "../assets/images/banner.png"

const ShopCarouselComponent = () => {
    return (
        
        <div id="default-carousel" className="relative w-full">
            <Carousel>
                <div>
                    <img src={ShopBanner} alt="banner-01" />
                </div>
                <div>
                    <img src={ShopBanner} alt="banner-02" />
                </div>
                <div>
                    <img src={ShopBanner} alt="banner-03" />
                </div>
                <div>
                    <img src={ShopBanner} alt="banner-04" />
                </div>
                <div>
                    <img src={ShopBanner} alt="banner-05" />
                </div>
            </Carousel>
        </div>
    );
}

export default ShopCarouselComponent;