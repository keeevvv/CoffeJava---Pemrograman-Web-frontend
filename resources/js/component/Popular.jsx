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
                    "http://localhost:3000/api/v1/products?limit=2"
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
            <h1 className="flex items-center text-5xl font-extrabold dark:text-white justify-center mt-5">
                Product Popular
            </h1>
            <div className="flex flex-row justify-center mt-10 gap-5">
                {products.map((product) => (
                    <ShopCardComponent
                        key={product.product_id}
                        product={product}
                    />
                ))}
            </div>
        </section>
    );
};

export default PopularProduct;
