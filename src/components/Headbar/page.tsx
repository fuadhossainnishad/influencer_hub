import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

export default function Headbar() {
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
        <Link
          href="/auth?type=login"
          className="px-5 py-2.5 border border-indigo-600 text-indigo-600
                     rounded-lg font-medium hover:bg-indigo-50 transition"
        >
          Sign In
        </Link>

        <Link
          href="/auth?type=signup"
          className="px-5 py-2.5 bg-indigo-600 text-white 
                     rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          Sign Up
        </Link>
      </nav>

    </header>
  )
}
