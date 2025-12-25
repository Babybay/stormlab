import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const services = [
    {
        id: '01',
        title: "STRATEGY",
        description: "Brand Positioning, Market Analysis & digital roadmaps.",
        features: ["Market Research", "Brand Strategy", "Persona Development"]
    },
    {
        id: '02',
        title: "BRANDING",
        description: "Visual identity systems that command attention.",
        features: ["Logo Design", "Typography", "Art Direction"]
    },
    {
        id: '03',
        title: "EXPERIENCE",
        description: "Immersive UI/UX design for web and mobile.",
        features: ["UI/UX Design", "Prototyping"]
    },
    {
        id: '04',
        title: "ENGINEERING",
        description: "Robust, scalable frontend and backend solutions.",
        features: ["Web Development", "App Development", "CMS Integration"]
    }
];

export default function ServicesSection() {
    const [activeService, setActiveService] = useState<number | null>(null);

    return (
        <section className="relative w-full bg-[#e0e5ec] min-h-screen py-24 px-4 md:px-12 flex flex-col justify-center">

            {/* Background Title - Fixed/Absolute similar to previous designs */}
            <div className="absolute top-20 left-0 w-full pt-10 md:pt-0 pl-[2px] z-0 select-none pointer-events-none">
                <h2 className="font-display font-black tracking-tighter uppercase leading-[0.8]"
                    style={{
                        fontSize: '18vw',
                        color: '#e0e5ec',
                        textShadow: '-4px -4px 8px rgba(255,255,255,0.6), 4px 4px 8px rgba(163,177,198,0.6)'
                    }}>
                    SERVICES
                </h2>
            </div>

            <div className="relative z-10 max-w-[1400px] mx-auto w-full pt-[20vh]">
                <div className="flex flex-col border-b border-agency-black/10">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group relative border-t border-agency-black/10 transition-all duration-300 hover:border-agency-black/30 hover:bg-white/30"
                            onMouseEnter={() => setActiveService(index)}
                            onMouseLeave={() => setActiveService(null)}
                            onClick={() => setActiveService(activeService === index ? null : index)}
                        >
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-12 md:py-16 px-4 cursor-pointer">

                                <div className="flex items-baseline gap-6 md:gap-12">
                                    <span className="font-display font-bold text-xl md:text-2xl text-agency-black/40 group-hover:text-agency-black transition-colors">
                                        {service.id}
                                    </span>
                                    <h3 className="font-display font-black text-3xl md:text-6xl lg:text-7xl uppercase text-agency-black transition-transform duration-300 group-hover:translate-x-4">
                                        {service.title}
                                    </h3>
                                </div>

                                <div className="mt-6 md:mt-0 flex items-center gap-8 md:gap-16 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                                    <p className="font-sans text-base md:text-lg font-medium max-w-xs hidden md:block text-right">
                                        {service.description}
                                    </p>
                                    <div className="w-12 h-12 rounded-full border border-agency-black/20 flex items-center justify-center group-hover:bg-agency-black group-hover:text-storm-lime transition-all duration-300 transform group-hover:rotate-45">
                                        <ArrowUpRight size={24} />
                                    </div>
                                </div>
                            </div>

                            {/* Expandable Content / Hover Reveal */}
                            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeService === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="pb-12 px-4 md:pl-[120px]">
                                    <ul className="flex flex-wrap gap-4 md:gap-8">
                                        {service.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-agency-black"></span>
                                                <span className="font-sans font-bold uppercase text-sm tracking-widest text-agency-black/80">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
