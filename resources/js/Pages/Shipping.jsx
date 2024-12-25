import React, { useState } from "react";
import NavbarComponent from "../component/Navbar";

export default function ShippingPage(props) {
    // return (
    //     <>
    //         <h1>Tes</h1>
    //     </>
    // );
    // State untuk filter
    const [filter, setFilter] = useState("All");
    // Data dummy untuk invoice dan status barang
    const shipments = [
        {
            id: "INV-001",
            product: "Laptop ASUS ROG",
            status: "Menunggu",
            date: "2024-12-01",
        },
        {
            id: "INV-002",
            product: "Smartphone iPhone 15",
            status: "Proses",
            date: "2024-12-02",
        },
        {
            id: "INV-003",
            product: "Headphone Sony WH-1000XM4",
            status: "Diantar",
            date: "2024-12-03",
        },
        {
            id: "INV-004",
            product: "Smartwatch Garmin",
            status: "Menunggu",
            date: "2024-12-04",
        },
    ];
    // Filter berdasarkan status
    const filteredShipments =
        filter === "All"
            ? shipments
            : shipments.filter((shipment) => shipment.status === filter);
    return (
        <>
            <NavbarComponent />
            <div className="bg-gray-100 min-h-screen p-6 mt-10">
                {/* Filter Tombol */}
                <div className="mt-6 flex justify-center space-x-4">
                    <button
                        onClick={() => setFilter("All")}
                        className={`px-4 py-2 rounded-lg shadow-md ${
                            filter === "All"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                        }`}
                    >
                        Semua
                    </button>
                    <button
                        onClick={() => setFilter("Menunggu")}
                        className={`px-4 py-2 rounded-lg shadow-md ${
                            filter === "Menunggu"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                        }`}
                    >
                        Menunggu
                    </button>
                    <button
                        onClick={() => setFilter("Proses")}
                        className={`px-4 py-2 rounded-lg shadow-md ${
                            filter === "Proses"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                        }`}
                    >
                        Proses
                    </button>
                    <button
                        onClick={() => setFilter("Diantar")}
                        className={`px-4 py-2 rounded-lg shadow-md ${
                            filter === "Diantar"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                        }`}
                    >
                        Diantar
                    </button>
                </div>
                {/* Daftar Shipment */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredShipments.map((shipment) => (
                        <div
                            key={shipment.id}
                            className="bg-white rounded-lg shadow-md p-6"
                        >
                            <h2 className="text-lg font-semibold text-gray-800">
                                {shipment.product}
                            </h2>
                            <p className="text-gray-600 mt-2">
                                <span className="font-semibold">
                                    Invoice ID:
                                </span>{" "}
                                {shipment.id}
                            </p>
                            <p className="text-gray-600 mt-1">
                                <span className="font-semibold">Tanggal:</span>{" "}
                                {shipment.date}
                            </p>
                            <p
                                className={`mt-4 px-4 py-2 rounded-full text-center text-sm font-semibold ${
                                    shipment.status === "Menunggu"
                                        ? "bg-yellow-200 text-yellow-800"
                                        : shipment.status === "Proses"
                                        ? "bg-blue-200 text-blue-800"
                                        : "bg-green-200 text-green-800"
                                }`}
                            >
                                {shipment.status}
                            </p>
                        </div>
                    ))}
                </div>
                {filteredShipments.length === 0 && (
                    <div className="mt-8 text-center text-gray-500">
                        Tidak ada pengiriman dengan status <b>{filter}</b>.
                    </div>
                )}
            </div>
        </>
    );
}
