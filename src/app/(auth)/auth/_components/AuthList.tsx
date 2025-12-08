"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Mail, CircleUserRound } from "lucide-react";
import { useSearchParams } from "next/navigation";
// import { FcGoogle } from "react-icons/fc";
// import { FaApple, FaFacebook, FaLinkedin } from "react-icons/fa";

type Provider = {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  action?: () => void;
};

const PRIMARY_PROVIDERS: Provider[] = [
  // { id: "google", label: "Continue with Google", icon: <FcGoogle size={22} /> },
  // { id: "apple", label: "Continue with Apple", icon: <FaApple size={22} /> },
  {
    id: "email",
    label: "Continue with Email",
    icon: <Mail size={18} />,
  },
];

const SOCIALS: Provider[] = [
  { id: "linkedin", label: "LinkedIn", icon: <Mail size={18} /> },
  { id: "facebook", label: "Facebook", icon: <Mail size={18} /> },
];

export default function AuthEntry() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") === "signup" ? "verify-email" : "login";

  const handleProvider = (provider: Provider) => {
    if (provider.href) return;
    provider.action?.();
  };

  return (
    <div className="space-y-8 w-full flex flex-col items-center text-center">

      <div className="w-full space-y-3">
        {PRIMARY_PROVIDERS.map((p) =>
          p.id === 'email' ? (
            <Link key={p.id} href={`/${type}`}>
              <Button
                variant="outline"
                className="w-full h-12 justify-start gap-3 border-border-auth text-gray-700 hover:bg-gray-100"
              >
                {p.icon}
                {p.label}
              </Button>
            </Link>
          ) : (
            <Button
              key={p.id}
              variant="outline"
              onClick={() => handleProvider(p)}
              className="w-full h-12 justify-start gap-3 border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              {p.icon}
              {p.label}
            </Button>
          )
        )}
      </div>

      <div className="flex items-center w-full gap-3">
        <span className="flex-1 h-px bg-gray-300" />
        <span className="text-sm text-gray-500">Or continue with</span>
        <span className="flex-1 h-px bg-gray-300" />
      </div>

      <div className="flex gap-4">
        {SOCIALS.map((s) => (
          <Button
            key={s.id}
            variant="outline"
            onClick={() => handleProvider(s)}
            className="h-12 w-12 rounded-full flex items-center justify-center border-gray-300 hover:bg-gray-100"
          >
            {s.icon}
          </Button>
        ))}
      </div>

    </div >
  );
}
