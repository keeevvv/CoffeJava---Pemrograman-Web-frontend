import React, { useEffect, useState } from "react";
import ShopCardComponent from "./Shop_Card";

const PopularProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    "https://backendenusantara.se4603.my.id/api/v1/products?limit=10"
                );
                const data = await response.json();

                if (response.ok) {
                    setProducts(data.data);
                } else {
                    setError("Failed to fetch products.");
                }
            } catch (error) {
                setError("Error fetching products.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <section>
            <h1 className="flex items-center text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold dark:text-white justify-center mt-5">
                Product Popular
            </h1>
            <div className="mt-4 sm:m-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
                <div className="flex gap-4 w-max">
                    {products.map((product) => (
                        <div className="snap-start">
                            <ShopCardComponent
                                key={product.product_id}
                                product={product}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularProduct;
