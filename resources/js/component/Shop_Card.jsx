import { Card } from "flowbite-react";
import logo from "../assets/images/logo.png";

export default function ShopCardComponent({ product }) {
    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 2, // Jumlah angka di belakang koma
        }).format(number);
    };
    const ratingsCount = product.rattings ? product.rattings.length : 0;

    return (
        <Card className="max-w-sm">
            {product.images && product.images.length > 0 ? (
                <img
                    src={product.images[0]}
                    alt={product.pName}
                    className="w-full h-48 object-cover"
                />
            ) : (
                <img
                    src={logo}
                    alt={product.pName}
                    className="w-full h-48 object-cover"
                />
            )}

            <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {product.pName}
                </h5>
            </a>
            <div className="mb-2 mt-2.5 flex items-center">
                <svg
                    className="h-8 w-8 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
                    {ratingsCount} Review
                </span>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                    {formatRupiah(product.price.toFixed(2))}
                </span>
                <a
                    href={`/product/${product.product_id}`}
                    className="rounded-lg bg-NusantaraGold px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-NusantaraGoldDark focus:outline-none focus:ring-4 focus:ring-NusantaraGoldLight dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                >
                    See more
                </a>
            </div>
        </Card>
    );
}
