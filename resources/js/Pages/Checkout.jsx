import React, { useState, useEffect } from 'react';
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
  console.log("Shipping ID:", shipping_id);
console.log("Total:", total);
console.log("Address:", address);
  
  const [error, setError] = useState("");
  const [paymentType, setPaymentType] = useState("credit_card");


  // const ongkos = 15000;
  const totalTagihan = total;



  const paymentOptions = [
    { id: "credit_card", label: "Credit Card" },
    { id: "other_qris", label: "Qris" },
    { id: "gopay", label: "Gopay" },
    { id: "bca_va", label: "BCA Virtual Account" },
    { id: "bni_va", label: "BNI Virtual Account" },
    { id: "cimb_va", label: "CIMB Virtual Account" },
    { id: "echannel", label: "Mandiri Bill Payment" },
  ];

  useEffect(() => {
    // You can also change below url value to any script url you wish to load, 
    // for example this is snap.js for Sandbox Env (Note: remove `.sandbox` from url if you want to use production version)
    const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';  
  
    let scriptTag = document.createElement('script');
    scriptTag.src = midtransScriptUrl;
  
    // Optional: set script attribute, for example snap.js have data-client-key attribute 
    // (change the value according to your client-key)
    const myMidtransClientKey = 'SB-Mid-client-gnQEOj0Jyg94-ps7';
    scriptTag.setAttribute('data-client-key', myMidtransClientKey);
  
    scriptTag.onload = () => {
      console.log("Midtrans script loaded successfully");
    };

    document.body.appendChild(scriptTag);
  
    return () => {
      document.body.removeChild(scriptTag);
    }
  }, []);
  // Then somewhere else on your React component, `window.snap` global object will be available to use
// e.g. you can then call `window.snap.pay( ... )` function.



//redirect
const handleCheckout = async () => {
  try {

    console.log("Starting checkout process...");
    console.log("Shipping ID:", shipping_id);
    console.log("Payment Type:", paymentType);


    const response = await router.post('/bag/transaction', { shipping_id, payment_type: paymentType });


    console.log("Response from backend:", response);


    if (response.status === "success" && response.redirect_url) {
      console.log("Transaction initialized successfully. Redirecting to:", response.redirect_url);
      window.location.href = response.redirect_url;
    } else {
      console.error("Transaction initialization failed. No redirect URL found.");
      setError("Failed to initialize transaction.");
      toast.error('Transaction initialization failed.');
    }

  } catch (error) {
    console.error("Error during checkout process:", error);
    setError("An unexpected error occurred.");
    toast.error('An unexpected error occurred.');
  }
};


 

// const handleCheckout = async () => {
//   try {
//       console.log("Checkout process started");
//       console.log("Sending POST request to /bag/transaction with the following data:");
//       console.log("Shipping ID:", shipping_id);
//       console.log("Payment Type:", paymentType);

//       // Send the data to the backend using Inertia.js
//       Inertia.post(
//         '/bag/transaction', 
//         { shipping_id, payment_type: paymentType },
//         {
//           onSuccess: (page) => {
//             console.log("Response received:", page.props);
//             if (page.props.status === "success") {
//               const { redirect_url } = page.props.transaction;
//               window.location.href = redirect_url;  // Redirect to payment page
//             } else {
//               setError("Failed to initialize transaction.");
//             }
//           },
//           onError: (errors) => {
//             console.error("Validation errors:", errors);
//             setError(errors.message || "Failed to initialize transaction.");
//           },
//           onFinish: () => {
//             console.log("Request finished.");
//           },
//         }
//       );
//   } catch (error) {
//       console.error("Error during checkout:", error);
//       setError("An unexpected error occurred. Please try again.");
//   }
// };






    return (
      <div><NavbarComponent />
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
            <h2 className="text-lg font-bold mb-4">Ringkasan Tagihan</h2>
            <div className="space-y-4">
              {/* <div className="flex justify-between text-gray-600">
                <p>Total Harga</p>
                <p>{total.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-gray-600">
                <p>Total Ongkos</p>
                <p>Rp{ongkos}</p>
              </div> */}
              <hr />
              <div className="flex justify-between font-bold lg:text-lg text-sm">
                <p>Total Tagihan</p>
                <p>Rp{totalTagihan}</p>
              </div>
            </div>
            <button
              className="w-full bg-NusantaraGold text-white py-3 rounded-lg mt-6 font-medium hover:bg-NusantaraGoldDark"
              onClick={() => {
                console.log('the total is:', total);
                console.log('shipping id:', shipping_id);
                console.log('payment type:', paymentType);
                handleCheckout();
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
  
