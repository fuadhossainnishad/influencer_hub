"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";

export default function ProfileByIdPage() {
    const { id } = useParams();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        if (id) fetchProfile(id as string);
    }, [id]);

    const fetchProfile = async (userId: string) => {
        try {
            const res = await axios.get(`http://localhost/influencer_hub_server/users/getUserProfile.php?user_id=${userId}`);
            if (res.data.success) setUser(res.data.data);
        } catch (error) {
            console.error("Failed to fetch profile:", error);
        }
    };

    if (!user) return <p>Loading...</p>;

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Image
                    src={user.profile_image ? `http://localhost/influencer_hub_server/${user.profile_image}` : "/user-placeholder.png"}
                    alt={user.username}
                    height={300}
                    width={300}
                    className="w-32 h-32 rounded-full object-cover"
                    unoptimized
                />
                <div>
                    <h1 className="text-3xl font-bold">{user.username}</h1>
                    {user.business_category && (
                        <span className="px-2 py-1 bg-gray-100 rounded-md text-sm">{user.business_category}</span>
                    )}
                </div>
            </div>

            <div className="space-y-2">
                {user.location && <p><strong>Location:</strong> {user.location}</p>}
                {user.phone && <p><strong>Phone:</strong> {user.phone}</p>}
                {user.email && <p><strong>Email:</strong> {user.email}</p>}
                {user.bio && <p><strong>About:</strong> {user.bio}</p>}

                <div className="flex gap-4 mt-2">
                    {user.instagram && <a href={user.instagram} target="_blank" className="text-blue-500">Instagram</a>}
                    {user.facebook && <a href={user.facebook} target="_blank" className="text-blue-700">Facebook</a>}
                    {user.youtube && <a href={user.youtube} target="_blank" className="text-red-600">YouTube</a>}
                    {user.tiktok && <a href={user.tiktok} target="_blank" className="text-black">TikTok</a>}
                </div>
            </div>
        </div>
    );
}
