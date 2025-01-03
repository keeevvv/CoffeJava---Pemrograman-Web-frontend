import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import NavbarComponent from "../component/Navbar";
import {Inertia} from "@inertiajs/inertia";
import FooterLanding from "../component/FooterSection";


export default function Shipping_address() {
    
    const { shippingData } = usePage().props;
    
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

    return (
        <div><NavbarComponent />
        <div className="min-h-screen bg-gray-100 p-8 mt-16">
            <h1 className="text-2xl font-bold mb-6">Shipping Addresses</h1>

            {/* buttons */}
            <div className="flex justify-between mb-6">
                <Link href="/bag/addnewaddress">
                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                        Add New Address
                    </button>
                </Link>
                <button
                    className={`px-4 py-2 rounded text-white ${
                        selectedAddress ? 'bg-orange-500 hover:bg-orange-600' : 'bg-stone-950 cursor-not-allowed'
                    }`}
                    onClick={handleProceedToCheckout}
                    disabled={!selectedAddress}
                >
                    Proceed to Checkout
                </button>
            </div>

            {/* Address List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {shippingData.length ? (
                    shippingData.map((address) => (
                        <div
                            key={address.shipping_id}
                            className={`bg-white p-4 rounded-lg shadow hover:shadow-lg ${
                                selectedAddress === address.shipping_id ? "ring-2 ring-green-500" : ""
                            }`}
                        >
                            <h2 className="text-lg font-bold">{address.address}</h2>
                            <p className="text-gray-600">City: {address.city}</p>
                            <p className="text-gray-600">Country: {address.country}</p>
                            <p className="text-gray-600">Postal Code: {address.postal}</p>
                            <p className="text-gray-600">Courier: {address.courier}</p>
                            <p className="text-gray-600">Cost: RP {address.cost}</p>

                            <div className="mt-4">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedAddress === address.shipping_id}
                                        onChange={() => setSelectedAddress(address.shipping_id)}
                                        className="mr-2"
                                    />
                                    Use as the shipping address
                                </label>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No shipping addresses available.</p>
                )}
            </div>
        </div>
        <div>

                <FooterLanding />
            </div>
        </div>
    );
}
