import React, { useState } from "react";

export function TabsComponent({ product }) {
    const categories = product?.data?.categories;
   
    const subCategories = product?.data?.subCategories;
    const spesificSubCategries = product?.data?.specificSubCategories;
    const allCategories = categories
        .map((category) => category?.category_name)
        .join(", ");
    const allSubCategories = subCategories
        .map((category) => category?.sub_category_name)
        .join(", ");

    const allSpesificSubCategries = spesificSubCategries
        .map((category) => category?.specific_sub_category_name)
        .join(", ");

    const tab1 = (
        <div>
            <ul className="list-none ">
                <li>
                    <strong>Model:</strong> {product?.data?.product_id}
                </li>
                <li>
                    <strong>Brand:</strong> {product?.data?.brand}
                </li>
                <li>
                    <strong>Categories:</strong> {allCategories}
                </li>
                <li>
                    <strong>Subcategories:</strong> {allSubCategories}
                </li>
                <li>
                    <strong>SpesificSubCategories:</strong>
                    {allSpesificSubCategries}
                </li>
            </ul>
        </div>
    );

    const tab2 = (
        <div>
            <ul className="list-none text-nowrap">
                {product?.data?.stock?.map((item, index) => (
                    <li key={index}>Size {item?.size}: {item?.quantity} </li>
                ))}
            </ul>
        </div>
    );

    const [curenTab, setCurentTab] = useState(tab1);

    return (
        <div id="tabbar" className="w-full bg-NusantaraGoldLight rounded-md mt-4">
            <div className="bg-NusantaraGold flex justify-between px-8 text-2xl lg:text-base xl:text-xl rounded-md p-2">
                <h1
                    className={`cursor-pointer ${
                        curenTab === tab1 ? "underline" : ""
                    }`}
                    onClick={() => {
                        setCurentTab(tab1);
                    }}
                >
                    Informasi
                </h1>
                <h1
                    className={`cursor-pointer ${
                        curenTab === tab2 ? "underline" : ""
                    }`}
                    onClick={() => {
                        setCurentTab(tab2);
                    }}
                >
                    Tentang
                </h1>
            </div>
            <div className="mt-4">
                <div className="text-justify lg:text-base xl:text-lg text-gray-700 mx-4">
                    {curenTab}
                </div>
            </div>
        </div>
    );
}
