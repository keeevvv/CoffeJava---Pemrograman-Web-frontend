import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { router } from '@inertiajs/react';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from "@inertiajs/react";
import NavbarComponent from "../component/Navbar";
import FooterLanding from "../component/FooterSection";



export default function Checkout() {
  const {shipping_id} = usePage().props;
  const { total } = usePage().props;
  const {address} = usePage().props;
  
  const [error, setError] = useState("");
  const [paymentType, setPaymentType] = useState("credit_card");


  const ongkos = 15000;
  const totalTagihan = ongkos+total;



  const paymentOptions = [
    { id: "credit_card", label: "Credit Card" },
    { id: "bca_va", label: "BCA Virtual Account" },
    { id: "bni_va", label: "BNI Virtual Account" },
    { id: "cimb_va", label: "CIMB Virtual Account" },
    { id: "mandiri_va", label: "Mandiri Virtual Account" },
    { id: "danamon_va", label: "Danamon Virtual Account" },
  ];


  const handleSubmit = () => {
    if (!paymentType) {
      setError("Please select a payment method.");
      return;
    }
    setError(""); // Clear error
    console.log(`Selected Payment Type: ${paymentType}`);
    //midtrans logic goes here
  };


    return (
      <div><NavbarComponent />
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
  
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* address */}
          <div className="col-span-2 bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-bold mb-4">Alamat Pengiriman</h2>
            <div className="flex justify-between items-start mb-6">
 
              <div>
                <p className="text-gray-600">Alamat: {address.address}</p>
              <p className="text-gray-600">Kota: {address.city}</p>
              <p className="text-gray-600">Negara: {address.country}</p>
              <p className="text-gray-600">Kode Pos: {address.postal}</p>
              <p className="text-gray-600">Kurir: {address.courier}</p>
              <p className="text-gray-600">Biaya Pengiriman: Rp{address.cost}</p>
              </div>
              <Link href = "/bag/addresslist">
              <button
                className="text-blue-500 hover:text-blue-700 font-medium"
              >
                Ganti
              </button>
              </Link>
            </div>
  
            {/* payment method */}
            <h2 className="text-lg font-bold mb-4">Metode Pembayaran</h2>
            {paymentOptions.map((seleksi) => (
            <div key={seleksi.id} className="flex items-center border-b border-gray-200 py-4">
              <input
                type="radio"
                name="paymentMethod"
                id={seleksi.id}
                className="mr-4"
                checked={paymentType === seleksi.id}
                onChange={() => {
                  setPaymentType(seleksi.id);
                  console.log(`payment type: ${seleksi.id}`);
                }}
              />
              <label htmlFor={seleksi.id} className="flex items-center cursor-pointer">
                {/* <img
                  src="https://via.placeholder.com/40"
                  alt={`${seleksi.label} Logo`}
                  className="h-6 mr-2"
                /> */}
                {seleksi.label}
              </label>
            </div>
          ))}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
         
  
          {/* order summary */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-bold mb-4">Cek ringkasan transaksimu, yuk</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-gray-600">
                <p>Total Harga</p>
                <p>{total.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-gray-600">
                <p>Total Ongkos</p>
                <p>Rp{ongkos}</p>
              </div>
              <hr />
              <div className="flex justify-between font-bold text-lg">
                <p>Total Tagihan</p>
                <p>Rp{totalTagihan.toFixed(2)}</p>
              </div>
            </div>
            <button
              className="w-full bg-NusantaraGold text-white py-3 rounded-lg mt-6 font-medium hover:bg-NusantaraGoldDark"
              onClick={() => {
                console.log('Checkout Button Clicked');
                console.log('the total is:', total);
                console.log('shipping id:', shipping_id);
                console.log('payment type:', paymentType);
                handleSubmit
              }}
            >
              Bayar Sekarang
            </button>
          </div>
        </div>
      </div>
      <div>

                <FooterLanding />
            </div>
      </div>
    );
  };
  
