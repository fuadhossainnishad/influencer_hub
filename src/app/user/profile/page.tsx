import React from "react";
import Image from "next/image";
import { Edit } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
    return (
        <main className="max-w-5xl mx-auto p-6 md:p-12 flex flex-col gap-10">

            <section className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12">
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg">
                    <Image
                        src="/assets/images/profile.png"
                        alt="Imran Mahmud Siddiq"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="flex-1 flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                        <h1 className="text-3xl font-bold text-gray-900">Imran Mahmud Siddiq</h1>
                        <span className="text-green-500 font-medium text-sm">Online</span>
                        <button className="ml-auto flex items-center gap-1 px-4 py-2 rounded-lg border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition">
                            <Edit size={16} /> Update Account Info
                        </button>
                    </div>

                    <p className="text-gray-600 text-lg">@imran_siddiq3403</p>
                    <p className="text-gray-500 text-sm">Dhaka, Bangladesh</p>
                </div>
            </section>

            <section className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-6">
                <h2 className="text-2xl font-semibold text-gray-900">Business Category</h2>
                <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm">Fashion & Model</span>
                    <span className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm">Makeup</span>
                    <span className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm">Art</span>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">About Business</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Passionate about skincare and clean beauty. Sharing real product experiences and everyday glow moments. Partnered with 20+ local and international beauty brands.
                    </p>
                </div>
            </section>

            <section className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4">
                <h2 className="text-2xl font-semibold text-gray-900">Contact Person</h2>
                <p className="text-gray-700"><span className="font-medium">Name:</span> Ali Mohammad</p>
                <p className="text-gray-700"><span className="font-medium">Phone:</span> 03764 4756 3864</p>
                <p className="text-gray-700"><span className="font-medium">Email:</span> alimohammad45@gmail.com</p>
            </section>
            <Link
                href="/login"
                className="mt-6 inline-block w-full text-center bg-red-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-red-700 transition"
            >
                Logout
            </Link>
        </main>
    );
}
