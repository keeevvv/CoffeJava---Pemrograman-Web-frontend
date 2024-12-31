const ReviewComponent = () => {
    return (
        <section className="py-16 bg-gray-100 mt-5">
            <div className="container mx-auto px-6">
                <div className="flex flex-wrap justify-center items-center">
                    <div className="w-full lg:w-1/2 p-4 animate-fade-in-left">
                        <img
                            src="img/maskot.png"
                            alt="Anime Character"
                            className="w-85 h-auto rounded-lg"
                        />
                    </div>
                    <div className="w-full lg:w-1/2 p-4">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-4 animate-fade-in-up">
                            What Our Clients Say
                        </h2>

                        <div className="mb-6 p-6 bg-white rounded-lg shadow-md animate-fade-in-up">
                            <p className="text-lg text-gray-700 mb-4">
                                "This product has truly changed my life. I can't
                                imagine going back to how things were before.
                                The quality and support are amazing!"
                            </p>
                            <div className="flex items-center">
                                <img
                                    src="img/person.png"
                                    alt="Customer Image"
                                    className="w-12 h-12 rounded-full mr-4"
                                />
                                <div>
                                    <p className="font-semibold text-gray-800">
                                        Kevin kebab
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Suami Kaguya
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-6 p-6 bg-white rounded-lg shadow-md animate-fade-in-up">
                            <p className="text-lg text-gray-700 mb-4">
                                "I love how easy it is to use and the results
                                are incredible! Highly recommend this to anyone
                                looking for a top-notch solution."
                            </p>
                            <div className="flex items-center">
                                <img
                                    src="img/person.png"
                                    alt="Customer Image"
                                    className="w-12 h-12 rounded-full mr-4"
                                />
                                <div>
                                    <p className="font-semibold text-gray-800">
                                        Rindang Sang Intel
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Intel Telkom
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-6 p-6 bg-white rounded-lg shadow-md animate-fade-in-up">
                            <p className="text-lg text-gray-700 mb-4">
                                "Amazing experience from start to finish. The
                                customer service is outstanding, and the product
                                is second to none!"
                            </p>
                            <div className="flex items-center">
                                <img
                                    src="img/person.png"
                                    alt="Customer Image"
                                    className="w-12 h-12 rounded-full mr-4"
                                />
                                <div>
                                    <p className="font-semibold text-gray-800">
                                        Farhan Burger
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Tentara penjaga market day
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReviewComponent;
