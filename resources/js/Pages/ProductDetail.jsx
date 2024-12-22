import React, { useEffect, useState } from "react";
import NavbarComponent from "../component/Navbar";
import CarouselComponent from "../component/Carousel";
import BottomCart from "../component/BottomCart";
import { TabsComponent } from "../component/Tabs";
import HorizontalCardList, { CardList } from "../component/CardList";
import ProductProfile from "../component/ProductProfile";
import StickyCard from "../component/StickyCard";
import FooterLanding from "../component/FooterSection";
import { usePage } from "@inertiajs/react";

const ProductDetail = () => {
    const { product } = usePage().props;
    const [quantity, setQuantity] = useState(1);


    return (
        <div>
            <NavbarComponent />
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
                    />
                </div>

                <BottomCart />
            </div>
            <div className="mx-10">
                <HorizontalCardList />
                <p className="text-justify">
                    Kaguya is a beautiful, fair-skinned young girl with long
                    black hair that is usually tied by a black-red ribbon (her
                    hair appears to be mid-back length when she lets it down)
                    with bangs/hair strands hanging on either side, large,
                    almond-shaped red eyes (that can look sharper, depending on
                    her mood), thin eyebrows and a slim, but feminine build,
                    with a noticeably small chest. She is described in her manga
                    character profile as possessing 'stunning beauty'.
                </p>
                <p className="text-justify">
                    Kaguya is a beautiful, fair-skinned young girl with long
                    black hair that is usually tied by a black-red ribbon (her
                    hair appears to be mid-back length when she lets it down)
                    with bangs/hair strands hanging on either side, large,
                    almond-shaped red eyes (that can look sharper, depending on
                    her mood), thin eyebrows and a slim, but feminine build,
                    with a noticeably small chest. She is described in her manga
                    character profile as possessing 'stunning beauty'.
                </p>
                <p className="text-justify">
                    Kaguya is a beautiful, fair-skinned young girl with long
                    black hair that is usually tied by a black-red ribbon (her
                    hair appears to be mid-back length when she lets it down)
                    with bangs/hair strands hanging on either side, large,
                    almond-shaped red eyes (that can look sharper, depending on
                    her mood), thin eyebrows and a slim, but feminine build,
                    with a noticeably small chest. She is described in her manga
                    character profile as possessing 'stunning beauty'.
                </p>
                <p className="text-justify">
                    Kaguya is a beautiful, fair-skinned young girl with long
                    black hair that is usually tied by a black-red ribbon (her
                    hair appears to be mid-back length when she lets it down)
                    with bangs/hair strands hanging on either side, large,
                    almond-shaped red eyes (that can look sharper, depending on
                    her mood), thin eyebrows and a slim, but feminine build,
                    with a noticeably small chest. She is described in her manga
                    character profile as possessing 'stunning beauty'.
                </p>
                <p className="text-justify">
                    Kaguya is a beautiful, fair-skinned young girl with long
                    black hair that is usually tied by a black-red ribbon (her
                    hair appears to be mid-back length when she lets it down)
                    with bangs/hair strands hanging on either side, large,
                    almond-shaped red eyes (that can look sharper, depending on
                    her mood), thin eyebrows and a slim, but feminine build,
                    with a noticeably small chest. She is described in her manga
                    character profile as possessing 'stunning beauty'.
                </p>
                <p className="text-justify">
                    Kaguya is a beautiful, fair-skinned young girl with long
                    black hair that is usually tied by a black-red ribbon (her
                    hair appears to be mid-back length when she lets it down)
                    with bangs/hair strands hanging on either side, large,
                    almond-shaped red eyes (that can look sharper, depending on
                    her mood), thin eyebrows and a slim, but feminine build,
                    with a noticeably small chest. She is described in her manga
                    character profile as possessing 'stunning beauty'.
                </p>
                <p className="text-justify">
                    Kaguya is a beautiful, fair-skinned young girl with long
                    black hair that is usually tied by a black-red ribbon (her
                    hair appears to be mid-back length when she lets it down)
                    with bangs/hair strands hanging on either side, large,
                    almond-shaped red eyes (that can look sharper, depending on
                    her mood), thin eyebrows and a slim, but feminine build,
                    with a noticeably small chest. She is described in her manga
                    character profile as possessing 'stunning beauty'.
                </p>
                <p className="text-justify">
                    Kaguya is a beautiful, fair-skinned young girl with long
                    black hair that is usually tied by a black-red ribbon (her
                    hair appears to be mid-back length when she lets it down)
                    with bangs/hair strands hanging on either side, large,
                    almond-shaped red eyes (that can look sharper, depending on
                    her mood), thin eyebrows and a slim, but feminine build,
                    with a noticeably small chest. She is described in her manga
                    character profile as possessing 'stunning beauty'.
                </p>
                <p className="text-justify">
                    Kaguya is a beautiful, fair-skinned young girl with long
                    black hair that is usually tied by a black-red ribbon (her
                    hair appears to be mid-back length when she lets it down)
                    with bangs/hair strands hanging on either side, large,
                    almond-shaped red eyes (that can look sharper, depending on
                    her mood), thin eyebrows and a slim, but feminine build,
                    with a noticeably small chest. She is described in her manga
                    character profile as possessing 'stunning beauty'.
                </p>
                <p className="text-justify">
                    Kaguya is a beautiful, fair-skinned young girl with long
                    black hair that is usually tied by a black-red ribbon (her
                    hair appears to be mid-back length when she lets it down)
                    with bangs/hair strands hanging on either side, large,
                    almond-shaped red eyes (that can look sharper, depending on
                    her mood), thin eyebrows and a slim, but feminine build,
                    with a noticeably small chest. She is described in her manga
                    character profile as possessing 'stunning beauty'.
                </p>
                <p className="text-justify">
                    Kaguya is a beautiful, fair-skinned young girl with long
                    black hair that is usually tied by a black-red ribbon (her
                    hair appears to be mid-back length when she lets it down)
                    with bangs/hair strands hanging on either side, large,
                    almond-shaped red eyes (that can look sharper, depending on
                    her mood), thin eyebrows and a slim, but feminine build,
                    with a noticeably small chest. She is described in her manga
                    character profile as possessing 'stunning beauty'.
                </p>
                <p className="text-justify">
                    Kaguya is a beautiful, fair-skinned young girl with long
                    black hair that is usually tied by a black-red ribbon (her
                    hair appears to be mid-back length when she lets it down)
                    with bangs/hair strands hanging on either side, large,
                    almond-shaped red eyes (that can look sharper, depending on
                    her mood), thin eyebrows and a slim, but feminine build,
                    with a noticeably small chest. She is described in her manga
                    character profile as possessing 'stunning beauty'.
                </p>
                <p className="text-justify">
                    Kaguya is a beautiful, fair-skinned young girl with long
                    black hair that is usually tied by a black-red ribbon (her
                    hair appears to be mid-back length when she lets it down)
                    with bangs/hair strands hanging on either side, large,
                    almond-shaped red eyes (that can look sharper, depending on
                    her mood), thin eyebrows and a slim, but feminine build,
                    with a noticeably small chest. She is described in her manga
                    character profile as possessing 'stunning beauty'.
                </p>
                <p className="text-justify">
                    Kaguya is a beautiful, fair-skinned young girl with long
                    black hair that is usually tied by a black-red ribbon (her
                    hair appears to be mid-back length when she lets it down)
                    with bangs/hair strands hanging on either side, large,
                    almond-shaped red eyes (that can look sharper, depending on
                    her mood), thin eyebrows and a slim, but feminine build,
                    with a noticeably small chest. She is described in her manga
                    character profile as possessing 'stunning beauty'.
                </p>
                <p className="text-justify">
                    Kaguya is a beautiful, fair-skinned young girl with long
                    black hair that is usually tied by a black-red ribbon (her
                    hair appears to be mid-back length when she lets it down)
                    with bangs/hair strands hanging on either side, large,
                    almond-shaped red eyes (that can look sharper, depending on
                    her mood), thin eyebrows and a slim, but feminine build,
                    with a noticeably small chest. She is described in her manga
                    character profile as possessing 'stunning beauty'.
                </p>
                <p className="text-justify">
                    Kaguya is a beautiful, fair-skinned young girl with long
                    black hair that is usually tied by a black-red ribbon (her
                    hair appears to be mid-back length when she lets it down)
                    with bangs/hair strands hanging on either side, large,
                    almond-shaped red eyes (that can look sharper, depending on
                    her mood), thin eyebrows and a slim, but feminine build,
                    with a noticeably small chest. She is described in her manga
                    character profile as possessing 'stunning beauty'.
                </p>
                <p className="text-justify">
                    Kaguya is a beautiful, fair-skinned young girl with long
                    black hair that is usually tied by a black-red ribbon (her
                    hair appears to be mid-back length when she lets it down)
                    with bangs/hair strands hanging on either side, large,
                    almond-shaped red eyes (that can look sharper, depending on
                    her mood), thin eyebrows and a slim, but feminine build,
                    with a noticeably small chest. She is described in her manga
                    character profile as possessing 'stunning beauty'.
                </p>
            </div>
            <FooterLanding />
        </div>
    );
};

export default ProductDetail;
