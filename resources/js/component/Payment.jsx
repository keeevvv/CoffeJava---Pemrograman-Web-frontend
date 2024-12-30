const PaymentComponent = () => {
    return (
        <section className="py-16 bg-white mt-5">
            <div className="container mx-auto px-6 flex flex-wrap items-center">
                {/* Bagian Kiri: Gambar Anime */}
                <div className="w-full lg:w-1/2 p-4">
                    <img
                        src="img/maskot-payment.png"
                        alt="Anime Payment Illustration"
                        className="rounded-lg shadow-lg"
                    />
                </div>

                {/* Bagian Kanan: Informasi Metode Pembayaran */}
                <div className="w-full lg:w-1/2 p-4">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                        Metode Pembayaran Tersedia
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Kami menyediakan berbagai metode pembayaran yang dapat
                        Anda pilih sesuai kenyamanan Anda:
                    </p>

                    <ul className="space-y-4">
                        <li className="flex items-center">
                            <img
                                src="img/paypal.png"
                                alt="Kartu Kredit"
                                className="h-10 w-10 mr-4"
                            />
                            <span className="text-lg text-gray-800">
                                Paypal
                            </span>
                        </li>
                        <li className="flex items-center">
                            <img
                                src="img/ewallet.png"
                                alt="E-Wallet"
                                className="h-10 w-10 mr-4"
                            />
                            <span className="text-lg text-gray-800">
                                E-Wallet (OVO, GoPay, DANA)
                            </span>
                        </li>
                        <li className="flex items-center">
                            <img
                                src="img/bank.png"
                                alt="Transfer Bank"
                                className="h-10 w-10 mr-4"
                            />
                            <span className="text-lg text-gray-800">
                                Transfer Bank
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default PaymentComponent;
