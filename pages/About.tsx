import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, Sparkles, MapPin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            defaults: { ease: "power3.out" }
        });

        tl.from(".bento-tile", {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1
        });
    }, { scope: containerRef });

    return (
        <main ref={containerRef} className="min-h-screen bg-agency-black pt-[120px] pb-[80px]">
            <div className="max-w-[1320px] mx-auto px-[20px] md:px-[65px]">

                {/* Header */}
                <div className="mb-16 max-w-3xl">
                    <h1 className="text-white text-[60px] md:text-[80px] font-medium leading-[0.9] tracking-tight mb-8">
                        Redefining <span className="text-storm-lime">Digital.</span>
                    </h1>
                    <p className="text-white/60 text-xl font-light leading-relaxed">
                        We are a new breed of agency. Agile, hungry, and obsessed with results. We are here to help you make your mark.
                    </p>
                </div>

                {/* Bento Grid (Simplified for New Agency) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">

                    {/* 1. Value / Philosophy (Large) */}
                    <div className="bento-tile col-span-1 md:col-span-2 row-span-1 rounded-[32px] bg-[#1A1A1A] border border-white/5 p-8 md:p-12 hover:border-storm-lime transition-colors duration-500 group flex flex-col justify-between">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Sparkles className="text-storm-lime w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-white text-3xl font-medium mb-4">Creative Chaos.</h3>
                            <p className="text-white/50 leading-relaxed font-light text-lg">
                                We believe that true innovation comes from the edge of chaos. We blend rigorous strategy with bold creativity to find solutions that bigger agencies miss.
                            </p>
                        </div>
                    </div>

                    {/* 2. Location (Requested) */}
                    <div className="bento-tile col-span-1 row-span-1 rounded-[32px] bg-[#333] p-8 flex flex-col justify-between group hover:bg-[#444] transition-colors duration-300">
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6">
                            <MapPin className="text-white w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="text-white text-2xl font-medium mb-2">Jakarta, ID</h4>
                            <p className="text-white/60">Headquarters</p>
                            <div className="mt-8 w-full h-[1px] bg-white/10"></div>
                            <p className="text-storm-lime mt-4 text-sm font-mono uppercase tracking-widest">Open for Business</p>
                        </div>
                    </div>

                    {/* 3. Call to Action (New Client Focus) */}
                    <div className="bento-tile col-span-1 md:col-span-3 row-span-1 rounded-[32px] bg-gradient-to-r from-storm-lime to-lime-400 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between group">
                        <div className="mb-6 md:mb-0">
                            <h3 className="text-agency-black text-3xl md:text-5xl font-medium mb-4">Ready to Launch?</h3>
                            <p className="text-agency-black/80 text-xl max-w-xl">
                                We are looking for our next partner. Let's build something extraordinary together.
                            </p>
                        </div>
                        <Link to="/contact" className="w-full md:w-auto bg-agency-black text-white px-8 py-4 rounded-full flex items-center justify-center gap-3 hover:scale-105 transition-transform duration-300">
                            <span className="font-mono uppercase tracking-widest text-sm">Start a Project</span>
                            <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>

                </div>
            </div>
        </main>
    );
}
