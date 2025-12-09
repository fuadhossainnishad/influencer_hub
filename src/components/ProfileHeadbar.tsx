'use client'
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProfileHeadbar() {
    const router = useRouter()
    return (
        <header className="flex justify-between items-center px-[10%] py-4 bg-white shadow-sm w-full text-black">

            <div className="flex items-center">
                <Image
                    src="/assets/images/logoWithText.svg"
                    alt="logo"
                    height={40}
                    width={140}
                    className="object-contain"
                />
            </div>

            <nav className="flex items-center gap-4">

                <Image
                    src="/assets/images/profile.png" // replace with actual profile image
                    alt="logo"
                    height={40}
                    width={40}
                    className="object-contain"
                    onClick={() => { router.push('/user/profile') }}
                />
            </nav>

        </header>
    )
}
