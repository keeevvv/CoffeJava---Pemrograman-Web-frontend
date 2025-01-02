import ShopCardComponent from "./Shop_Card";
import react from "react";

const ShopListOfProducts = ({ products = [] }) => {
    if (!products || products.length === 0) {
        return (
            <div className="h-full w-full flex flex-col justify-center items-center text-center bg-gray-100 p-4">
                <iframe
                    src="https://giphy.com/embed/giXLnhxp60zEEIkq8K"
                    width="480"
                    height="480"
                    className="giphy-embed"
                    allowFullScreen
                    style={{
                        border: "none",
                        marginBottom: "16px",
                    }}
                ></iframe>
                <p className="text-lg font-semibold text-gray-800">
                    No product available now.
                </p>
            </div>
        );
    }

    return (
        <div className="m-4 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {products.map((product) => (
                <ShopCardComponent key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ShopListOfProducts;
