import React from "react";
import Image from "next/image";

const testimonials = [
  {
    name: "Kevin",
    title: "Gaming Influencer, USA",
    desc:
      "The analytics are incredible. I finally have a clear view of my earning potential and can negotiate better rates.",
    avatar: "/assets/images/voice.png",
  },
  {
    name: "Maria Rodriguez",
    title: "Marketing Director, Spain",
    desc:
      "Finding micro-influencers was easy. We saw a 40% increase in conversions from targeted campaigns.",
    avatar: "/assets/images/voice.png",
  },
  {
    name: "Sarah Jenkins",
    title: "Lifestyle Creator, UK",
    desc:
      "I now spend less time on admin and more time creating. The direct communication feature is amazing.",
    avatar: "/assets/images/voice.png",
  },
  {
    name: "Elena Rossi",
    title: "Startup Founder, Italy",
    desc:
      "Our budget now goes further. The transparent pricing model and detailed reports save us time and money.",
    avatar: "/assets/images/voice.png",
  },
];

export default function CommunityVoices() {
  return (
    <section className="w-full py-20 px-5 md:px-20 flex flex-col items-center gap-12 bg-gray-50">
      <h2 className="text-3xl md:text-5xl font-bold text-gray-900 text-center">
        Community Voices
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md p-6 flex flex-row gap-4 items-center hover:shadow-lg transition"
          >
            <div className="shrink-0">
              <Image
                src={t.avatar}
                alt={t.name}
                width={64}
                height={64}
                className="rounded-lg "
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-gray-700 text-base">{`"${t.desc}"`}</p>
              <div>
                <h4 className="text-gray-900 font-semibold">{t.name}</h4>
                <span className="text-gray-500 text-sm">{t.title}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
