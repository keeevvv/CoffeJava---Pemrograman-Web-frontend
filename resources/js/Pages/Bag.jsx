import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import {Inertia} from "@inertiajs/inertia";

export default function Bag() {
  const { cart } = usePage().props;
  const cartItems = cart.cart_items || [];
  const subtotal = cartItems.reduce((sum, item) => sum + item.total_price, 0);
  const shipping = 15000;
  const total = subtotal + shipping;


  const handleQuantityChange = (itemId, action) => {
    
    const updatedItems = cartItems.map(item => {
      if (item.cart_item_id === itemId) {
        const updatedItem = { ...item };
        if (action === 'increment') {
          updatedItem.quantity += 1;
        } else if (action === 'decrement' && updatedItem.quantity > 1) {
          updatedItem.quantity -= 1;
        }
        return updatedItem;
      }
      return item;
    });

    //blm di implement
    Inertia.post('/bag/update-quantity', { cartItems: updatedItems });
  };

  const handleCheckout = (e) => {
    Inertia.post('/bag/store-total', {totalPrice: total});
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6">Shopping Bag</h1>
          {cartItems.map((item) => (
            <div
              key={item.cart_item_id}
              className="border-b border-gray-300 pb-6 mb-6 flex items-center justify-between"
            >
              <div className="flex items-start">
                {/* image */}
                <img
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" 
                  alt={item.product.pName}
                  className="w-24 h-24 rounded-md object-cover"
                />
                {/* item name size and price */}
                <div className="ml-4">
                  <h2 className="text-lg font-semibold">{item.product.pName}</h2>
                  <p className="text-sm text-gray-600">Size: {item.size}</p>
                  <p className="text-sm font-semibold mt-2">Rp{item.total_price.toFixed(2)}</p>
                </div>
              </div>
              {/* actions */}
              <div className="flex items-center space-x-4">
               
                <button
                  onClick={() => handleQuantityChange(item.cart_item_id, 'decrement')}
                  className="border border-gray-300 rounded-lg p-2 hover:bg-gray-200"
                >
                  -
                </button>

                
                <span className="text-lg">{item.quantity}</span>

               
                <button
                  onClick={() => handleQuantityChange(item.cart_item_id, 'increment')}
                  className="border border-gray-300 rounded-lg p-2 hover:bg-gray-200"
                >
                  +
                </button>

               
                <button className="text-red-500 hover:text-red-700">Remove</button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">Order summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>Rp{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>Rp{shipping.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-base font-semibold">
              <span>Total</span>
              <span>Rp{total.toFixed(2)}</span>
            </div>
          </div>
          
            <button 
            onClick={handleCheckout}
            className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700">
              Checkout
            </button>
       
        </div>
      </div>
    </div>
  );
}
