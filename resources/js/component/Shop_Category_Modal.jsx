import react, { useState } from "react";

const CategoryModal = ({
    isVisible,
    onClose,
    categoriesData,
    // apply,
    setSelectedCategory,
}) => {
    if (!isVisible) return null;

    const [selectedCategory, setSelectedCategoryModal] = useState(null);

    const handleClose = (e) => {
        if (e.target.id === "wrapper-01") {
            onClose();
        }
    };

    const handleApply = () => {
        console.log("Selected Category ID:", selectedCategory);
        setSelectedCategory(selectedCategory);
        // apply();
        onClose();
    };

    // console.log("Categories Data:", categoriesData);

    const handleCategorySelect = (categoryId) => {
        setSelectedCategoryModal(categoryId);
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
            onClick={handleClose}
            id="wrapper-01"
        >
            <div className="w-[600px] flex flex-col relative">
                <button
                    className="drop-shadow absolute -top-4 -right-4 bg-white rounded-full w-8 h-8 text-black text-xl  shadow hover:bg-gray-200"
                    onClick={() => onClose()}
                >
                    X
                </button>
                <div className=" w-full max-h-[600px] bg-white rounded">
                    <div className="m-4  font-extrabold">Category</div>
                    <hr className="border border-1 border-gray-300" />
                    <div className="flex flex-col p-2 max-h-[300px] overflow-y-auto">
                        {categoriesData
                            .slice()
                            .sort((a, b) =>
                                a.category_name.localeCompare(b.category_name)
                            )
                            .map((category) => (
                                <button
                                    key={category.category_id}
                                    className={`p-2 text-left rounded hover:bg-gray-200 ${
                                        selectedCategory ===
                                        category.category_id
                                            ? "bg-gray-300"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        handleCategorySelect(
                                            category.category_id
                                        )
                                    }
                                >
                                    {category.category_name}
                                </button>
                            ))}
                    </div>
                    <hr className="border border-1 border-gray-300" />
                    <div className="w-full grid place-items-end">
                        <button
                            className={`m-2 w-20 bg-blue-500 text-white p-2 rounded ${
                                !selectedCategory
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                            }`}
                            onClick={handleApply}
                            disabled={!selectedCategory}
                        >
                            Apply
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryModal;
