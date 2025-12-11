"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getAllCampaigns } from "@/services/campaign.service";

interface Campaign {
    id: number;
    title: string;
    description: string;
    budget: string;
    timeline: number;
    deliverables: string;
    thumbnail: string;
    creative: string;
    created_at: string;
}

export default function CampaignDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const [campaign, setCampaign] = useState<Campaign | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) fetchCampaignDetails(id as string);
    }, [id]);

    const fetchCampaignDetails = async (id: string) => {
        try {
            const response = await getAllCampaigns();
            const campaignData = response.data.find((c: Campaign) => c.id === Number(id));
            setCampaign(campaignData || null);
        } catch (error) {
            console.error("Error fetching campaign details:", error);
            setCampaign(null);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p className="p-6 text-gray-500">Loading campaign details...</p>;
    if (!campaign) return <p className="p-6 text-red-500">Campaign not found</p>;

    return (
        <div className="p-6 space-y-8 max-w-5xl mx-auto">
            {/* Back Button */}
            <Button variant="outline" onClick={() => router.back()}>
                ← Back
            </Button>

            {/* Title & Description */}
            <div className="space-y-2">
                <h1 className="text-4xl font-bold text-gray-800">{campaign.title}</h1>
                <p className="text-gray-600">{campaign.description}</p>
            </div>

            {/* Images Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="rounded-lg overflow-hidden shadow-lg">
                    <h2 className="px-4 py-2 font-semibold bg-gray-100 text-gray-700">Thumbnail</h2>
                    <Image
                        src={`http://localhost/influencer_hub_server/${campaign.thumbnail}`}
                        alt={campaign.title}
                        width={600}
                        height={400}
                        className="w-full h-64 object-cover"
                    />
                </div>

                {campaign.creative && (
                    <div className="rounded-lg overflow-hidden shadow-lg">
                        <h2 className="px-4 py-2 font-semibold bg-gray-100 text-gray-700">Creative</h2>
                        <Image
                            src={`http://localhost/influencer_hub_server/${campaign.creative}`}
                            alt={campaign.title + " creative"}
                            width={600}
                            height={400}
                            className="w-full h-64 object-cover"
                        />
                    </div>
                )}
            </div>

            {/* Details Card */}
            <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800">Campaign Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p>
                        <span className="font-medium text-gray-700">Budget:</span> ${campaign.budget}
                    </p>
                    <p>
                        <span className="font-medium text-gray-700">Timeline:</span> {campaign.timeline} days
                    </p>
                    <p className="md:col-span-2">
                        <span className="font-medium text-gray-700">Deliverables:</span> {campaign.deliverables}
                    </p>
                    <p className="md:col-span-2">
                        <span className="font-medium text-gray-700">Created At:</span> {campaign.created_at}
                    </p>
                </div>
            </div>

            {/* Edit Button */}
            {/* <div className="flex justify-end">
                <Button
                    className="px-6 py-2"
                    onClick={() => router.push(`/user/campaign/${campaign.id}/edit`)}
                >
                    Edit Campaign
                </Button>
            </div> */}
        </div>
    );
}
