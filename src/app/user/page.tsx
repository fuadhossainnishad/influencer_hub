"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getAllCampaigns } from "@/services/campaign.service";


const myCampaigns = [
  {
    id: 1,
    title: "Winter Fashion Promo",
    budget: "$500",
    status: "Active",
    influencers: 12,
  },
  {
    id: 2,
    title: "Food Review Boost",
    budget: "$350",
    status: "Pending",
    influencers: 6,
  },
];

const otherCampaigns = [
  {
    id: 3,
    title: "Travel Essentials Launch",
    budget: "$400",
    status: "Active",
    influencers: 8,
  },
  {
    id: 4,
    title: "Tech Gadget Promo",
    budget: "$600",
    status: "Active",
    influencers: 10,
  },
];


export default function Dashboard() {
  const router = useRouter();

  const [campaigns, setCampaigns] = useState(otherCampaigns);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    const response = await getAllCampaigns();

    if (response.success) {
      setCampaigns(response.data);
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

      {/* Integrated API data */}
      <CampaignSection title="Other Campaigns" campaigns={campaigns} />

      <InfluencerSection title="Top Rated Influencers" />
    </div>
  );
}

/* ------------------ CAMPAIGN SECTION ------------------ */
function CampaignSection({ title, campaigns }: { title: string; campaigns: any[] }) {
  const router = useRouter()
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Button variant="outline" size="sm">View All</Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {campaigns.map((c) => (
          <Card key={c.id} className="rounded-xl shadow-sm hover:shadow-md transition">
            <CardContent className="p-4 space-y-3">

              {/* Thumbnail */}
              <Image
                src={`http://localhost/influencer_hub_server/${c.thumbnail}`}
                alt={c.title}
                width={400}
                height={200}
                className="rounded-lg w-full h-40 object-cover"
              />

              <h3 className="font-semibold text-lg">{c.title}</h3>

              <p className="text-sm text-gray-600">
                <span className="font-medium">Budget:</span> ${c.budget}
              </p>

              <p className="text-sm text-gray-600">
                <span className="font-medium">Created:</span> {c.created_at}
              </p>

              <Button
                className="w-full mt-2"
                onClick={() => router.push(`/user/campaign/${c.id}`)}
              >
                View Campaign
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

/* ------------------ CLEAN INFLUENCER SECTION ------------------ */
function InfluencerSection({ title }: { title: string }) {
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Button variant="outline" size="sm">View More</Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

        {Array(4).fill("").map((_, i) => (
          <Card
            key={i}
            className="rounded-xl shadow-sm hover:shadow-lg transition cursor-pointer"
          >
            <CardContent className="p-4 space-y-4">

              {/* Image */}
              <Image
                src="/user-placeholder.png"
                alt="Influencer"
                width={300}
                height={200}
                className="rounded-lg w-full object-cover"
              />

              {/* Name */}
              <h3 className="font-semibold text-lg">Sara Afrin</h3>

              {/* Location */}
              <p className="text-sm text-gray-500">Dhaka, Bangladesh</p>

              {/* Rating */}
              <div className="flex items-center gap-1 text-yellow-500 font-medium">
                ⭐ 4.8
              </div>

              {/* Skills */}
              <div className="flex gap-2 text-sm">
                <span className="px-2 py-1 bg-gray-100 rounded-md">Fashion</span>
                <span className="px-2 py-1 bg-gray-100 rounded-md">Makeup</span>
              </div>

            </CardContent>
          </Card>
        ))}

      </div>
    </section>
  );
}
