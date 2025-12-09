import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footbar() {
  return (
    <footer className="w-full bg-gray-900 text-gray-200 py-16 px-5 md:px-[10%]">
      <section className="flex items-start justify-between w-full">
        <Image
          src="/assets/images/logoWithText.svg"
          alt="logo"
          height={140}
          width={140}
          className="object-contain"
        />

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-semibold text-white">For Businesses</h4>
            <Link href="/create-campaign" className="hover:text-indigo-400 transition">
              Create Campaign
            </Link>
            <Link href="/my-campaigns" className="hover:text-indigo-400 transition">
              My Campaigns
            </Link>

          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-semibold text-white">For Influencers</h4>
            <Link href="/my-profile" className="hover:text-indigo-400 transition">
              My Profile
            </Link>
            <Link href="/become-influencer" className="hover:text-indigo-400 transition">
              Become an Influencer
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-semibold text-white">Company</h4>
            <Link href="/about-us" className="hover:text-indigo-400 transition">
              About Us
            </Link>
            <Link href="/contact-us" className="hover:text-indigo-400 transition">
              Contact Us
            </Link>
            <Link href="/privacy-policy" className="hover:text-indigo-400 transition">
              Privacy Policy
            </Link>
            <Link href="/terms-conditions" className="hover:text-indigo-400 transition">
              Terms & Conditions
            </Link>
            <Link href="/faq" className="hover:text-indigo-400 transition">
              FAQs
            </Link>
          </div>
        </div>
      </section>
      <div className="mt-10 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Brand Name. All rights reserved.
      </div>
    </footer>
  );
}
