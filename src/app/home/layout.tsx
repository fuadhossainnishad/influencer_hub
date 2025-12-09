import Image from "next/image";
import React from "react";
import Headbar from '../../components/Headbar/page';
import Footbar from '../../components/Footbar/page';

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="w-full min-h-screen flex flex-col bg-gray-50 ">
            <Headbar />
            <section className="w-full px-[10%] flex-1"> {children}</section>
<Footbar/>
        </main >
    );
}
