import React from "react";
import { Carousel } from "flowbite-react";

const CarouselComponent = ({ images }) => {
    return (
        <div className=" h-full lg:w-72 xl:w-full w-full ">
            <Carousel>
                {images.map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        alt={`Carousel ${index + 1}`}
                        className="object-cover w-full h-full"
                    />
                ))}
            </Carousel>
        </div>
    );
};

export default CarouselComponent;
