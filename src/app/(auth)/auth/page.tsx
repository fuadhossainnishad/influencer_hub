'use client'

import React from "react";
import { useSearchParams } from "next/navigation";
import AuthEntry from "./_components/AuthList";
import Link from "next/link";

export default function AuthPage() {
  const searchParam = useSearchParams();
  const type = searchParam.get("type") === "login" ? "login" : "signup";
  const title = type === "login" ? "Sign in to your account" : "Create New Account";

  // Toggle the type for the bottom link
  const toggleType = type === "login" ? "signup" : "login";
  const toggleText = type === "login" ? "Sign Up" : "Sign In";

  return (
    <main className="space-y-7 w-full flex flex-col items-center">
      <div className="space-y-5 text-center w-full flex flex-col items-center">
        <h1 className="text-2xl font-bold text-[#103F73]">{title}</h1>
      </div>

      <AuthEntry />

      <div className="flex flex-col items-center space-y-2">
        <p className="text-sm text-gray-700">
          {type === "login" ? "Don’t have an account?" : "Already have an account?"}{" "}
          <Link href={`/auth?type=${toggleType}`} className="text-blue-600 hover:underline">
            {toggleText}
          </Link>
        </p>

        <p className="text-xs text-gray-500 w-[80%] leading-relaxed text-center">
          By signing in, you agree to our{" "}
          <Link href="/terms" className="text-blue-600 hover:underline">
            Terms & Conditions
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-blue-600 hover:underline">
            Privacy Policy
          </Link>{" "}
          to learn how we protect your data.
        </p>
      </div>
    </main>
  );
}
