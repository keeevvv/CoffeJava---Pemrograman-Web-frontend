import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import Logo from "../assets/images/logo1.png";
import { router } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
export default function Register(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [gender, setGender] = useState("");
    const [selectedDate, setSelectedDate] = useState("");

    const [paswwordErrors, setPasswordError] = useState([]);
    const [confirmError, setConfirmError] = useState("");
    const [canSubmit, setCanSubmit] = useState(false);

    const [errors, setErrors] = useState(props.errors || {}); // Mengambil errors dari props jika ada

    // Menangkap error dari props, jika ada
    const errorMessage = errors?.register;

    useEffect(() => {
        if (password === "") {
            setPasswordError([]);
            setConfirmError("");
            setCanSubmit(false);
            return;
        }
        const newErrors = [];

        // Rule 1: at least 6 chars
        if (password.length < 6)
            newErrors.push("Password must be at least 6 characters long");
        // Rule 2: at least one uppercase letter
        if (!/[A-Z]/.test(password))
            newErrors.push("Password must have at least one uppercase letter");
        // Rule 3: no spaces
        if (/\s/.test(password))
            newErrors.push("Password must not have spaces");
        // Rule 4: at least two digits
        if ((password.match(/\d/g) || []).length < 2)
            newErrors.push("Password must have at least two digits");
        // Rule 5: at least one special character
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
            newErrors.push("Password must have at least one special character");

        setPasswordError(newErrors);

        // Confirm password check
        if (confirmPassword && password !== confirmPassword) {
            setConfirmError("Password and confirmation do not match");
        } else {
            setConfirmError("");
        }

        // Enable submit if no errors and passwords match
        setCanSubmit(
            newErrors.length === 0 &&
                confirmPassword &&
                password === confirmPassword
        );
    }, [password, confirmPassword]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(email);
        console.log(password);
        console.log(confirmPassword);
        console.log(fullName);
        console.log(gender);
        console.log(selectedDate);

        router.visit("/register", {
            method: "post",
            data: {
                nama: fullName,
                email,
                password,
                confirmPassword,
                gender,
                tanggalLahir: selectedDate,
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
                            Sign Up
                        </h1>
                        <div>
                            <img src={Logo} className="mx-auto  " />
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
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                ></input>
                            </div>
                            <div className="mb-4 mx-10 sm:mx-20">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2 "
                                    for="fullname"
                                >
                                    Full Name
                                </label>
                                <input
                                    className="w-full px-2 py-4 rounded-lg font-medium bg-gray-100 border  border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    id="name"
                                    type="text"
                                    placeholder="rrq fahri"
                                    required
                                    onChange={(e) =>
                                        setFullName(e.target.value)
                                    }
                                ></input>
                            </div>

                            <div className="mb-4 mx-10 sm:mx-20">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2 "
                                    for="gender"
                                >
                                    Gender
                                </label>
                                <select
                                    className="w-full px-2 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    id="gender"
                                    required
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <option value="" disabled selected>
                                        Select Gender
                                    </option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <div className="mb-4 mx-10 sm:mx-20">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2 "
                                    for="birtDate"
                                >
                                    Birt Date
                                </label>
                                <input
                                    className="w-full px-2 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    id="date"
                                    type="date"
                                    required
                                    onChange={(e) => {
                                        setSelectedDate(e.target.value);
                                    }}
                                />
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
                                    required
                                    placeholder="*********"
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                ></input>
                                {paswwordErrors.length > 0 && (
                                    <div className="text-red-500">
                                        {paswwordErrors[0]}
                                    </div>
                                )}
                            </div>
                            <div className="mb-4 sm:mx-20 mx-10">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    for="confirmPassword"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    className="w-full px-2 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    id="confirmPassword"
                                    type="password"
                                    required
                                    placeholder="*********"
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                ></input>
                                {confirmError && (
                                    <div className="text-red-500">
                                        {confirmError}
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 sm:mx-20 mx-10">
                                {errorMessage && (
                                    <div className="text-red-500 text-center m-4">
                                        {errorMessage}
                                    </div>
                                )}
                                <p>
                                    already have an account?{" "}
                                    <Link
                                        href="/login"
                                        className="inline-flex items-center   text-sm font-medium text-center text-blue-500 hover:underline "
                                    >
                                        Login here
                                    </Link>
                                </p>
                                <button
                                    className={`
    tracking-wide font-semibold w-full py-4 rounded-lg flex items-center justify-center
    transition-all duration-300 ease-in-out focus:shadow-outline focus:outline-none
    ${
        canSubmit
            ? "bg-NusantaraGoldLight text-white-500 hover:bg-NusantaraGoldDark cursor-pointer"
            : "bg-gray-400 text-gray-200 cursor-not-allowed"
    }
  `}
                                    type="submit"
                                    disabled={!canSubmit}
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

                                    <span class="ml-">Sign Up</span>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div class="flex-1 bg-NusantaraGoldLight text-center hidden lg:flex"></div>
                </div>
            </div>
        </div>
    );
}
