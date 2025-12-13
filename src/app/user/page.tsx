"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getAllCampaigns, getMyCampaigns } from "@/services/campaign.service";

interface Campaign {
  id: number;
  user_id: number;
  title: string;
  description: string;
  budget: string;
  created_at: string;
  thumbnail: string;
  creative: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  location?: string;
  phone?: string;
  email?: string;
  business_category?: string;
  profile_image?: string;
}
interface AppliedCampaign {
  application_id: number;
  campaign_id: number;
  title: string;
  description: string;
  budget: string;
  thumbnail: string;
  created_at: string;
  status: 'applied' | 'approved' | 'rejected';
  applied_at: string;
}

export default function Dashboard() {
  const router = useRouter();

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [myCampaigns, setMyCampaigns] = useState<Campaign[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [influencers, setInfluencers] = useState<User[]>([]);
  const [appliedCampaigns, setAppliedCampaigns] = useState<AppliedCampaign[]>([]);

  useEffect(() => {
    fetchCampaigns();
    fetchMyCampaigns();
    fetchInfluencers();
    fetchAppliedCampaigns();
  }, []);
  const fetchAppliedCampaigns = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      const res = await axios.get(`http://localhost/influencer_hub_server/campaign/getMyAppliedCampaigns.php?user_id=${userId}`);
      console.log("Applied campaigns response:", res.data);
      if (res.data.success) setAppliedCampaigns(res.data.data);
    } catch (error) {
      console.error("Failed to fetch applied campaigns:", error);
    }
  };
  const fetchMyCampaigns = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const response = await getMyCampaigns(token);
    if (response.success) {
      setMyCampaigns(response.data);
      setUserId(response.data[0]?.user_id || null);
    }
  };

  const fetchCampaigns = async () => {
    const response = await getAllCampaigns();
    if (response.success) setCampaigns(response.data);
  };

  const fetchInfluencers = async () => {
    try {
      const res = await axios.get("http://localhost/influencer_hub_server/users/getAllUsers.php");
      if (res.data.success) setInfluencers(res.data.data);
    } catch (error) {
      console.error("Failed to fetch influencers:", error);
    }
  };

  const applyCampaign = async (campaignId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const formData = new FormData();
      formData.append("campaign_id", campaignId.toString());

      const res = await axios.post(
        "http://localhost/influencer_hub_server/campaign/applyCampaign.php",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(res.data.message);
    } catch (error) {
      console.error(error);
      alert("Failed to apply");
    }
  };

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-semibold mb-2">
        Welcome back, <span className="text-blue-600">Luna Glow!</span>
      </h1>

      <Button className="mt-4" onClick={() => router.push("/user/campaign/createCampaign")}>
        Create New Campaign
      </Button>
      <AppliedCampaignsSection campaigns={appliedCampaigns} />

      <CampaignSection title="My Campaigns" campaigns={myCampaigns} userId={userId} />
      <CampaignSection title="Other Campaigns" campaigns={campaigns} userId={userId} applyCampaign={applyCampaign} />

      <InfluencerSection title="Influencers" influencers={influencers} />
    </div>
  );
}

// ------------------ CAMPAIGN SECTION ------------------
function CampaignSection({ title, campaigns, userId, applyCampaign }: { title: string; campaigns: Campaign[]; userId: number | null; applyCampaign?: (id: number) => void }) {
  const router = useRouter();

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Button variant="outline" size="sm">View All</Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {campaigns.map((c) => (
          <Card key={c.id} className="rounded-xl shadow-sm hover:shadow-md transition">
            <CardContent className="p-4 space-y-3 flex flex-col">

              <Image
                src={`http://localhost/influencer_hub_server/${c.thumbnail}`}
                alt={c.title}
                width={400}
                height={200}
                className="rounded-lg w-full h-40 object-cover"
                unoptimized
              />

              <div className="space-y-1">
                <h3 className="font-semibold text-lg">{c.title}</h3>
                <p className="text-sm text-gray-600">Budget: ${c.budget}</p>
                <p className="text-sm text-gray-600">Created: {c.created_at}</p>
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <Button className="w-full" onClick={() => router.push(`/user/campaign/${c.id}`)}>
                  View Campaign
                </Button>
                {userId && applyCampaign && c.user_id !== userId && (
                  <Button className="w-full bg-green-500 text-white hover:bg-green-600" onClick={() => applyCampaign(c.id)}>
                    Apply Now
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

// ------------------ INFLUENCER SECTION ------------------
function InfluencerSection({ title, influencers }: { title: string; influencers: User[] }) {
  const router = useRouter();

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Button variant="outline" size="sm">View More</Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {influencers.map((user) => (
          <Card
            key={user.id}
            className="rounded-xl shadow-sm hover:shadow-lg transition cursor-pointer"
            onClick={() => router.push(`/user/profile/${user.id}`)}
          >
            <CardContent className="p-4 space-y-2">

              <Image
                src={
                  user.profile_image
                    ? `http://localhost/influencer_hub_server/${user.profile_image}`
                    : "/user-placeholder.png"
                }
                alt={user.name || "undefinded"}
                width={300}
                height={200}
                className="rounded-lg w-full object-cover h-40"
                unoptimized
              />


              <h3 className="font-semibold text-lg">{user.name}</h3>
              <p className="text-sm text-gray-500">@{user.username}</p>

              {user.location && (
                <p className="text-sm text-gray-500">{user.location}</p>
              )}

              {user.business_category && (
                <span className="px-2 py-1 bg-gray-100 rounded-md text-sm inline-block">
                  {user.business_category}
                </span>
              )}

            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function AppliedCampaignsSection({ campaigns }: { campaigns: AppliedCampaign[] }) {
  const router = useRouter();

  if (campaigns.length === 0) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">My Applied Campaigns</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {campaigns.map((c) => (
          <Card key={c.application_id} className="rounded-xl shadow-sm hover:shadow-md transition">
            <CardContent className="p-4 space-y-3 flex flex-col">
              <Image
                src={`http://localhost/influencer_hub_server/${c.thumbnail}`}
                alt={c.title!}
                width={400}
                height={200}
                className="rounded-lg w-full h-40 object-cover"
                unoptimized
              />

              <div className="space-y-1">
                <h3 className="font-semibold text-lg">{c.title}</h3>
                <p className="text-sm text-gray-600">Budget: ${c.budget}</p>
                <p className="text-sm text-gray-600">Applied: {new Date(c.applied_at).toLocaleDateString()}</p>
                <p className={`text-sm font-semibold ${c.status === 'approved' ? 'text-green-600' :
                  c.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'
                  }`}>
                  Status: {c.status.toUpperCase()}
                </p>
              </div>

              <Button className="w-full" onClick={() => router.push(`/user/campaign/${c.campaign_id}`)}>
                View Campaign
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
