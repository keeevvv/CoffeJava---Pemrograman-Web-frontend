import FooterLanding from "../component/FooterSection";
import NavbarComponent from "../component/Navbar";
import { Link } from "@inertiajs/react";

const LandingPage = () => {
    return (
        <div>
            <NavbarComponent />

            <section class="bg-cover bg-no-repeat bg-[url('img/background.jpg')] bg-gray-500 bg-blend-multiply">
                <div class="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
                    <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                        Pesona Indonesia
                    </h1>
                    <p class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
                        Focus market product Nusantara
                    </p>
                    <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                        <a
                            href="#"
                            class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                        >
                            Get started
                            <svg
                                class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 10"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M1 5h12m0 0L9 1m4 4L9 9"
                                />
                            </svg>
                        </a>
                        <a
                            href="#"
                            class="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
                        >
                            Learn more
                        </a>
                    </div>
                </div>
            </section>

            <section>
                <h1 class="flex items-center text-5xl font-extrabold dark:text-white justify-center mt-5">
                    Product Popular
                </h1>
                <div class="flex flex-row justify-center mt-10 gap-5">
                    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <img class="rounded-t-lg" src="img/8.png" alt="" />
                        </a>
                        <div class="p-5">
                            <a href="#">
                                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    Batik Jawa
                                </h5>
                            </a>
                            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                Here are the biggest enterprise technology
                                acquisitions of 2021 so far, in reverse
                                chronological order.
                            </p>
                            <Link
                                href="/product/1"
                                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Read more
                                <svg
                                    class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M1 5h12m0 0L9 1m4 4L9 9"
                                    />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <img class="rounded-t-lg" src="img/8.png" alt="" />
                        </a>
                        <div class="p-5">
                            <a href="#">
                                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    Batik Jawa
                                </h5>
                            </a>
                            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                Here are the biggest enterprise technology
                                acquisitions of 2021 so far, in reverse
                                chronological order.
                            </p>
                            <Link
                                href="/product/1"
                                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Read more
                                <svg
                                    class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M1 5h12m0 0L9 1m4 4L9 9"
                                    />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

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

            <section class="py-16 bg-gray-100 mt-5">
                <div class="container mx-auto px-6">
                    <div class="flex flex-wrap justify-center items-center">
                        <div class="w-full lg:w-1/2 p-4 animate-fade-in-left">
                            <img
                                src="img/maskot.png"
                                alt="Anime Character"
                                class="w-85 h-auto rounded-lg"
                            />
                        </div>
                        <div class="w-full lg:w-1/2 p-4">
                            <h2 class="text-3xl font-semibold text-gray-800 mb-4 animate-fade-in-up">
                                What Our Clients Say
                            </h2>

                            <div class="mb-6 p-6 bg-white rounded-lg shadow-md animate-fade-in-up">
                                <p class="text-lg text-gray-700 mb-4">
                                    "This product has truly changed my life. I
                                    can't imagine going back to how things were
                                    before. The quality and support are
                                    amazing!"
                                </p>
                                <div class="flex items-center">
                                    <img
                                        src="img/person.png"
                                        alt="Customer Image"
                                        class="w-12 h-12 rounded-full mr-4"
                                    />
                                    <div>
                                        <p class="font-semibold text-gray-800">
                                            Kevin kebab
                                        </p>
                                        <p class="text-sm text-gray-500">
                                            Suami Kaguya
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="mb-6 p-6 bg-white rounded-lg shadow-md animate-fade-in-up">
                                <p class="text-lg text-gray-700 mb-4">
                                    "I love how easy it is to use and the
                                    results are incredible! Highly recommend
                                    this to anyone looking for a top-notch
                                    solution."
                                </p>
                                <div class="flex items-center">
                                    <img
                                        src="img/person.png"
                                        alt="Customer Image"
                                        class="w-12 h-12 rounded-full mr-4"
                                    />
                                    <div>
                                        <p class="font-semibold text-gray-800">
                                            Rindang Sang Intel
                                        </p>
                                        <p class="text-sm text-gray-500">
                                            Intel Telkom
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="mb-6 p-6 bg-white rounded-lg shadow-md animate-fade-in-up">
                                <p class="text-lg text-gray-700 mb-4">
                                    "Amazing experience from start to finish.
                                    The customer service is outstanding, and the
                                    product is second to none!"
                                </p>
                                <div class="flex items-center">
                                    <img
                                        src="img/person.png"
                                        alt="Customer Image"
                                        class="w-12 h-12 rounded-full mr-4"
                                    />
                                    <div>
                                        <p class="font-semibold text-gray-800">
                                            Farhan Burger
                                        </p>
                                        <p class="text-sm text-gray-500">
                                            Tentara penjaga market day
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="py-16 bg-white mt-5">
                <div class="container mx-auto px-6 flex flex-wrap items-center">
                    {/* Bagian Kiri: Gambar Anime */}
                    <div class="w-full lg:w-1/2 p-4">
                        <img
                            src="img/maskot-payment.png"
                            alt="Anime Payment Illustration"
                            class="rounded-lg shadow-lg"
                        />
                    </div>

                    {/* Bagian Kanan: Informasi Metode Pembayaran */}
                    <div class="w-full lg:w-1/2 p-4">
                        <h2 class="text-3xl font-semibold text-gray-800 mb-4">
                            Metode Pembayaran Tersedia
                        </h2>
                        <p class="text-gray-600 mb-6">
                            Kami menyediakan berbagai metode pembayaran yang
                            dapat Anda pilih sesuai kenyamanan Anda:
                        </p>

                        <ul class="space-y-4">
                            <li class="flex items-center">
                                <img
                                    src="img/paypal.png"
                                    alt="Kartu Kredit"
                                    class="h-10 w-10 mr-4"
                                />
                                <span class="text-lg text-gray-800">
                                    Paypal
                                </span>
                            </li>
                            <li class="flex items-center">
                                <img
                                    src="img/ewallet.png"
                                    alt="E-Wallet"
                                    class="h-10 w-10 mr-4"
                                />
                                <span class="text-lg text-gray-800">
                                    E-Wallet (OVO, GoPay, DANA)
                                </span>
                            </li>
                            <li class="flex items-center">
                                <img
                                    src="img/bank.png"
                                    alt="Transfer Bank"
                                    class="h-10 w-10 mr-4"
                                />
                                <span class="text-lg text-gray-800">
                                    Transfer Bank
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

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
