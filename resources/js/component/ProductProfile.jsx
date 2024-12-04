import React from "react";

const ProductProfile = () => {
    const Logo =
        "https://png.pngtree.com/png-clipart/20190611/original/pngtree-wolf-logo-png-image_2306634.jpg";
    return (
        <div className="text-white">
            <div className="w-full bg-emerald-400 h-full rounded-md mt-4">
                <div className="flex justify-between mx-3 ">
                    <div className="flex ">
                        <img
                            src={Logo}
                            alt=""
                            className="w-16 mix-blend-multiply"
                        />
                        <h1 className="my-auto">brand</h1>
                    </div>

                    <p className="my-auto">5.0(16k)</p>
                </div>
            </div>
        </div>
    );
};

export default ProductProfile;
