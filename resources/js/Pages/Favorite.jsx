import React, { useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { router } from "@inertiajs/react";
import toast, { Toaster } from "react-hot-toast";
import NavbarComponent from "../component/Navbar";

const Favorite = () => {
    const { auth } = usePage().props;
    const [isLoading, setIsLoading] = useState(false);
    const [favorites, setFavorites] = useState(auth?.favorites || []);

    if (!auth?.favorites || auth.favorites.length === 0) {
        return (
            <>
                <NavbarComponent />
                <Toaster position="top-right" />
                <Head title="My Favorites" />
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">
                        My Favorites
                    </h1>
                    <div className="text-center py-12">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400 mb-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No favorites yet
                        </h3>
                        <p className="text-gray-500">
                            Items you favorite will appear here
                        </p>
                    </div>
                </div>
            </>
        );
    }
    //   `/favorites/${id}`

    const removeFavorite = (id) => {
        setIsLoading(true);
        const loadingToast = toast.loading("Removing item...");

        // Optimistic update - update UI dulu sebelum request selesai
        setFavorites((prevFavorites) =>
            prevFavorites.filter((fav) => fav.product?.product_id !== id)
        );

        router.delete(`/favorites/${id}`, {
            preserveState: true, // Mencegah refresh seluruh state
            preserveScroll: true, // Menjaga posisi scroll
            data: {
                productId: id,
            },
            onSuccess: (page) => {
                // Hanya update jika response dari server berbeda
                if (page.props.favorites) {
                    setFavorites(page.props.favorites);
                }

                toast.success("Item removed from favorites");
                setIsLoading(false);
                toast.dismiss(loadingToast);
                console.log("Current favorites before deletion:", favorites);
                console.log("ID to delete:", id);
            },
            onError: (errors) => {
                // Rollback state jika gagal
                if (auth?.favorites) {
                    setFavorites(auth.favorites);
                }

                console.error("Delete error:", errors);
                toast.dismiss(loadingToast);
                toast.error(errors.error || "Failed to remove item");
                setIsLoading(false);
            },
        });
    };

    return (
        <>
            <Toaster position="top-right" />
            <Head title="My Favorites" />

            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">
                    My Favorites
                </h1>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {auth.favorites.map((favorite) => (
                        <div
                            key={favorite.favorite_id}
                            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                        >
                            <div className="aspect-w-1 aspect-h-1 w-full">
                                {favorite.product?.images && (
                                    <img
                                        src={
                                            favorite.product.images[0].image_url
                                        }
                                        alt={favorite.product.pName}
                                        className="w-full h-64 object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src =
                                                "/placeholder-image.jpg";
                                        }}
                                    />
                                )}
                            </div>

                            <div className="p-4">
                                <h2 className="text-xl font-bold text-gray-900 mb-2">
                                    {favorite.product?.pName}
                                </h2>
                                <p className="text-lg text-indigo-600 font-semibold mb-2">
                                    ${favorite.product?.price}
                                </p>
                                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                    {favorite.product?.desc}
                                </p>

                                <button
                                    onClick={() =>
                                        removeFavorite(
                                            favorite.product?.product_id
                                        )
                                    }
                                    disabled={isLoading}
                                    className={`flex items-center text-gray-400 hover:text-red-500 transition-colors ${
                                        isLoading
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                    }`}
                                >
                                    <svg
                                        className="h-5 w-5 mr-1"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="M3 6h18" />
                                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                    </svg>
                                    <span>Remove</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Favorite;
