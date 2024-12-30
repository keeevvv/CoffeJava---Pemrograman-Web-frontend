import React from "react";
import { AiFillHeart } from "react-icons/ai"; // Importing a heart icon from react-icons
import { router } from "@inertiajs/react";
import toast from 'react-hot-toast';

const BottomCart = ({product_id}) => {

     const addFavorite = () => {

        if (!product_id) {
            toast.error('Product ID not found');
            console.log('Product ID not found')
            return;
        }

        const loadingToast = toast.loading('Adding to favorites...');

            try {

                router.visit("/addToFavorites", {
                    method: "post",
                    data: {
                        productId: product_id
                    },
                    onSuccess: (response) => {
                        toast.dismiss(loadingToast)
                        toast.success('Successfully added to favorites!')
                    },
                    onError: (error) => {
                        toast.dismiss(loadingToast)
                        toast.error('Failed to add to favorites')
                        console.log(error)
                    }
                })

            }catch(err) {
                console.log(err)
                toast.dismiss(loadingToast)
                toast.error('Something went wrong')
            }
        }

    return (
        <div className="fixed w-full h-14 inset-x-0 bottom-0 flex items-center ml-2 z-50 lg:hidden">
            <button className="flex items-center justify-center bg-emerald-400 text-white py-2 rounded w-full">
                <span className="text-center">Masukkan ke Tas</span>
            </button>
            <button className="flex items-center text-emerald-400" onClick={() => addFavorite()}>
                <AiFillHeart size={40} className="mr-2" />
            </button>
        </div>
    );
};

export default BottomCart;
