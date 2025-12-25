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
        tags: ["Content Calendar", "Community Mgmt"]
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
    }
];

export default function Services() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleService = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-agency-black pt-[200px] pb-[80px] relative overflow-hidden">

            {/* Background Title - Fixed/Absolute similar to Pricing */}
            <div className="absolute top-50 left-0 w-full pt-10 md:pt-0 pl-[2px] z-0 select-none pointer-events-none">
                <h1 className="font-display font-black tracking-tighter uppercase leading-[0.8]"
                    style={{
                        fontSize: '18vw',
                        color: '#000000', // Matches bg
                        // Embossed effect on black: Light highlight top-left, dark shadow bottom-right (though shadow on black is invisible, the highlight defines it)
                        textShadow: '-1px -1px 2px rgba(255,255,255,0.3)'
                    }}>
                    CAPABILITIES
                </h1>
            </div>

            <div className="max-w-[1320px] mx-auto px-[20px] md:px-[65px] relative z-10 pt-[15vh] md:pt-[25vh]">

                {/* Intro Text */}
                <div className="mb-20 md:mb-32 max-w-2xl ml-auto">
                    <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed">
                        We combine strategic thinking with design excellence to create digital experiences that define brands and drive growth.
                    </p>
                </div>

                {/* Service Accordion List */}
                <div className="flex flex-col">
                    {services.map((service, index) => {
                        const isOpen = activeIndex === index;
                        return (
                            <div
                                key={index}
                                onClick={() => toggleService(index)}
                                className={`group border-t border-white/10 cursor-pointer transition-all duration-500 ease-out ${isOpen ? 'py-12 bg-white/5' : 'py-8 hover:bg-white/5'}`}
                            >
                                {/* Accordion Header */}
                                <div className="flex items-center justify-between px-4 md:px-8">
                                    <div className="flex items-baseline gap-6 md:gap-16">
                                        <span className={`font-mono text-sm transition-colors duration-300 ${isOpen ? 'text-storm-lime' : 'text-white/30'}`}>
                                            {service.id}
                                        </span>
                                        <div className="relative">
                                            <h2 className={`font-display font-black text-3xl md:text-6xl lg:text-7xl uppercase leading-none transition-all duration-300 ${isOpen ? 'text-storm-lime translate-x-4' : 'text-white group-hover:text-white/80'}`}>
                                                {service.title}
                                            </h2>
                                        </div>
                                    </div>

                                    <div className={`w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full border transition-all duration-300 ${isOpen ? 'bg-storm-lime border-storm-lime rotate-180 text-agency-black' : 'border-white/20 text-white group-hover:border-white group-hover:bg-white group-hover:text-agency-black'}`}>
                                        {isOpen ? <FiMinus className="text-xl md:text-2xl" /> : <FiPlus className="text-xl md:text-2xl" />}
                                    </div>
                                </div>

                                {/* Accordion Content (Animated Height) */}
                                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[800px] opacity-100 mt-8' : 'max-h-0 opacity-0 mt-0'}`}>
                                    <div className="px-4 md:pl-[calc(4rem+32px)] md:pr-8 max-w-5xl">
                                        <p className="text-lg md:text-2xl text-white/70 font-light leading-relaxed mb-10 max-w-3xl">
                                            {service.desc}
                                        </p>

                                        <div className="flex flex-wrap gap-3">
                                            {service.tags.map(tag => (
                                                <span key={tag} className="border border-white/20 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-white/60 hover:border-storm-lime hover:text-storm-lime transition-colors cursor-default">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <div className="border-t border-white/10"></div>
                </div>
            </div>

            {/* Pricing Section */}
            <div className="mt-0">
                <PricingSection />
            </div>
        </div>
    );
}
