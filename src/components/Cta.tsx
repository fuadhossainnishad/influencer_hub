import React from "react";
import Link from "next/link";

export default function Cta() {
    return (
        <section className="w-full py-20 px-5 md:px-20 bg-indigo-50 flex flex-col items-center text-center gap-8 rounded-3xl">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
                Start Your Collaboration Journey
            </h2>

            <p className="text-lg md:text-xl text-gray-700 max-w-2xl">
                Join with us and discover meaningful partnerships that help your business or creativity grow.
            </p>

            <div className="flex flex-wrap gap-4 mt-6 justify-center">
                <Link
                    href="/hire"
                    className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium 
                     hover:bg-indigo-700 transition shadow-md"
                >
                    Hire an Influencer
                </Link>

                <Link
                    href="/become"
                    className="px-6 py-3 rounded-lg bg-white border border-gray-300 
                     text-gray-800 font-medium hover:bg-gray-50 transition shadow-md"
                >
                    Become an Influencer
                </Link>
            </div>
        </section>
    );
}
