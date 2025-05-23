import NavbarComponent from "../component/Navbar";
import ShopCarouselComponent from "../component/shop_carousel";
import ShopCardComponent from "../component/Shop_Card";
import ShopPagination from "../component/Shop_Pagination";
import ShopListOfProducts from "../component/Shop_List_Products";
import FooterLanding from "../component/FooterSection";

import CategoryModal from "../component/Shop_Category_Modal";
import SubCategoryModal from "../component/Shop_SubCategory_Modal";
import SpecificCategoryModal from "../component/Shop_SpecificCategory_Modal";

import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/react";
import React, { useEffect, useState, useRef } from "react";
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
    const inputRef = useRef(null);

    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [selectedCategoryFilter, setSelectedCategory] = useState(null); //untuk filter

    const [showSubCategoryModal, setShowSubCategoryModal] = useState(false);
    const [selectedSubCategoryFilter, setSelectedSubCategory] = useState(null); //untuk filter

    const [showSpecificCategoryModal, setShowSpecificCategoryModal] =
        useState(false);
    const [selectedSpecificCategoryFilter, setSelectedSpecificCategory] =
        useState(null); //untuk filter

    // //Clear
    const handleReset = () => {
        // Reset semua filter
        setSelectedCategory(null);
        setSelectedSubCategory(null);
        setSelectedSpecificCategory(null);
        setSearchValue("");

        // Kunjungi halaman shop tanpa filter
        router.visit("/shop", {
            method: "get",
        });
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        params.set("page", "1");

        if (
            selectedCategoryFilter != null ||
            selectedSubCategoryFilter != null ||
            selectedSpecificCategoryFilter != null ||
            searchValue != ""
        ) {
            if (selectedCategoryFilter) {
                params.append("categoryId", selectedCategoryFilter);
            }
            if (selectedSubCategoryFilter) {
                params.append("subcategoryId", selectedSubCategoryFilter);
            }
            if (selectedSpecificCategoryFilter) {
                params.append(
                    "specificSubcategoryId",
                    selectedSpecificCategoryFilter
                );
            }
            if (searchValue.trim() !== "") {
                params.append("search", searchValue);
            }
            router.visit(`/shop?page=1&${params.toString()}`, {
                method: "get",
                preserveState: true,
            });
        }
    }, [
        selectedCategoryFilter,
        selectedSubCategoryFilter,
        selectedSpecificCategoryFilter,
        searchValue,
    ]);

    return (
        <div>
            <NavbarComponent />
            <div className="mt-14">
                <ShopCarouselComponent />
            </div>
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
                    <button
                        className="hover:bg-NusantaraGoldDark text-white px-4 py-2 rounded"
                        onClick={() => setShowSubCategoryModal(true)}
                    >
                        SubCategory
                    </button>
                    <button
                        className="hover:bg-NusantaraGoldDark text-white px-4 py-2 rounded"
                        onClick={() => setShowSpecificCategoryModal(true)}
                    >
                        Specific
                    </button>
                    <button
                        className="hover:bg-NusantaraGoldDark text-white px-4 py-2 rounded"
                        onClick={handleReset}
                    >
                        Clear
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
                            <button
                                className="block w-full px-4 py-2 text-left hover:bg-NusantaraGoldDark"
                                onClick={() => setShowCategoryModal(true)}
                            >
                                Category
                            </button>
                            <button
                                className="block w-full px-4 py-2 text-left hover:bg-NusantaraGoldDark"
                                onClick={() => setShowSubCategoryModal(true)}
                            >
                                SubCategory
                            </button>
                            <button
                                className="block w-full px-4 py-2 text-left hover:bg-NusantaraGoldDark"
                                onClick={() =>
                                    setShowSpecificCategoryModal(true)
                                }
                            >
                                Specific
                            </button>
                            <button
                                className="block w-full px-4 py-2 text-left hover:bg-NusantaraGoldDark"
                                onClick={handleReset}
                            >
                                Clear
                            </button>
                        </div>
                    )}
                </div>
                {/* BAGIAN SEARCH */}
                <div className="flex justify-end w-5/12 sm:w-full h-full ml-auto">
                    <input
                        type="text"
                        className="w-full sm:w-1/2 h-10 bg-white p-2 rounded resize-none focus:outline-none focus:ring-2 focus:ring-NusantaraGoldLight overflow-hidden"
                        placeholder="Search products..."
                        ref={inputRef}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                setSearchValue(e.target.value);
                                inputRef.current.value = "";
                            }
                        }}
                    />
                </div>
            </div>

            <div>
                <ShopListOfProducts products={products} />
                <ShopPagination
                    pagination={pagination}
                    selectedCategoryFilter={selectedCategoryFilter}
                    selectedSubCategoryFilter={selectedSubCategoryFilter}
                    selectedSpecificCategoryFilter={
                        selectedSpecificCategoryFilter
                    }
                    searchValue={searchValue}
                />

                <FooterLanding />
            </div>
            <CategoryModal
                isVisible={showCategoryModal}
                onClose={() => setShowCategoryModal(false)}
                categoriesData={categories}
                // apply={handleFilterChange}
                setSelectedCategory={setSelectedCategory}
            />

            <SubCategoryModal
                isVisible={showSubCategoryModal}
                onClose={() => setShowSubCategoryModal(false)}
                subCategoriesData={subCategories}
                // apply={handleFilterChange}
                setSelectedSubCategory={setSelectedSubCategory}
            />

            <SpecificCategoryModal
                isVisible={showSpecificCategoryModal}
                onClose={() => setShowSpecificCategoryModal(false)}
                specificCategoriesData={specificCategories}
                // apply={handleFilterChange}
                setSelectedSpecificCategory={setSelectedSpecificCategory}
            />
        </div>
    );
};

export default ShopPage;
