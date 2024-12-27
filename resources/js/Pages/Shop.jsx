import NavbarComponent from "../component/Navbar";
import ShopCarouselComponent from "../component/shop_carousel";
import FooterLanding from "../component/FooterSection";

import { Link } from "@inertiajs/react";
import React, {useState} from "react";

const ShopPage = ({user}) => {
    console.log(user);
    return (
        <div>
            <NavbarComponent />
            <ShopCarouselComponent />
            <div className="pt-16">
                <h1>Welcome to the Shop Page</h1>
            </div>
            <FooterLanding />
        </div>
    );
};

export default ShopPage;
