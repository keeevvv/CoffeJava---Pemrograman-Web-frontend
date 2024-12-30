import ShopCardComponent from "./Shop_Card";
import react from "react";

const ShopListOfProducts = ({ products = [] }) => {
    if (!products || products.length === 0) {
        return <div>No product available now.</div>;
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
