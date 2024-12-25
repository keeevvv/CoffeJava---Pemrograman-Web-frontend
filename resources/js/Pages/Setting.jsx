import NavbarComponent from "../component/Navbar";
import { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";

export default function SettingPage({ user }) {
    const [activeTab, setActiveTab] = useState("profile");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const { flash } = usePage().props;

    const [profileImage, setProfileImage] = useState(user.profileImage);
    const [selectedImage, setSelectedImage] = useState(null);


    const [nameField, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
        setProfileImage(e.target.files[0]);
    };



    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onload = (e) => {
    //             setSelectedImage(e.target.result);
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };

    const handleProfileUpdate = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("nama", nameField);
        formData.append("email", email);
        if (profileImage instanceof File) {
            formData.append("profileImage", profileImage);
        }

        router.post("/profile/setting/edit", formData, {
            forceFormData: true,
            onSuccess: () => {
                alert("Profile updated successfully!");
            },
            onError: (errors) => {
                alert("Failed to update profile. Please try again.");
            },
        });
    };

    const handleChangePassword = (event) => {
        event.preventDefault();

        router.post("/profile/setting/password", {
            id: user.id,
            currentPassword,
            newPassword,
            confirmNewPassword,
        }, {
            onSuccess: () => {
                alert("Password berhasil diperbarui!");
            },
            onError: (errors) => {
                if (errors.currentPassword) {
                    alert("Password lama salah.");
                } else if (errors.newPassword) {
                    alert("Password baru tidak valid.");
                } else {
                    alert("Terjadi kesalahan. Silakan coba lagi.");
                }
            },
        });
    };

    return (
        <div>
            <NavbarComponent />
            <div className="bg-gray-100 min-h-screen flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500">
                            <label htmlFor="profileImageInput" className="cursor-pointer">
                            <img
                                src={selectedImage || profileImage || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"}
                                alt="Foto Profil"
                                className="w-full h-full object-cover"
                            />
                            </label>
                            <input
                                id="profileImageInput"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </div>
                        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
                            {user.name || "Nama Pengguna"}
                        </h2>
                    </div>

                    <div className="mt-6">
                        <div className="flex justify-center space-x-4 mb-6">
                            <button
                                onClick={() => setActiveTab("profile")}
                                className={`px-4 py-2 rounded-lg shadow-md ${
                                    activeTab === "profile"
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                            >
                                Change Profile
                            </button>
                            <button
                                onClick={() => setActiveTab("password")}
                                className={`px-4 py-2 rounded-lg shadow-md ${
                                    activeTab === "password"
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                            >
                                Change Password
                            </button>
                        </div>

                        {activeTab === "profile" && (
                            <form className="space-y-4"  onSubmit={handleProfileUpdate}>
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={user.name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        defaultValue={user.email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>
                                <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
                                    Save Changes
                                </button>
                            </form>
                        )}

                        {activeTab === "password" && (
                            <form className="space-y-4" onSubmit={handleChangePassword}>
                                {flash.success && (
                                    <div className="mb-4 text-green-600 text-center">
                                        {flash.success}
                                    </div>
                                )}
                                {flash.error && (
                                    <div className="mb-4 text-red-600 text-center">
                                        {flash.error}
                                    </div>
                                )}
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">
                                        Current Password
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="Enter current password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="Enter new password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">
                                        Confirm New Password
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="Confirm new password"
                                        value={confirmNewPassword}
                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
                                >
                                    Update Password
                                </button>
                            </form>
                        )}

                        <div className="mt-8 flex justify-center">
                            <Link href="/profile">
                                <button className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600">
                                    Back to Profile
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
