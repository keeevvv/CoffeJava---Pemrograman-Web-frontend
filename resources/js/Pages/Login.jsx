import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import Logo from "../assets/images/logo.png";
import { router } from '@inertiajs/react'
export default function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState(props.errors || {}); // Mengambil errors dari props jika ada

    // Menangkap error dari props, jika ada
    const errorMessage = errors?.login;

    const handleSubmit = async (event) => {
        event.preventDefault();

        router.visit("/login", {
            method: "post",
            data: {
                email,
                password,
            },
        });
    };

    return (
        <div>
            <div className="min-h-screen bg-gray-100 lg:bg-transparent text-gray-900 flex justify-center">
                <div className="max-w-screen-xl m-0 sm:m-10 shadow lg:shadow-none sm:rounded-lg flex justify-center flex-1 bg-white sm:rounded-lg flex justify-center flex-1 flex-col">
                    <h1 className="title text-center font-bold text-4xl md:text-6xl">
                        Sign In
                    </h1>
                    <div>
                        <img
                            src={Logo}
                            className="mx-auto mix-blend-multiply mt-20"
                            alt="Logo"
                        />
                    </div>

                    {/* Menampilkan error umum jika ada */}
                    {errorMessage && (
                        <div className="text-red-500 text-center mb-4">
                            {errorMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="mx-2">
                        <div className="mb-4 mx-10 sm:mx-20">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                className="w-full px-2 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                id="email"
                                type="email"
                                placeholder="email@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && (
                                <span className="text-red-500 text-sm">
                                    {errors.email}
                                </span>
                            )}
                        </div>
                        <div className="mb-4 sm:mx-20 mx-10">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                className="w-full px-2 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                id="password"
                                type="password"
                                placeholder="*********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors.password && (
                                <span className="text-red-500 text-sm">
                                    {errors.password}
                                </span>
                            )}
                        </div>
                        <div className="mt-6 sm:mx-20 mx-10">
                            <button
                                className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                type="submit"
                            >
                                <span className="ml-2">Sign In</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
