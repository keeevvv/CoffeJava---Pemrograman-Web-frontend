import React from "react";
import { Carousel } from "flowbite-react";

const CarouselComponent = () => {
    return (
        <div className=" h-full ">
            <Carousel>
                <img
                    src="https://i.pinimg.com/originals/b4/a9/4a/b4a94a5add52ffa335c31ac5a82e999f.gif"
                    alt="Anime Character"
                    className="object-cover w-full h-full"
                />
                <img
                    src="https://i.pinimg.com/originals/2f/21/2c/2f212c009739a1248dd3011f74cf1c66.gif"
                    alt="Carousel 2"
                    className="object-cover w-full h-full"
                />
                <img
                    src="https://i.pinimg.com/originals/36/82/fc/3682fc80815a841b998179d651ef255d.gif"
                    alt="Carousel 3"
                    className="object-cover w-full h-full"
                />
                <img
                    src="https://i.pinimg.com/originals/ff/09/2e/ff092ea7e84a1bda6a8eba45f34aba9b.gif"
                    alt="Carousel 4"
                    className="object-cover w-full h-full"
                />
                <img
                    src="https://i.pinimg.com/originals/77/46/1f/77461f4d203c077d57a3620cae044dc9.gif"
                    alt="Carousel 5"
                    className="object-cover w-full h-full"
                />
            </Carousel>
        </div>
    );
};

export default CarouselComponent;
