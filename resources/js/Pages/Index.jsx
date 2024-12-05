import FooterLanding from "../component/FooterSection";
import NavbarComponent from "../component/Navbar";
import Jumbotron from "../component/Jumbotron";
import { Link } from "@inertiajs/react";
import PopularProduct from "../component/Popular";
import ReviewComponent from "../component/Review";
import PaymentComponent from "../component/Payment";

const LandingPage = () => {
    return (
        <div>
            <NavbarComponent />

            <Jumbotron />

            <PopularProduct />

            {/* <section class="py-16 bg-gray-100 mt-5">
                <div class="container mx-auto px-6">
                        <div class="flex flex-wrap justify-center items-center">

                        <div class="w-full lg:w-1/2 p-4">
                            <img
                            src="img/maskot.png"
                            alt="Anime Character"
                            class="w-85 h-auto rounded-lg"
                            />
                        </div>


                        <div class="w-full lg:w-1/2 p-4">
                            <h2 class="text-3xl font-semibold text-gray-800 mb-4">What Our Clients Say</h2>

                            <div class="mb-6 p-6 bg-white rounded-lg shadow-md">
                            <p class="text-lg text-gray-700 mb-4">
                                "This product has truly changed my life. I can't imagine going back to how things were before. The quality and support are amazing!"
                            </p>
                            <div class="flex items-center">
                                <img
                                src="https://www.placecage.com/50/50"
                                alt="Customer Image"
                                class="w-12 h-12 rounded-full mr-4"
                                />
                                <div>
                                <p class="font-semibold text-gray-800">John Doe</p>
                                <p class="text-sm text-gray-500">Satisfied Customer</p>
                                </div>
                            </div>
                            </div>

                            <div class="mb-6 p-6 bg-white rounded-lg shadow-md">
                            <p class="text-lg text-gray-700 mb-4">
                                "I love how easy it is to use and the results are incredible! Highly recommend this to anyone looking for a top-notch solution."
                            </p>
                            <div class="flex items-center">
                                <img
                                src="https://www.placecage.com/50/50"
                                alt="Customer Image"
                                class="w-12 h-12 rounded-full mr-4"
                                />
                                <div>
                                <p class="font-semibold text-gray-800">Jane Smith</p>
                                <p class="text-sm text-gray-500">Happy User</p>
                                </div>
                            </div>
                            </div>

                            <div class="mb-6 p-6 bg-white rounded-lg shadow-md">
                            <p class="text-lg text-gray-700 mb-4">
                                "Amazing experience from start to finish. The customer service is outstanding, and the product is second to none!"
                            </p>
                            <div class="flex items-center">
                                <img
                                src="https://www.placecage.com/50/50"
                                alt="Customer Image"
                                class="w-12 h-12 rounded-full mr-4"
                                />
                                <div>
                                <p class="font-semibold text-gray-800">Alice Johnson</p>
                                <p class="text-sm text-gray-500">Loyal Client</p>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}


            <ReviewComponent />

            <PaymentComponent />

            {/* <footer class="bg-gray-800 text-white py-10">
                <div class="container mx-auto px-6">
                    <div class="flex flex-wrap justify-between items-center">
                        <div class="w-full lg:w-1/3 p-4">
                            <img
                                src="img/logo-footer.png"
                                alt="Logo"
                                class="w-40 h-auto mx-auto lg:mx-0"
                            />
                            <p class="text-center lg:text-left mt-4 text-sm">
                                Pesona Indonesia - Meningkatkan produk lokal
                                untuk dunia
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
                                    <Link
                                        href="/product"
                                        class="hover:underline"
                                    >
                                        Produk
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/contact"
                                        class="hover:underline"
                                    >
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
                                Nusantara No. 123, Jakarta, Indonesia
                            </p>
                            <p class="text-sm">
                                <span class="font-bold">Email:</span>
                                <a
                                    href="mailto:info@pesonaindonesia.com"
                                    class="hover:underline"
                                >
                                    info@pesonaindonesia.com
                                </a>
                            </p>
                            <p class="text-sm">
                                <span class="font-bold">Telepon:</span>
                                <a
                                    href="tel:+62212345678"
                                    class="hover:underline"
                                >
                                    +62 21 2345678
                                </a>
                            </p>
                            <div class="mt-4 flex space-x-4">
                                <a href="#" class="hover:text-blue-400">
                                    <img
                                        src="img/facebook.png"
                                        alt="Facebook"
                                        class="w-6 h-6"
                                    />
                                </a>
                                <a href="#" class="hover:text-blue-400">
                                    <img
                                        src="img/twitter.png"
                                        alt="Twitter"
                                        class="w-6 h-6"
                                    />
                                </a>
                                <a href="#" class="hover:text-blue-400">
                                    <img
                                        src="img/instagram.png"
                                        alt="Instagram"
                                        class="w-6 h-6"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="text-center mt-10 text-sm border-t border-gray-700 pt-4">
                        © 2024 Pesona Indonesia. All rights reserved.
                    </div>
                </div>
            </footer> */}

            <FooterLanding />
        </div>
    );
};

export default LandingPage;
