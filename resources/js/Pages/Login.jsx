import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import Logo from "../assets/images/logo.png";
import { router } from "@inertiajs/react";
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
            <div className="">
                <div className="min-h-screen bg-gray-100 lg:bg-transparent  text-gray-900 flex justify-center">
                    <div className="max-w-screen-xl m-0 sm:m-10  shadow  lg:shadow-none sm:rounded-lg flex justify-center flex-1max-w-screen-xl m-0 sm:m-10 bg-white sm:rounded-lg flex justify-center flex-1 flex-col">
                        <h1 className="title text-center font-bold text-4xl md:text-6xl">
                            {" "}
                            Sign In
                        </h1>
                        <div>
                            <img
                                src={Logo}
                                className="mx-auto mix-blend-multiply mt-20"
                            />
                        </div>
                        <form
                            action=""
                            onSubmit={handleSubmit}
                            className="mx-2"
                        >
                            <div className="mb-4 mx-10 sm:mx-20">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2 "
                                    for="username"
                                >
                                    Email
                                </label>
                                <input
                                    className="w-full px-2 py-4 rounded-lg font-medium bg-gray-100 border  border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    id="email"
                                    type="email"
                                    placeholder="emain@example.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                ></input>
                            </div>
                            <div className="mb-4 sm:mx-20 mx-10">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    for="password"
                                >
                                    Password
                                </label>
                                <input
                                    className="w-full px-2 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    id="password"
                                    type="password"
                                    placeholder="*********"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                ></input>
                                 {errorMessage && (
                                        <div className="text-red-500 text-center m-4">
                                            {errorMessage}
                                        </div>
                                    )}
                            </div>
                            <div className="mt-6 sm:mx-20 mx-10">
                                <button
                                    className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                    type="submit"
                                >
                                    <svg
                                        className="w-6 h-6 -ml-2"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    >
                                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                        <circle cx="8.5" cy="7" r="4" />
                                        <path d="M20 8v6M23 11h-6" />
                                    </svg>
                                   

                                    <span class="ml-">Sign In</span>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div class="flex-1 bg-green-100 text-center hidden lg:flex"></div>
                </div>
            </div>
        </div>
    );
}
