import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { Link } from "@inertiajs/react";
import {Inertia} from "@inertiajs/inertia";

export default function ShippingDetail() {
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    country: "",
    postal: "",
    courier: "",
    cost: 15000,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log('input changeed: ${name} -> ${value}');
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSimpan = async (e) => {
    e.preventDefault();
    console.log("going to checkout page with form data:", formData);

    try{
      Inertia.post('/bag/add-shipping',  formData, {
        onStart: () => console.log("POST request started"),
        onSuccess: (response) => console.log("POST request successful", response),
        onError: (errors) => {
          console.error("POST request error:", errors);
          alert("An error occurred: " + errors.msg || "Please check your inputs.");
        },
        onFinish: () => console.log("POST request finished"),
      });
    } catch (e){
      console.error("error in form submission", e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-xl font-bold mb-6">Add New Shipping Address</h1>

      <form
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleSimpan}
      >
        <div className="mb-4">
          <input
            required
            type="text"
            name="address"
            placeholder="Alamat Lengkap"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <div className="mb-4">
          <input
            required
            type="text"
            name="city"
            placeholder="Kota"
            value={formData.city}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <div className="mb-4">
          <input
            required
            type="text"
            name="country"
            placeholder="Negara"
            value={formData.country}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <div className="mb-4">
          <input
            required
            type="text"
            name="postal"
            placeholder="Kode Pos"
            value={formData.postal}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <div className="mb-6">
          <input
            required
            type="text"
            name="courier"
            placeholder="Kurir"
            value={formData.courier}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-orange-400 text-white py-2 px-4 rounded hover:bg-orange-500 focus:outline-none"
          >
            Simpan
          </button>

          <Link href="/bag/addresslist">
            <button
              type="button"
              className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500 focus:outline-none"
            >
              Pilih Alamat
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
