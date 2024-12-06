import React, { useState, useEffect } from "react";

export function TabsComponent() {
    const tab1 =
        "Kaguya was a very cold and rational individual, but she slowly changed after joining the student council. During her earlier days in council, she considered Miyuki Shirogane as one she would be fine to be in a relationship with if, and only if, he confesses first, thus she constantly plays mind games in trying to get him to confess. Later in the series, her actions imply that she is starting to accept her feelings of liking Miyuki, but won't openly admit it.";
    const tab2 =
        "A member of Shinomiya Zaibatsu and the daughter of the Shinomiya group. She was born to a night worker, which created reputation and succession complexities within the zaibatsu, but her father insisted on keeping her within the family though he was largely absent from her childhood following her mother's death. A multi-talented genius who can do anything if she sets her mind to it (except, beating Shirogane in exams).[6] Because she has had the rules and expectations of the Shinomiya family drilled into her from a young age,  her logical side always looks for ways she can use people for her and the Shinomiya family's benefit. This causes her to be wary of all potential friends, putting them through trust challenges to determine whether she should befriend them. She has had a very protected childhood, where she has been kept from learning things that are deemed inappropriate. Kaguya's mother had hereditary heart problems leading to her untimely demise, but her own heart is beautiful and healthy. Regardless, she appears to have a weak constitution as her physical state is easily affected by her mental turmoil.";
    const [curenTab, setCurentTab] = useState(tab1);

    

    return (
        <div id="tabbar" className="w-full bg-emerald-400  rounded-md mt-4 ">
            <div className="bg-emerald-500 flex justify-between px-8 text-2xl lg:text-base xl:text-xl rounded-md p-2">
                <h1
                    className={` cursor-pointer ${
                        curenTab === tab1 ? "underline" : ""
                    }`}
                    onClick={() => {
                        setCurentTab(tab1);
                    }}
                >
                    Informasi
                </h1>
                <h1
                    className={`cursor-pointer ${
                        curenTab === tab2 ? "underline" : ""
                    }`}
                    onClick={() => {
                        setCurentTab(tab2);
                    }}
                >
                    Tentang
                </h1>
            </div>
            <div className="mt-4 ">
                <p className="text-justify lg:text-base xl:text-lg text-gray-700 mx-4">
                    {curenTab}
                </p>
            </div>
        </div>
    );
}
