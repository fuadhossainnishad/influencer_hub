"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import apiCall, { TMethods } from "@/services/apiMethodList";
import apiList from "@/services/apiList";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const email = localStorage.getItem("email") || "";

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: FieldValues) => {
    if (!email) {
      toast.error("Email not found. Please verify your email first.");
      router.push("/verify-email");
      return;
    }

    setLoading(true);
    const payload = { ...data, email };

    try {
      const res = await apiCall(TMethods.post, apiList.signup, payload);
      console.log("signup:", res)
      if (!res.success) {
        toast.error(res.message || "Signup failed");
        setLoading(false);
        return;
      }

      toast.success("Account created successfully!");
      router.push("/login");

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">

      {/* Name
      <div className="space-y-2 w-full">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name *
        </label>
        <Input
          id="name"
          placeholder="Enter full name"
          {...register("name", { required: "Name is required" })}
          className="h-12 w-full rounded-md border border-gray-300 px-3 text-sm placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message as string}</p>}
      </div> */}

      {/* Username */}
      <div className="space-y-2 w-full">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username *
        </label>
        <Input
          id="username"
          placeholder="Enter username"
          {...register("username", { required: "Username is required" })}
          className="h-12 w-full rounded-md border border-gray-300 px-3 text-sm placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        {errors.username && <p className="text-red-500 text-sm">{errors.username.message as string}</p>}
      </div>

      {/* Password */}
      <div className="space-y-2 w-full">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password *
        </label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Minimum 8 characters" },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
                message: "Password must include uppercase, lowercase, number, and special character",
              },
            })}
            className="h-12 w-full rounded-md border border-gray-300 px-3 pr-10 text-sm placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message as string}</p>}
        <ul className="text-xs text-gray-500 mt-1 space-y-0.5">
          <li>At least 8 characters</li>
          <li>At least 1 special character</li>
          <li>At least 1 uppercase letter</li>
          <li>At least 1 lowercase letter</li>
          <li>At least 1 number</li>
        </ul>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={loading}
        className="h-12 w-full rounded-lg bg-linear-to-b from-[#1C75AD] to-[#083D70] text-white font-medium hover:opacity-90"
      >
        {loading ? "Creating Account..." : "Complete Sign Up"}
      </Button>
    </form>
  );
}
