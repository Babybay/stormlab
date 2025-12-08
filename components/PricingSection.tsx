import React from 'react';
import { useNavigate } from 'react-router-dom';

interface PricingTier {
    name: string;
    price: string;
    description?: string;
    features: string[];
}

interface PricingCategory {
    category: string;
    tiers: PricingTier[];
}

const pricingData: PricingCategory[] = [
    {
        category: "Web Strategy",
        tiers: [
            {
                name: "Starter",
                price: "IDR 1.5M – 2M",
                description: "Perfect for small businesses or startups.",
                features: [
                    "1x Consultation Session (60–90 mins)",
                    "Basic Competitor Analysis",
                    "Target Audience & Basic Persona Definition",
                    "Goal Setting (3–5 KPIs)",
                    "Core Tactic Recommendations (Strategy Only)"
                ]
            },
            {
                name: "Growth",
                price: "IDR 3M – 4.5M",
                description: "For businesses needing a serious roadmap.",
                features: [
                    "2x Consultation Sessions",
                    "Competitor Analysis + Benchmarking",
                    "Complete Customer Personas",
                    "Marketing Funnel Overview",
                    "30–60 Day Action Plan",
                    "Tools & Budget Breakdown Recommendations"
                ]
            }
        ]
    },
    {
        category: "Social Media Planning",
        tiers: [
            {
                name: "Starter",
                price: "IDR 1M – 1.5M",
                description: "Essential social foundation to get you started.",
                features: [
                    "Account Audit",
                    "Content Ideas (10–15 Feeds/Stories)",
                    "Caption Guide (No Full Copywriting)",
                    "Basic Posting Schedule"
                ]
            }
        ]
    },
    {
        category: "Design & Graphics",
        tiers: [
            {
                name: "Starter",
                price: "IDR 800K – 1.2M",
                description: "Quick, high-quality assets for your feed.",
                features: [
                    "5–7 Content Designs (Static)",
                    "Basic Color & Font Recommendations",
                    "1x Revision Set"
                ]
            },
            {
                name: "Growth",
                price: "IDR 2M – 3M",
                description: "Consistent visual identity for growing brands.",
                features: [
                    "10–15 Content Designs",
                    "Template Design (Canva/Figma)",
                    "Basic Visual Guidelines",
                    "2x Revision Sets"
                ]
            },
            {
                name: "Pro",
                price: "IDR 4M – 6M",
                description: "Full-scale creative direction and campaign support.",
                features: [
                    "20–25 Content Designs",
                    "Creative Direction (Moodboard + Visual Brand)",
                    "Advanced Layout + Multiple Formats",
                    "3x Revision Sets",
                    "Campaign Support"
                ]
            }
        ]
    }
];

export default function PricingSection() {
    const navigate = useNavigate();

    return (
        <section className="bg-white py-[80px] text-agency-black">
            <div className="ml-auto mr-auto max-w-[1320px] px-[65.3333px]">
                <h2 className="font-medium text-[67.64px] tracking-[-4.7348px] leading-[62.2998px] mb-[60px] text-agency-black">
                    Investment <span className="text-storm-lime">Packages</span>
                </h2>

                <div className="flex flex-col gap-24">
                    {pricingData.map((cat, idx) => (
                        <div key={idx} className="flex flex-col gap-8">
                            <h3 className="text-[28px] md:text-[32px] font-mono uppercase tracking-widest text-agency-black/50 border-b border-agency-black/10 pb-4">
                                0{idx + 1} . {cat.category}
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {cat.tiers.map((tier, tIdx) => (
                                    <div
                                        key={tIdx}
                                        className="group p-8 border border-agency-black/10 bg-white hover:border-storm-lime transition-colors duration-300 flex flex-col"
                                    >
                                        <div className="mb-6">
                                            <h4 className="text-xl font-bold mb-2">{tier.name}</h4>
                                            <p className="text-storm-lime text-2xl font-mono mb-4">{tier.price}</p>

                                            {/* Description - Revealed on Hover */}
                                            <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                                                <div className="overflow-hidden">
                                                    <p className="text-agency-black/60 text-sm leading-relaxed mb-4">
                                                        {tier.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <ul className="space-y-4 mb-8 flex-1">
                                            {tier.features.map((feat, fIdx) => (
                                                <li key={fIdx} className="flex items-start gap-3 text-sm text-agency-black/80">
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-storm-lime flex-shrink-0" />
                                                    <span className="leading-relaxed">{feat}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <button
                                            onClick={() => navigate('/contact')}
                                            className="w-full py-4 border border-agency-black/20 hover:bg-storm-lime hover:border-storm-lime hover:text-agency-black transition-all duration-300 text-sm font-medium tracking-widest uppercase"
                                        >
                                            Select Plan
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
