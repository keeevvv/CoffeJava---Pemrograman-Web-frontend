import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/react";

const ShopPagination = ({ pagination }) => {
    const { current_page, last_visible_page } = pagination;

    return (
        <div className="flex justify-center my-5 gap-5">
            <Link
                href={`/shop?page=${current_page - 1}`}
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
                href={`/shop?page=${current_page + 1}`}
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
