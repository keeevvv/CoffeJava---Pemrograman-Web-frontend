import NavbarComponent from "../component/Navbar";
import { Link } from "@inertiajs/react";

export default function ProfilePage() {
    return (
        <div>
            <NavbarComponent />
            <div className="bg-gray-100 min-h-screen flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                    {/* Foto Profil */}
                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500">
                            <img
                                src="https://via.placeholder.com/150"
                                alt="Foto Profil"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
                            Nama Pengguna
                        </h2>
                        <p className="text-gray-600">Software Engineer</p>
                    </div>

                    {/* Informasi Pengguna */}
                    <div className="mt-6">
                        <ul className="space-y-4 text-gray-700">
                            <li>
                                <span className="font-semibold">Email:</span>{" "}
                                <a
                                    href="mailto:pengguna@example.com"
                                    className="text-blue-500 hover:underline"
                                >
                                    pengguna@example.com
                                </a>
                            </li>
                            <li>
                                <span className="font-semibold">Telepon:</span>{" "}
                                <a
                                    href="tel:+628123456789"
                                    className="text-blue-500 hover:underline"
                                >
                                    +62 812 3456 789
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Tombol Shipping & Setting */}
                    <div className="mt-8 flex justify-between">
                        <Link href="/profile/shipping">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
                                Shipping
                            </button>
                        </Link>
                        <button className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600">
                            Settings
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
