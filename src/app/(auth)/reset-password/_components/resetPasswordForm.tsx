"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import apiList from "@/services/apiList";
import apiCall, { TMethods } from "@/services/apiMethodList";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

const onSubmit = async (data: FieldValues) => {
  const email = localStorage.getItem("email");
  const otp = localStorage.getItem("otp");

  if (!email || !otp) return toast.error("Email/OTP missing. Start again.");

  if (data.password !== data.confirmPassword) {
    return toast.error("Passwords do not match");
  }

  try {
    const res = await apiCall(TMethods.post, apiList.resetPassword, {
      email,
      otp,
      password: data.password,
    });

    if (!res.success) return toast.error(res.message || "Reset failed");
    console.log(res);

    toast.success("Password reset successfully!");
    localStorage.removeItem("otp"); // clear OTP after reset
    router.push("/login");
  } catch {
    toast.error("Server error");
  }
};


  return (
    <form className="space-y-6 w-full flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2 w-full">
        <label className="block text-sm font-medium text-gray-700">New Password</label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            {...register("password", { required: "New password is required", minLength: 6 })}
            placeholder="Enter new password"
            className="h-12 w-full rounded-md border px-3 py-2 pr-10 text-sm"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message as string}</p>}
      </div>

      <div className="space-y-2 w-full">
        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
        <Input
          type={showPassword ? "text" : "password"}
          {...register("confirmPassword", { required: "Confirm your password" })}
          placeholder="Confirm new password"
          className="h-12 w-full rounded-md border px-3 py-2 text-sm"
        />
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message as string}</p>}
      </div>

      <Button type="submit" className="h-10 w-full bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Reset Password
      </Button>
    </form>
  );
}
