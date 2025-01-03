import React, { useState } from "react";
import NavbarComponent from "../component/Navbar";
import { Link, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import FooterLanding from "../component/FooterSection";
import StickyCard from "../component/StickyCard";

export default function Bag() {
    const { cart, hasItems } = usePage().props;
    const [cartItems, setCartItems] = useState(cart.cart_items || []);
    const subtotal = cartItems.reduce((sum, item) => sum + item.total_price, 0);
    const shipping = 15000;
    const total = subtotal + shipping;
    

    const handleQuantityChange = (itemId, action) => {
        const updatedItems = cartItems.map((item) => {
            if (item.cart_item_id === itemId) {
                const newQty =
                    action === "increment"
                        ? item.quantity + 1
                        : Math.max(1, item.quantity - 1);
                item.quantity = newQty;
                item.total_price = item.product.price * newQty;
            }
            return item;
        });

        //set local first then put to backend
        setCartItems(updatedItems);

        Inertia.post("/bag/update-quantity", {
            itemId,
            qty: updatedItems.find((item) => item.cart_item_id === itemId)
                .quantity,
        });
    };

    const handleDelete = (itemId) => {
      // delete in local
      const updatedItems = cartItems.filter(
          (item) => item.cart_item_id !== itemId
      );
      setCartItems(updatedItems);
  
      // delete in backend
      Inertia.delete("/bag/delete-item", { data: { itemId } })
        .then(() => {
            console.log("Item deleted successfully");
            showNotification("Product removed from cart!");
        })
        .catch((error) => {
            console.error("Error deleting item:", error);
            showNotification("Error removing product from cart.");
        });
  };

    const handleCheckout = (e) => {
        const totalPrice = subtotal + shipping;

        Inertia.post("/bag/store-total", { totalPrice });
    };

    const showNotification = (message) => {
      setNotification({ visible: true, message });
      setTimeout(() => setNotification({ visible: false, message: "" }), 3000); // Hide after 3 seconds
  };

    return (
        <div>
          {notification.visible && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
                    {notification.message}
                </div>
            )}
            <NavbarComponent />
             {/* Sticky Notification */}
             
            <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10  mt-16">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
                        <h1 className="text-2xl font-bold mb-6">
                            Shopping Bag
                        </h1>
                        {cartItems.length === 0 ? (
                            <div className="text-center text-black-600 py-10">
                                <p className="text-lg font-semibold">
                                    You don’t have any items!
                                </p>
                                <p className="text-sm">
                                    Please add new items first
                                </p>
                            </div>
                        ) : (
                            cartItems.map((item) => (
                                <div
                                    key={item.cart_item_id}
                                    className="border-b border-gray-300 pb-6 mb-6 flex items-center justify-between"
                                >
                                    <div className="flex items-start">
                                        {/* image */}
                                        {item.product.images.length > 0 ? (
                                            <img
                                                src={
                                                    item.product.images[0]
                                                        .image_url
                                                }
                                                alt={item.product.pName}
                                                className="w-24 h-24 rounded-md object-cover"
                                            />
                                        ) : (
                                            <div className="w-24 h-24 flex items-center justify-center bg-gray-200 text-gray-600">
                                                No Image
                                            </div>
                                        )}
                                        {/* item name size and price */}
                                        <div className="ml-4">
                                            <h2 className="text-lg font-semibold">
                                                {item.product.pName}
                                            </h2>
                                            <p className="text-sm text-gray-600">
                                                Size: {item.size}
                                            </p>
                                            <p className="text-sm font-semibold mt-2">
                                                Rp{item.total_price.toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                    {/* actions */}
                                    <div className="flex items-center space-x-4">
                                        <button
                                            onClick={() =>
                                                handleQuantityChange(
                                                    item.cart_item_id,
                                                    "decrement"
                                                )
                                            }
                                            className="border border-gray-300 rounded-lg p-2 hover:bg-gray-200"
                                        >
                                            -
                                        </button>

                                        <span className="text-lg">
                                            {item.quantity}
                                        </span>

                                        <button
                                            onClick={() =>
                                                handleQuantityChange(
                                                    item.cart_item_id,
                                                    "increment"
                                                )
                                            }
                                            className="border border-gray-300 rounded-lg p-2 hover:bg-gray-200"
                                        >
                                            +
                                        </button>

                                        <button
                                            className="text-red-500 hover:text-red-700"
                                            onClick={() =>
                                                handleDelete(item.cart_item_id)
                                            }
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-bold mb-4">
                            Order summary
                        </h2>
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
                            disabled={!hasItems}
                            onClick={handleCheckout}
                            className={`mt-6 w-full text-white py-3 rounded-lg font-medium ${
                                hasItems
                                    ? "bg-NusantaraGold hover:bg-NusantaraGoldDark"
                                    : "bg-gray-300 cursor-not-allowed"
                            }`}
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <FooterLanding />
            </div>
        </div>
    );
}
