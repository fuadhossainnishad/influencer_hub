import Image from 'next/image'
import React from 'react'

const services = [
    {
        title: "Get Paid Securely",
        desc: "Every payment is protected through our escrow system. No delays, no risks.",
        icon: "/assets/icons/card.svg"
    },
    {
        title: "Work with Trusted Brands",
        desc: "Collaborate with verified businesses that value your creativity.",
        icon: "/assets/icons/brand.svg"
    },
    {
        title: "Advanced Analytics",
        desc: "Track engagement, conversions, and revenue from every campaign.",
        icon: "/assets/icons/analytics.svg"
    }
]

export default function ServiceCard() {
    return (
        <main className="bg-white rounded-2xl shadow-xl py-8 flex flex-col md:flex-row 
                        md:justify-evenly w-full ">

            {services.map((ser, ind) => (
                <section
                    key={ind}
                    className="flex flex-col items-center justify-start  text-center gap-3 w-full md:w-1/4"
                >
                    <div className="self-center justify-start">
                        <Image
                            src={ser.icon}
                            alt={ser.title}
                            height={40}
                            width={40}
                        />
                    </div>

                    <h2 className="text-lg font-semibold text-gray-800">
                        {ser.title}
                    </h2>

                    <p className="text-sm text-gray-600 leading-relaxed">
                        {ser.desc}
                    </p>
                </section>
            ))}
        </main>
    )
}
