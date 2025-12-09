"use client";

import React from "react";
import Link from "next/link";
import SignupForm from "./_components/signupForm";

export default function SignupPage() {

  return (
    <main className="space-y-7 w-full flex flex-col items-center px-4 max-w-md mx-auto">
      <div className="space-y-5 text-center w-full flex flex-col items-center">
        <h1 className="text-2xl font-bold text-[#103F73]">
          User Credentials
        </h1>
      </div>

      <SignupForm />

      <div className="flex flex-col items-center space-y-2">
        <p className="text-sm text-gray-700">
          Already have an account?{" "}
          <Link href="/auth?type=login" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>

        <p className="text-xs text-gray-500 w-[80%] leading-relaxed text-center">
          By signing up, you agree to our{" "}
          <Link href="/terms" className="text-blue-600 hover:underline">
            Terms & Conditions
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-blue-600 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
