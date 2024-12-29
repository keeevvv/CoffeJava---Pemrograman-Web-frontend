import React, {useState} from "react";
import { Carousel } from "flowbite-react";
import ShopBanner from "../assets/images/banner.png"

const ShopCarouselComponent = () => {
    return (
        
        <div 
            id="default-carousel" 
            className="relative container mx-auto w-full h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[500px]"
        >
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
        
    </Carousel>
</div>

    );
}

export default ShopCarouselComponent;