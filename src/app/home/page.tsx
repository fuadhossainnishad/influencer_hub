import React from 'react'
import MarketingCard from '../../components/MarketingCard';
import ServiceCard from '../../components/ServiceCard';
import Hero from '@/components/Hero';
import Moto from '@/components/Moto';
import CommunityVoices from '@/components/CommunityVoices';
import { Cat } from 'lucide-react';
import Cta from '@/components/Cta';

const MarketingData = [
  {
    title: "Grow Your Business with",
    title2: "Powerful Influencer Analytics",
    desc: "Make smarter marketing decisions with real-time analytics, trusted data, and performance-driven insights that help you track every campaign, measure real ROI, and turn opportunities into lasting business growth.",
    image: "/assets/images/m1.png",
    imagePosition: 'right' as const,
    cardEventTitle: "Hire an Influencer",
    route: '/login',
    containerBg: "#E0E7FF"
  },
  {
    title: "Grow Your Business with",
    title2: "Powerful Influencer Analytics",
    desc: "Make smarter marketing decisions with real-time analytics, trusted data, and performance-driven insights that help you track every campaign, measure real ROI, and turn opportunities into lasting business growth.",
    image: "/assets/images/m1.png",
    imagePosition: 'left' as const,
    cardEventTitle: "Become an Influencer",
    route: '/login',
    containerBg: "#FFF8E7"
  }
]

export default function Home() {
  return (
    <main className='w-full flex-1 space-y-16 pb-16'>
      <Hero />
      <div className="px-5 -mt-[8%]">    <ServiceCard /></div>

      {MarketingData.map((card, ind) => (
        <MarketingCard
          key={ind}
          cardDetails={card}
        />
      ))}
      <Moto />
      <CommunityVoices />
      <Cta />
    </main>
  )
}
