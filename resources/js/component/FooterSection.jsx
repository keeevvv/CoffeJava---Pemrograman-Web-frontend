import { Link } from "@inertiajs/react";
import Logo from "../assets/images/logo.png";

export default function FooterLanding() {
    return (
        <footer className="bg-gray-800 text-white py-10">
            <div className="container mx-auto px-6">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="w-full lg:w-1/3 p-4">
                        <img
                            src={Logo}
                            alt="Logo"
                            className="w-40 h-auto mx-auto lg:mx-0"
                        />
                        <p className="text-center lg:text-left mt-4 text-sm">
                            CoffeJava - Java in Your Cup, Code in Your Mind.
                        </p>
                    </div>

                    <div className="w-full lg:w-1/3 p-4">
                        <h3 className="text-lg font-semibold mb-4 text-center lg:text-left">
                            Navigasi
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/" className="hover:underline">
                                    Beranda
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:underline">
                                    Tentang Kami
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/product"
                                    className="hover:underline"
                                >
                                    Produk
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="hover:underline"
                                >
                                    Hubungi Kami
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="w-full lg:w-1/3 p-4">
                        <h3 className="text-lg font-semibold mb-4 text-center lg:text-left">
                            Kontak Kami
                        </h3>
                        <p className="text-sm">
                            <span className="font-bold">Alamat:</span> Jl.
                            Bojongsoang, Bandung, Indonesia
                        </p>
                        <p className="text-sm">
                            <span className="font-bold">Email:</span>
                            <a
                                href="mailto:info@pesonaindonesia.com"
                                className="hover:underline"
                            >
                                info@enusantara.com
                            </a>
                        </p>
                        <p className="text-sm">
                            <span className="font-bold">Telepon:</span>
                            <a
                                href="tel:+62212345678"
                                className="hover:underline"
                            >
                                +62 897-8361-771
                            </a>
                        </p>
                    </div>
                </div>
                <div className="text-center mt-10 text-sm border-t border-gray-700 pt-4">
                    © 2024 CoffeJava. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
