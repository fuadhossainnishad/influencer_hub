'use client'
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import EmailVeirfyForm from "./_components/emailVeirfyForm";

export default function ForgotPasswordPage() {
  // const searchParam = useSearchParams()
  // const types: string = searchParam.get("type") === 'forgot' ? 'forgot' : 'signup'
  // const title = types === "login" ? "Continue with your email" : "Create New Account";
  return (
    <main className="w-full space-y-7 items-center flex flex-col">
      <div className="space-y-5 text-center w-full flex flex-col items-center">
        <h1 className="text-2xl  font-bold text-[#103F73]  ">
          Continue with your email
        </h1>
      </div>
      <EmailVeirfyForm />
      <div className="flex flex-col items-center">
        <p className="text-sm text-gray-700">
          Don’t have an account?{" "}
          <Link href="/auth?type=login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>

        <p className="text-xs text-gray-500 w-[80%] leading-relaxed">
          By signing in, you agree to our{" "}
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
