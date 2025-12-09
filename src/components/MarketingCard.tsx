import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

export interface IMarketingCard {
    image: string
    imagePosition: 'left' | 'right'
    title: string
    title2: string
    desc: string
    cardEventTitle: string
    route: string
    containerBg: string
}

export default function MarketingCard({ cardDetails }: { cardDetails: IMarketingCard }) {
    return (
        <main
            className={`flex flex-col md:flex-row 
                        ${cardDetails.imagePosition === "left" ? "md:flex-row-reverse" : ""} 
                        items-center justify-between rounded-2xl gap-10 md:gap-20 p-10 w-full`}
            style={{ backgroundColor: cardDetails.containerBg }}
        >
            {/* Image */}
            <Image
                src={cardDetails.image}
                alt="cardImage"
                width={500}
                height={400}
                className="rounded-2xl object-cover shadow-lg"
            />

            {/* Text Section */}
            <section className="max-w-xl space-y-6">
                <div>
                    <h1 className="text-4xl font-bold text-gray-800 leading-snug">
                        {cardDetails.title}
                    </h1>
                    <h1 className="text-4xl font-bold text-gray-800 leading-snug">
                        {cardDetails.title2}
                    </h1>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed">
                    {cardDetails.desc}
                </p>

                <Link
                    href={cardDetails.route}
                    className="inline-block bg-indigo-600 hover:bg-indigo-700 
                               text-white px-6 py-3 rounded-lg shadow-md transition-all"
                >
                    {cardDetails.cardEventTitle}
                </Link>
            </section>
        </main>
    )
}
