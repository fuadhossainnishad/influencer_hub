"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import axios from "axios";
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
    user_id: number;
}

interface ApplicationsData {
    total_applied: number;
    applied_by_current_user: boolean;
}

export default function CampaignDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const [campaign, setCampaign] = useState<Campaign | null>(null);
    const [applications, setApplications] = useState<ApplicationsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (id) {
            fetchCampaignDetails(id as string);
            fetchApplications(id as string);
        }
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

    const fetchApplications = async (campaignId: string) => {
        if (!token) return;
        try {
            const res = await axios.get(
                `http://localhost/influencer_hub_server/campaign/getCampaignApplications.php?campaign_id=${campaignId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (res.data.success) {
                setApplications(res.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch applications:", error);
        }
    };

    const handleApply = async () => {
        if (!token || !campaign) return;
        setApplying(true);
        try {
            const formData = new FormData();
            formData.append("campaign_id", campaign.id.toString());

            const res = await axios.post(
                "http://localhost/influencer_hub_server/campaign/applyCampaign.php",
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert(res.data.message);

            // Refresh applications after applying
            fetchApplications(campaign.id.toString());
        } catch (error) {
            console.error(error);
            alert("Failed to apply");
        } finally {
            setApplying(false);
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

            {/* Campaign Details */}
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

            {/* Applications Info */}
            {applications && (
                <div className="bg-white shadow-md rounded-lg p-6 space-y-2">
                    <h2 className="text-2xl font-semibold text-gray-800">Applications</h2>
                    <p>
                        <span className="font-medium">Total Applied:</span> {applications.total_applied}
                    </p>
                    <p>
                        <span className="font-medium">You have applied:</span>{" "}
                        {applications.applied_by_current_user ? "✅ Yes" : "❌ No"}
                    </p>

                    {/* Apply Button */}
                    {!applications.applied_by_current_user && (
                        <Button
                            className="mt-3 bg-green-500 text-white hover:bg-green-600"
                            onClick={handleApply}
                            disabled={applying}
                        >
                            {applying ? "Applying..." : "Apply Now"}
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}
