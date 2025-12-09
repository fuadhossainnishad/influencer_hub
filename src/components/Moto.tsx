import Image from 'next/image'
import React from 'react'

const data = [
    {
        icon: '/assets/icons/smart.svg',
        title: "Smart Recomendation"
    },
    {
        icon: '/assets/icons/score.svg',
        title: "Verified Collaboration Score"
    },
    {
        icon: '/assets/icons/campaign.svg',
        title: "Campaign Suggestions"
    },
    {
        icon: '/assets/icons/rate.svg',
        title: "Interest & Niche Filters"
    }
]

export default function Moto() {
    return (
        <main className='flex justify-evenly'>
            {
                data.map((d, i) => (
                    <section
                        key={i}
                        className="flex flex-col items-center justify-start  text-center gap-3 w-full md:w-1/4"
                    >
                        <div className="self-center justify-start">
                            <Image
                                src={d.icon}
                                alt={d.title}
                                height={40}
                                width={40}
                            />
                        </div>

                        <h2 className="text-lg font-semibold text-gray-800">
                            {d.title}
                        </h2>


                    </section>
                ))
            }
        </main>
    )
}
