import NavbarComponent from "../component/Navbar";
import { Link } from "@inertiajs/react";

export default function ProfilePage({ user }) {
    return (
        <div>
            <NavbarComponent />
            <div className="bg-gray-100 min-h-screen flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-NusantaraGoldLight">
                            <img
                                src={
                                    user.profileImage == null
                                        ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                                        : user.profileImage
                                }
                                alt="Foto Profil"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
                            {user.name || "Nama Pengguna"}
                        </h2>
                    </div>

                    <div className="mt-6">
                        <ul className="space-y-4 text-gray-700">
                            <li>
                                <span className="font-semibold">Nama:</span>{" "}
                                <a
                                    href={user.name}
                                    className="text-NusantaraGold hover:underline"
                                >
                                    {user.name || "pengguna@example.com"}
                                </a>
                            </li>
                            <li>
                                <span className="font-semibold">Email:</span>{" "}
                                <a
                                    href={user.email || "#"}
                                    className="text-NusantaraGold hover:underline"
                                >
                                    {user.email || "Tidak tersedia"}
                                </a>
                            </li>
                        </ul>

                        <div className="mt-8 flex justify-between">
                            <Link href="/profile/orders">
                                <button className="bg-NusantaraGold text-white px-4 py-2 rounded-lg shadow-md hover:bg-NusantaraGoldDark">
                                    Order
                                </button>
                            </Link>
                            <Link href="/profile/setting">
                                <button className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600">
                                    Settings
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
