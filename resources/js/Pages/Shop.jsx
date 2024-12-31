import NavbarComponent from "../component/Navbar";
import ShopCarouselComponent from "../component/Shop_Carousel";
import ShopCardComponent from "../component/Shop_Card";
import ShopPagination from "../component/Shop_Pagination";
import ShopListOfProducts from "../component/Shop_List_Products";
import FooterLanding from "../component/FooterSection";

import CategoryModal from "../component/Shop_Category_Modal";

import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/react";
import React, { useState } from "react";
import { router } from "@inertiajs/react";

const ShopPage = ({
    user,
    isLoggedIn,
    products,
    pagination,
    categories,
    subCategories,
    specificCategories,
}) => {
    // console.log("Products:", products);
    // console.log("Pagination:", pagination);
    // console.log("categories:", categories);
    // console.log("subCategories:", subCategories);
    // console.log("specificCategories:", specificCategories);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [selectedCategoryFilter, setSelectedCategory] = useState(null); //untuk filter

    const [showSubCategoryModal, setShowSubCategoryModal] = useState(false);
    const [selectedSubCategoryFilter, setSelectedSubCategory] = useState(null); //untuk filter

    const [showSpecificCategoryModal, setShowSpecificCategoryModal] =
        useState(false);
    const [selectedSpecificCategoryFilter, setSelectedSpecificCategory] =
        useState(null); //untuk filter

    const handleFilterChange = () => {
        const params = new URLSearchParams();
        if (selectedCategoryFilter) {
            params.append("categoryId", selectedCategoryFilter);
        }
        if (selectedSubCategoryFilter) {
            params.append("subCategoryId", selectedSubCategoryFilter);
        }
        if (selectedSpecificCategoryFilter) {
            params.append("specificCategoryId", selectedSpecificCategoryFilter);
        }
        params.append("page", 1);

        console.log("Final URL Params:", params.toString());
        // Inertia.get(`/shop?${params.toString()}`);
    };

    return (
        <div>
            <NavbarComponent />
            <ShopCarouselComponent />
            {/* BAGIAN SEARCH DAN FILTER */}
            <div className="sticky flex items-center top-[58px] bg-NusantaraGold w-full p-2">
                {/* BAGIAN FILTER */}
                <div className="hidden sm:flex justify-start gap-4 ">
                    <button
                        className="hover:bg-NusantaraGoldDark text-white px-4 py-2 rounded"
                        onClick={() => setShowCategoryModal(true)}
                    >
                        Category
                    </button>
                    <button className="hover:bg-NusantaraGoldDark text-white px-4 py-2 rounded">
                        SubCategory
                    </button>
                    <button className="hover:bg-NusantaraGoldDark text-white px-4 py-2 rounded">
                        Specific
                    </button>
                </div>
                <div className="sm:hidden relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="hover:bg-NusantaraGoldDark text-white px-4 py-2 w-full text-left rounded align-center"
                    >
                        {isDropdownOpen ? "Close Filters" : "Open Filters"}
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute top-full left-0 w-full bg-NusantaraGold hover:bg-NusantaraGold-400 text-white shadow-lg">
                            <button className="block w-full px-4 py-2 text-left hover:bg-NusantaraGoldDark">
                                Category
                            </button>
                            <button className="block w-full px-4 py-2 text-left hover:bg-NusantaraGoldDark">
                                SubCategory
                            </button>
                            <button className="block w-full px-4 py-2 text-left hover:bg-NusantaraGoldDark">
                                Specific
                            </button>
                        </div>
                    )}
                </div>
                {/* BAGIAN SEARCH */}
                <div className="flex justify-end w-5/12 h-full ml-auto">
                    <input
                        type="text"
                        className="justify-end w-full sm:w-1/2 h-10 bg-white p-2 rounded resize-none focus:outline-none focus:ring-2 focus:ring-NusantaraGoldLight overflow-hidden"
                        placeholder="Search products..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </div>
            </div>

            <div>
                <ShopListOfProducts products={products} />
                <ShopPagination
                    pagination={pagination}
                    selectedCategoryFilter={selectedCategoryFilter}
                />

                <FooterLanding />
            </div>
            <CategoryModal
                isVisible={showCategoryModal}
                onClose={() => setShowCategoryModal(false)}
                categoriesData={categories}
                apply={handleFilterChange}
                setSelectedCategory={setSelectedCategory}
            />
        </div>
    );
};

export default ShopPage;
