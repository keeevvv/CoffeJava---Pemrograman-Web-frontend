import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { Inertia } from '@inertiajs/inertia';

import NavbarComponent from "../component/Navbar";
import FooterLanding from "../component/FooterSection";

export default function Shipping_Edit() {
  // Assuming your backend sends the address to be edited as a prop named 'addressToEdit'
  // and it includes the 'shipping_id'
  const { addressToEdit } = usePage().props;

  const [formData, setFormData] = useState({
    shipping_id: "", // Make sure to include the ID for the update request
    address: "",
    city: "",
    country: "",
    postal: "",
    courier: "",
    cost: 15000, 
  });

  // Pre-fill the form when the component mounts or addressToEdit changes
  useEffect(() => {
    if (addressToEdit) {
      setFormData({
        shipping_id: addressToEdit.shipping_id || "",
        address: addressToEdit.address || "",
        city: addressToEdit.city || "",
        country: addressToEdit.country || "",
        postal: addressToEdit.postal || "",
        courier: addressToEdit.courier || "",
        cost: addressToEdit.cost || 15000,
      });
    }
  }, [addressToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`input changed: ${name} -> ${value}`);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateAddress = async (e) => {
    e.preventDefault();
    console.log("Updating address with form data:", formData);

    if (!formData.shipping_id) {
        alert("Error: Address ID is missing. Cannot update.");
        return;
    }

    try {
      router.put(`/bag/update-shipping/${formData.shipping_id}`, formData, {
        onStart: () => console.log("PUT request started"),
        preserveState: true,
        onSuccess: (page) => {
            console.log("PUT request successful", page);
            
            alert("Address updated successfully!");
         
        },
        onError: (errors) => {
          console.error("PUT request error:", errors);
          let errorMessage = "Please check your inputs.";
          if (errors && typeof errors === 'object') {
            const firstErrorKey = Object.keys(errors)[0];
            if (firstErrorKey && Array.isArray(errors[firstErrorKey])) {
              errorMessage = errors[firstErrorKey][0];
            } else if (firstErrorKey) {
              errorMessage = errors[firstErrorKey];
            } else if (errors.message) {
                errorMessage = errors.message;
            } else if (errors.msg) { 
                errorMessage = errors.msg;
            }
          }
          alert("An error occurred: " + errorMessage);
        },
        onFinish: () => console.log("PUT request finished"),
      });
    } catch (error) {
      console.error("Error in form submission", error);
      alert("A critical error occurred during submission.");
    }
  };

  return (
    <div><NavbarComponent />
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 mt-16">
      <h1 className="text-xl font-bold mb-6">Edit Shipping Address</h1>

      <form
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleUpdateAddress}
      >


        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
          <input
            required
            type="text"
            name="address"
            id="address"
            placeholder="Alamat Lengkap"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">Kota</label>
          <input
            required
            type="text"
            name="city"
            id="city"
            placeholder="Kota"
            value={formData.city}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Negara</label>
          <input
            required
            type="text"
            name="country"
            id="country"
            placeholder="Negara"
            value={formData.country}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="postal" className="block text-sm font-medium text-gray-700 mb-1">Kode Pos</label>
          <input
            required
            type="text"
            name="postal"
            id="postal"
            placeholder="Kode Pos"
            value={formData.postal}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <div className="mb-4"> 
          <label htmlFor="courier" className="block text-sm font-medium text-gray-700 mb-1">Kurir</label>
          <input
            required
            type="text"
            name="courier"
            id="courier"
            placeholder="Kurir"
            value={formData.courier}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <div className="mb-6"> 
            <label htmlFor="cost" className="block text-sm font-medium text-gray-700 mb-1">Cost (RP)</label>
            <input
                required
                type="number" 
                name="cost"
                id="cost"
                placeholder="Shipping Cost"
                value={formData.cost}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 focus:outline-none" // Matched orange color with previous page's checkout
          >
            Update Address
          </button>

          <Link href="/bag/addresslist">
            <button
              type="button"
              className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500 focus:outline-none"
            >
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
    <div>
        <FooterLanding />
    </div>
    </div>
  );
}