import React from "react";
import { Search } from "lucide-react";
import Image from "next/image";

export default function Hero() {
    return (
        <main className="hero w-full py-24 flex flex-col items-center text-center">

            {/* <div className="absolute inset-0 -z-10">
                <Image
                    src="/assets/images/homeCover.svg"
                    alt="Influencer collaboration"
                    fill
                    className="object-cover object-center opacity-80"
                />

                <div className="absolute inset-0 bg-transparent backdrop-blur-[2px]" />
            </div> */}


            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                Connect. Collaborate. <span className="text-indigo-600">Grow.</span>
            </h1>

            <p className="text-lg md:text-xl text-white mt-4 max-w-2xl">
                The all-in-one platform where brands and creators build meaningful partnerships.
            </p>

            <div className="mt-8 w-full max-w-xl flex items-center shadow-lg 
                      rounded-xl overflow-hidden px-4 py-3 gap-3 border border-gray-200 bg-white">

                <Search className="text-gray-500" size={22} />

                <input
                    type="text"
                    placeholder="Search by influencer, category or tag"
                    className="w-full outline-none text-gray-700 placeholder:text-gray-400"
                />
            </div>

            <div className="mt-10 flex gap-4 flex-wrap">
                <button className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium 
                           hover:bg-indigo-700 transition shadow-md">
                    Hire an Influencer
                </button>

                <button className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium 
                           hover:bg-indigo-700 transition shadow-md">
                    Become an Influencer
                </button>
            </div>

        </main>
    );
}
