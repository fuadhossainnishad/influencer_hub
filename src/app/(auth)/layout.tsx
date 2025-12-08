import Image from "next/image";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex w-full justify-center items-center min-h-screen px-[15%] bg-[#6366F1] bg-[url('/assets/images/image.png')] bg-cover bg-center bg-no-repeat">
      <section className="flex justify-evenly items-center bg-white w-full flex-1 py-[10%] px-[5%] rounded-4xl">
        <div className="">
          <Image
            src="/assets/images/fullLogo.svg"
            alt="logo"
            height={300}
            width={300}

          />
        </div>
        <section className="max-w-1/3"> {children}</section>
      </section>
    </main>
  );
}
