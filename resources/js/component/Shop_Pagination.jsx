import { Inertia } from "@inertiajs/inertia";

const ShopPagination = ({ pagination }) => {
    const { current_page, last_visible_page } = pagination;

    const handlePageChange = (page) => {
        Inertia.get("/shop", { page });
    };

    const handlePrevious = () => {
        if (current_page > 1) {
            handlePageChange(current_page - 1);
        }
    };

    const handleNext = () => {
        if (current_page < last_visible_page) {
            handlePageChange(current_page + 1);
        }
    };

    return (
        <div className="flex justify-evenly">
            <button onClick={handlePrevious} disabled={current_page === 1}>
                Previous
            </button>
            <span>
                Page {current_page} of {last_visible_page}
            </span>
            <button
                onClick={handleNext}
                disabled={current_page === last_visible_page}
            >
                Next
            </button>
        </div>
    );
};

export default ShopPagination;
