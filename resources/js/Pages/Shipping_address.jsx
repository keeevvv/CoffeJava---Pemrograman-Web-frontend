import React, { useState } from 'react';
// import { Head } from '@inertiajs/react'; // Head was not in your original code, uncomment if you plan to use it
import { usePage, Link } from '@inertiajs/react';
import NavbarComponent from "../component/Navbar";
import { Inertia } from "@inertiajs/inertia";
import FooterLanding from "../component/FooterSection";

export default function Shipping_address() {
    const { shippingData = [] } = usePage().props; // Added default empty array for safety
    const [selectedAddress, setSelectedAddress] = useState(null);

    const handleProceedToCheckout = () => {
        if (selectedAddress) {
            console.log("Going to checkout with address ID", selectedAddress);
            Inertia.post('/bag/select-shipping', {
                shipping_id: selectedAddress,
            });
        } else {
            alert("Please select a shipping address.");
        }
    };

    const handleEditAddress = (addressId) => {
  Inertia.visit(`/bag/editaddress/${addressId}`);
};


    return (
        <div>
            <NavbarComponent />
            <div className="min-h-screen bg-gray-100 p-8 mt-16">
                {/* <Head title="Shipping Addresses" /> */} {/* Uncomment if you add Head import and want to set title */}
                <h1 className="text-3xl font-bold mb-8 text-gray-800">Shipping Addresses</h1>

                {/* Top action buttons */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0 sm:space-x-4">
                    <Link href="/bag/addnewaddress" className="w-full sm:w-auto">
                        <button className="w-full sm:w-auto bg-green-500 text-white px-6 py-2.5 rounded-md hover:bg-green-600 font-medium text-sm shadow hover:shadow-md transition-shadow">
                            Add New Address
                        </button>
                    </Link>
                    <button
                        className={`w-full sm:w-auto px-6 py-2.5 rounded-md font-medium text-sm text-white shadow hover:shadow-md transition-shadow ${
                            selectedAddress ? 'bg-orange-500 hover:bg-orange-600' : 'bg-stone-950 hover:bg-black cursor-not-allowed' // Kept original bg-stone-950 for disabled/default to match image's dark button
                        }`}
                        onClick={handleProceedToCheckout}
                        disabled={!selectedAddress}
                    >
                        Proceed to Checkout
                    </button>
                </div>

                {/* Address List */}
                {shippingData && shippingData.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Retained md:grid-cols-2 from your original code for multiple addresses */}
                        {shippingData.map((address) => (
                            <div
                                key={address.shipping_id}
                                className={`bg-white p-6 rounded-lg shadow-lg ${ // Enhanced shadow
                                    selectedAddress === address.shipping_id ? "ring-2 ring-offset-2 ring-green-500" : "border border-gray-200"
                                } transition-all duration-150 ease-in-out`}
                            >
                                <h2 className="text-lg font-semibold text-gray-800 mb-2">{address.address}</h2>
                                <p className="text-sm text-gray-600 mb-1">City: {address.city}</p>
                                <p className="text-sm text-gray-600 mb-1">Country: {address.country}</p>
                                <p className="text-sm text-gray-600 mb-1">Postal Code: {address.postal}</p>
                                <p className="text-sm text-gray-600 mb-1">Courier: {address.courier}</p>
                                <p className="text-sm text-gray-700 font-medium mb-4">Cost: RP {address.cost}</p> {/* Added mb-4 for spacing before actions */}

                                {/* Actions: Checkbox and Edit Button aligned as per image */}
                                <div className="mt-4 flex justify-between items-center">
                                    <label className="flex items-center text-sm text-gray-700 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={selectedAddress === address.shipping_id}
                                            // Allow unchecking by clicking again
                                            onChange={() => setSelectedAddress(selectedAddress === address.shipping_id ? null : address.shipping_id)}
                                            className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:ring-offset-1 mr-2"
                                        />
                                        Use as the shipping address
                                    </label>
                                    <Link
                                        href={`/bag/editaddress/${address.shipping_id}`}
                                        className="bg-orange-500 text-white px-4 py-1.5 rounded-md hover:bg-orange-600 text-sm font-medium shadow hover:shadow-md transition-shadow"
                                        >
                                        Edit Address
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white p-10 rounded-lg shadow-lg text-center">
                       <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                         <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                       </svg>
                       <h3 className="mt-2 text-lg font-medium text-gray-900">No shipping addresses</h3>
                       <p className="mt-1 text-sm text-gray-500">Get started by adding a new shipping address.</p>
                       <div className="mt-6">
                         <Link href="/bag/addnewaddress">
                            <button
                                type="button"
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Add New Address
                            </button>
                         </Link>
                       </div>
                    </div>
                )}
            </div>
            <FooterLanding />
        </div>
    );
}