import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/react";

const ShopPagination = ({
    pagination,
    selectedCategoryFilter,
    selectedSubCategoryFilter,
    selectedSpecificCategoryFilter,
    searchValue,
}) => {
    const { current_page, last_visible_page } = pagination;

    const createQueryString = (page) => {
        const params = new URLSearchParams();
        params.append("page", page);
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

        return params.toString();
    };

    if (!last_visible_page || last_visible_page === 0) {
        return null;
    }

    return (
        <div className="flex justify-center my-5 gap-5">
            <Link
                href={`/shop?${createQueryString(current_page - 1)}`}
                className={`px-4 py-2 text-white rounded ${
                    current_page === 1
                        ? "bg-gray-300 cursor-not-allowed pointer-events-none"
                        : "bg-NusantaraGold hover:bg-NusantaraGoldDark"
                }`}
            >
                Prev
            </Link>
            <span className="flex justify-center items-center">
                Page {current_page} of {last_visible_page}
            </span>
            <Link
                href={`/shop?${createQueryString(current_page + 1)}`}
                className={`px-4 py-2 text-white rounded ${
                    current_page === last_visible_page
                        ? "bg-gray-300 cursor-not-allowed pointer-events-none"
                        : "bg-NusantaraGold hover:bg-NusantaraGoldDark"
                }`}
            >
                Next
            </Link>
        </div>
    );
};

export default ShopPagination;
