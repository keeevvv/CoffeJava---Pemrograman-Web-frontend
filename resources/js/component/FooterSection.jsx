import { Link } from "@inertiajs/react";
import Logo from "../assets/images/logo.png";

export default function FooterLanding() {
    return (
        <footer class="bg-gray-800 text-white py-10">
            <div class="container mx-auto px-6">
                <div class="flex flex-wrap justify-between items-center">
                    <div class="w-full lg:w-1/3 p-4">
                        <img
                            src={Logo}
                            alt="Logo"
                            class="w-40 h-auto mx-auto lg:mx-0"
                        />
                        <p class="text-center lg:text-left mt-4 text-sm">
                            CoffeJava - Java in Your Cup, Code in Your Mind.
                        </p>
                    </div>

                    <div class="w-full lg:w-1/3 p-4">
                        <h3 class="text-lg font-semibold mb-4 text-center lg:text-left">
                            Navigasi
                        </h3>
                        <ul class="space-y-2 text-sm">
                            <li>
                                <Link href="/" class="hover:underline">
                                    Beranda
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" class="hover:underline">
                                    Tentang Kami
                                </Link>
                            </li>
                            <li>
                                <Link href="/product" class="hover:underline">
                                    Produk
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" class="hover:underline">
                                    Hubungi Kami
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div class="w-full lg:w-1/3 p-4">
                        <h3 class="text-lg font-semibold mb-4 text-center lg:text-left">
                            Kontak Kami
                        </h3>
                        <p class="text-sm">
                            <span class="font-bold">Alamat:</span> Jl.
                            Bojongsoang, Bandung, Indonesia
                        </p>
                        <p class="text-sm">
                            <span class="font-bold">Email:</span>
                            <a
                                href="mailto:info@pesonaindonesia.com"
                                class="hover:underline"
                            >
                                info@enusantara.com
                            </a>
                        </p>
                        <p class="text-sm">
                            <span class="font-bold">Telepon:</span>
                            <a href="tel:+62212345678" class="hover:underline">
                                +62 897-8361-771
                            </a>
                        </p>
                    </div>
                </div>
                <div class="text-center mt-10 text-sm border-t border-gray-700 pt-4">
                    © 2024 CoffeJava. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
