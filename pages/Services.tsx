import React, { useRef, useState } from 'react';
import { FiArrowUpRight, FiPlus, FiMinus } from 'react-icons/fi';
import PricingSection from '../components/PricingSection';

const services = [
    {
        id: "01",
        title: "Strategic Planning",
        desc: "We help you to create plan for reaching measurable goals and customers with complete focus into business. We analyze market trends, competitor landscapes, and internal capabilities to build a roadmap that works.",
        tags: ["Brand Audit", "Positioning", "Roadmap"]
    },
    {
        id: "02",
        title: "Social Media",
        desc: "Comprehensive social media strategies that engage your audience and build lasting brand connections. From content creation to community management, we handle your digital voice.",
        tags: ["Content Calendar", "Community Mgmt", "Analytics"]
    },
    {
        id: "03",
        title: "SEO & Content",
        desc: "Drive organic traffic and boost your search rankings with data-driven SEO and compelling content. We ensure your brand is found by the right people at the right time.",
        tags: ["Keyword Research", "Copywriting", "On-page optimization"]
    },
    {
        id: "04",
        title: "Design & Graphics",
        desc: "Creative visual solutions that capture attention and communicate your brand story effectively. Our design team blends aesthetics with functionality to create memorable experiences.",
        tags: ["Visual Identity", "UI/UX", "Motion"]
    },
    {
        id: "05",
        title: "Analytics",
        desc: "Track performance metrics and gain actionable insights to optimize your marketing campaigns. We turn data into decisions, ensuring every dollar spent delivers ROI.",
        tags: ["Reporting", "Data Viz", "Conversion Rate"]
    }
];

export default function Services() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleService = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-white pt-[120px] pb-[80px]">
            <div className="max-w-[1320px] mx-auto px-[20px] md:px-[65px]">
                {/* Header */}
                <h1 className="font-medium text-[60px] md:text-[80px] tracking-tight leading-[0.9] mb-[80px] text-agency-black">
                    Our <span className="text-agency-black/30">Expertise.</span>
                </h1>

                {/* Service Accordion List */}
                <div className="flex flex-col">
                    {services.map((service, index) => {
                        const isOpen = activeIndex === index;
                        return (
                            <div
                                key={index}
                                onClick={() => toggleService(index)}
                                className={`group border-b border-agency-black/10 cursor-pointer transition-all duration-500 ease-out ${isOpen ? 'py-10' : 'py-6'}`}
                            >
                                {/* Accordion Header */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-8 md:gap-16">
                                        <span className={`font-mono text-sm transition-colors duration-300 ${isOpen ? 'text-storm-lime' : 'text-agency-black/30'}`}>
                                            {service.id}
                                        </span>
                                        <div className="relative">
                                            <h2 className={`text-[32px] md:text-[56px] font-medium leading-none transition-all duration-300 ${isOpen ? 'ml-4' : ''}`}>
                                                {service.title}
                                            </h2>
                                            {/* Lime Underline on Hover */}
                                            <div className="absolute left-0 bottom-0 w-0 h-[3px] bg-storm-lime transition-all duration-300 group-hover:w-full"></div>
                                        </div>
                                    </div>

                                    <div className={`w-12 h-12 flex items-center justify-center rounded-full border transition-all duration-300 ${isOpen ? 'bg-storm-lime border-storm-lime rotate-180' : 'border-agency-black/10 group-hover:border-agency-black'}`}>
                                        {isOpen ? <FiMinus className="text-agency-black text-xl" /> : <FiPlus className="text-agency-black text-xl" />}
                                    </div>
                                </div>

                                {/* Accordion Content (Animated Height) */}
                                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 mt-8' : 'max-h-0 opacity-0 mt-0'}`}>
                                    <div className="pl-0 md:pl-[calc(4rem+16px)] max-w-4xl">
                                        <p className="text-lg md:text-2xl text-agency-black/70 font-light leading-relaxed mb-8">
                                            {service.desc}
                                        </p>

                                        <div className="flex flex-wrap gap-3">
                                            {service.tags.map(tag => (
                                                <span key={tag} className="bg-agency-black/5 px-4 py-2 rounded-full text-xs uppercase tracking-widest text-agency-black/50">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Pricing Section */}
            <div className="mt-20">
                <PricingSection />
            </div>
        </div>
    );
}
