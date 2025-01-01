import react, { useState } from "react";

const SubCategoryModal = ({
    isVisible,
    onClose,
    subCategoriesData,
    apply,
    setSelectedSubCategory,
}) => {
    if (!isVisible) return null;

    const [selectedSubCategory, setSelectedSubCategoryModal] = useState(null);

    const handleClose = (e) => {
        if (e.target.id === "wrapper-01") {
            onClose();
        }
    };

    const handleApply = () => {
        console.log("Selected SubCategory ID:", selectedSubCategory);
        setSelectedSubCategory(selectedSubCategory);
        apply();
        onClose();
    };

    // console.log("Categories Data:", categoriesData);

    const handleSubCategorySelect = (SubCategoryId) => {
        setSelectedSubCategoryModal(SubCategoryId);
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
                    <div className="m-4  font-extrabold">SubCategory</div>
                    <hr className="border border-1 border-gray-300" />
                    <div className="flex flex-col p-2 max-h-[300px] overflow-y-auto">
                        {subCategoriesData
                            .slice() // Membuat salinan array untuk menghindari mutasi data asli
                            .sort((a, b) =>
                                a.sub_category_name.localeCompare(
                                    b.sub_category_name
                                )
                            )
                            .map((sub_category) => (
                                <button
                                    key={sub_category.sub_category_id}
                                    className={`p-2 text-left rounded hover:bg-gray-200 ${
                                        selectedSubCategory ===
                                        sub_category.sub_category_id
                                            ? "bg-gray-300"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        handleSubCategorySelect(
                                            sub_category.sub_category_id
                                        )
                                    }
                                >
                                    {sub_category.sub_category_name}
                                </button>
                            ))}
                    </div>
                    <hr className="border border-1 border-gray-300" />
                    <div className="w-full grid place-items-end">
                        <button
                            className={`m-2 w-20 bg-blue-500 text-white p-2 rounded ${
                                !selectedSubCategory
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                            }`}
                            onClick={handleApply}
                            disabled={!selectedSubCategory}
                        >
                            Apply
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubCategoryModal;
