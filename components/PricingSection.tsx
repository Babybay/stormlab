import React from 'react';

const pricingPackages = [
    {
        title: 'RAPID LAUNCH',
        price: '15M',
        description: 'Perfect for startups needing a quick, high-impact market entry.',
        features: [
            'Brand Identity System',
            'Landing Page Development',
            'Social Media Kit',
            '2 Weeks Turnaround'
        ]
    },
    {
        title: 'GROWTH ENGINE',
        price: '35M',
        description: 'Comprehensive solution for scaling businesses.',
        features: [
            'Full Website Redesign',
            'SEO & Content Strategy',
            'Marketing Automation',
            'Monthly Analytics Report'
        ]
    },
    {
        title: 'DOMINANCE',
        price: '75M+',
        description: 'End-to-end digital transformation and market domination.',
        features: [
            'Custom Web App Development',
            '360° Brand Campaign',
            'Dedicated Growth Team',
            '24/7 Priority Support'
        ]
    }
];

export default function PricingSection() {
    return (
        <section className="relative w-full bg-storm-lime py-2 px-4 md:px-8 font-sans min-h-screen flex flex-col justify-center">
            <div className="max-w-[1400px] mx-auto w-full relative">

                {/* Header Container with Layered Typography */}
                <div className="absolute top-20 left-0 w-full pt-10 md:pt-0 pl-[2px] z-0 select-none">
                    <div className="relative inline-block">
                        {/* Layer 1: Base - PRICING - Sunken/Inset Style */}
                        <h2 className="font-display font-black tracking-tighter uppercase leading-[0.8]"
                            style={{
                                fontSize: '18vw',
                                color: '#ccff00', // Same as background
                                // Sunken effect: Dark Top-Left (Shadow), Light Bottom-Right (Highlight)
                                textShadow: '-4px -4px 8px rgba(100,128,0,0.4), 4px 4px 8px rgba(255,255,255,0.6)'
                            }}>
                            PRICING
                        </h2>
                    </div>
                </div>

                {/* Content Container */}
                <div className="relative z-10 pt-[25vh] md:pt-[35vh]">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {pricingPackages.map((pkg, idx) => (
                            <div
                                key={idx}
                                className="group relative rounded-[30px] border-2 border-agency-black/10 bg-white/20 backdrop-blur-sm p-8 transition-all duration-300 hover:border-agency-black hover:shadow-[8px_8px_0px_0px_#000000]"
                            >
                                <div className="relative flex flex-col h-full justify-between h-[450px]">
                                    <div>
                                        {/* Title - Flat Bold */}
                                        <h3 className="font-display text-3xl md:text-4xl font-black tracking-tight mb-2 text-left text-agency-black">
                                            {pkg.title}
                                        </h3>

                                        {/* Price - Flat Bold */}
                                        <div className="text-left mb-6">
                                            <span className="inline-block font-display text-5xl md:text-6xl font-black tracking-tighter text-agency-black">
                                                {pkg.price}
                                            </span>
                                        </div>

                                        <p className="font-medium text-left text-agency-black/80 mb-6 text-sm leading-relaxed">
                                            {pkg.description}
                                        </p>

                                        {/* Features List */}
                                        <div className="border-t border-agency-black/10 pt-6 mb-6">
                                            <ul className="space-y-3">
                                                {pkg.features.map((feature, i) => (
                                                    <li key={i} className="flex items-start gap-3">
                                                        <div className="h-1.5 w-1.5 rounded-full bg-agency-black mt-2 shrink-0"></div>
                                                        <span className="font-bold text-agency-black text-sm">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* CTA Button - Rolling Text Animation (Black Bg, Lime Text on Hover) */}
                                    <button className="relative w-full h-14 rounded-xl bg-agency-black overflow-hidden transition-all duration-300 border border-transparent hover:border-agency-black group/btn">
                                        <div className="relative w-full h-full flex flex-col items-center justify-center transition-transform duration-300 group-hover/btn:-translate-y-[100%]">
                                            {/* Default Text */}
                                            <span className="flex items-center justify-center h-full font-black text-storm-lime uppercase tracking-widest text-sm">
                                                Select Plan
                                            </span>
                                            {/* Hover Text (Absolute overlay or stacked in flex col) */}
                                            <span className="absolute top-[100%] left-0 w-full h-full flex items-center justify-center font-black text-storm-lime uppercase tracking-widest text-sm">
                                                Select Plan
                                            </span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
