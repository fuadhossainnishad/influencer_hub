"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import axios from "axios";

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

interface ApplicationUser {
  id: number;
  name: string;
  username: string;
  profile_image?: string;
  business_category?: string;
  applied_at: string;
  status: "applied" | "approved" | "rejected";
}

export default function CampaignDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [applications, setApplications] = useState<ApplicationUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  // Load token and userId safely on client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      const storedUserId = localStorage.getItem("userId");
      setToken(storedToken);
      setUserId(storedUserId ? parseInt(storedUserId) : null);
    }
  }, []);

  const isOwner = userId !== null && campaign?.user_id === userId;

  // Fetch campaign and applications when id or token changes
  useEffect(() => {
    if (id) {
      fetchCampaign(id as string);
      if (token) fetchApplications(id as string, token);
    }
  }, [id, token]);

  const fetchCampaign = async (campaignId: string) => {
    try {
      const res = await axios.get(
        `http://localhost/influencer_hub_server/campaign/getCampaignById.php?campaign_id=${campaignId}`
      );
      if (res.data.success) setCampaign(res.data.data);
    } catch (err) {
      console.error("Failed to fetch campaign:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async (campaignId: string, token: string) => {
    try {
      const res = await axios.get(
        `http://localhost/influencer_hub_server/campaign/getCampaignApplications.php?campaign_id=${campaignId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        const apps = Array.isArray(res.data.data) ? res.data.data : [];
        setApplications(apps);
      } else {
        setApplications([]);
      }
    } catch (err) {
      console.error("Failed to fetch applications:", err);
      setApplications([]);
    }
  };

  // Apply to campaign
  const handleApply = async () => {
    if (!campaign || !token) return;
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
      fetchApplications(campaign.id.toString(), token);
    } catch (err) {
      console.error("Failed to apply:", err);
      alert("Failed to apply");
    } finally {
      setApplying(false);
    }
  };

  // Accept or reject an applicant
  const updateApplicationStatus = async (appId: number, status: "approved" | "rejected") => {
    if (!token) return;

    try {
      const formData = new FormData();
      formData.append("application_id", appId.toString());
      formData.append("status", status);

      const res = await axios.post(
        "http://localhost/influencer_hub_server/campaign/updateApplicationStatus.php",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(res.data.message);
      // Refresh application list
      fetchApplications(campaign!.id.toString(), token);
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update status");
    }
  };

  if (loading) return <p className="p-6 text-gray-500">Loading campaign...</p>;
  if (!campaign) return <p className="p-6 text-red-500">Campaign not found</p>;

  const hasApplied = applications.some(a => a.status === "applied");

  return (
    <div className="p-6 space-y-8 max-w-5xl mx-auto">
      <Button variant="outline" onClick={() => router.back()}>← Back</Button>

      <h1 className="text-4xl font-bold">{campaign.title}</h1>
      <p className="text-gray-600">{campaign.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <Image
          src={`http://localhost/influencer_hub_server/${campaign.thumbnail}`}
          alt={campaign.title}
          width={600}
          height={400}
          className="w-full h-64 object-cover rounded-lg"
          unoptimized
        />
        {campaign.creative && (
          <Image
            src={`http://localhost/influencer_hub_server/${campaign.creative}`}
            alt="Creative"
            width={600}
            height={400}
            className="w-full h-64 object-cover rounded-lg"
            unoptimized
          />
        )}
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <p><strong>Budget:</strong> ${campaign.budget}</p>
        <p><strong>Timeline:</strong> {campaign.timeline} days</p>
        <p><strong>Deliverables:</strong> {campaign.deliverables}</p>
        <p><strong>Created At:</strong> {campaign.created_at}</p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-semibold">Applications</h2>

        {applications.length === 0 ? (
          <p>No influencers have applied yet.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {applications.map((user) => (
              <Card key={user.id} className="shadow-sm hover:shadow-md rounded-lg">
                <CardContent className="p-4 space-y-2 flex flex-col items-center">
                  <Image
                    src={user.profile_image ? `http://localhost/influencer_hub_server/${user.profile_image}` : "/user-placeholder.png"}
                    alt={user.username}
                    width={200}
                    height={150}
                    className="rounded-lg object-cover"
                    unoptimized
                  />
                  <h3 className="font-semibold">{user.name}</h3>
                  <p className="text-sm text-gray-500">@{user.username}</p>
                  {user.business_category && <p className="text-sm bg-gray-100 px-2 py-1 rounded">{user.business_category}</p>}
                  <p className="text-sm text-gray-600">Status: {user.status.toUpperCase()}</p>
                  <p className="text-xs text-gray-400">Applied: {new Date(user.applied_at).toLocaleDateString()}</p>

                  {isOwner && user.status === "applied" && (
                    <div className="flex gap-2 mt-2">
                      <Button
                        onClick={() => updateApplicationStatus(user.id, "approved")}
                        className="bg-green-500 text-white hover:bg-green-600"
                      >
                        Accept
                      </Button>
                      <Button
                        onClick={() => updateApplicationStatus(user.id, "rejected")}
                        className="bg-red-500 text-white hover:bg-red-600"
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!isOwner && !hasApplied && token && (
          <Button onClick={handleApply} disabled={applying} className="bg-green-500 text-white hover:bg-green-600">
            {applying ? "Applying..." : "Apply Now"}
          </Button>
        )}
      </div>
    </div>
  );
}
