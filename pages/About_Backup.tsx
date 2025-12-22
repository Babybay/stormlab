
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Light Neumorphic Card (Refined)
const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-[#e0e5ec] rounded-[30px] p-8 md:p-12 shadow-[12px_12px_24px_rgb(163,177,198,0.6),-12px_-12px_24px_rgba(255,255,255,0.7)] border border-white/50 ${className}`}>
        {children}
    </div>
);

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.utils.toArray<HTMLElement>('.grid-item').forEach((item, i) => {
            gsap.from(item, {
                y: 50,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
                stagger: 0.1,
                scrollTrigger: {
                    trigger: item,
                    start: "top 90%"
                }
            });
        });
    }, { scope: containerRef });

    return (
        <main ref={containerRef} className="min-h-screen bg-[#e0e5ec] font-sans selection:bg-storm-lime selection:text-black pb-32">

            {/* SPACIOUS HERO HEADER */}
            <header className="max-w-[1400px] mx-auto px-6 md:px-12 pt-32 md:pt-48 pb-24 text-center">
                <h1 className="text-[15vw] md:text-[12vw] font-display font-black text-neumorph-inset leading-[0.8] tracking-tighter uppercase mb-12">
                    Who We<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-storm-lime to-agency-black drop-shadow-none">Are.</span>
                </h1>
                <p className="text-agency-black/70 text-2xl md:text-4xl font-light max-w-4xl mx-auto leading-relaxed">
                    A multidisciplinary collective defining the new standard of digital interaction. <span className="font-bold text-agency-black">No compromises.</span>
                </p>
            </header>

            {/* IMMERSIVE BENTO GRID */}
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12">

                    {/* 1. THE ORIGIN (Large Block) */}
                    <div className="grid-item lg:col-span-8">
                        <Card className="h-full flex flex-col justify-between group hover:bg-[#e6ebf2] transition-colors duration-500">
                            <div>
                                <h3 className="text-4xl md:text-5xl font-display font-bold text-agency-black mb-8 uppercase tracking-wide group-hover:text-storm-lime transition-colors">The Origin</h3>
                                <p className="text-xl md:text-2xl text-agency-black/80 leading-relaxed max-w-3xl font-medium">
                                    StormLab was born from a simple observation: the web has become boring. We set out to build an agency that rejects templates and embraces the chaotic energy of true innovation.
                                </p>
                            </div>
                            <div className="mt-16 flex items-end justify-between">
                                <span className="text-9xl font-display font-black text-neumorph-inset opacity-50">01</span>
                                <div className="hidden md:block w-32 h-1 bg-agency-black/10"></div>
                            </div>
                        </Card>
                    </div>

                    {/* 2. STATS (Tall Block) */}
                    <div className="grid-item lg:col-span-4 lg:row-span-2">
                        <Card className="h-full flex flex-col justify-center items-center text-center py-16">
                            <div className="mb-16">
                                <span className="block text-8xl font-display font-black text-agency-black mb-2">25+</span>
                                <span className="text-agency-black/50 text-sm font-bold uppercase tracking-[0.2em]">Global Partners</span>
                            </div>
                            <div>
                                <span className="block text-8xl font-display font-black text-agency-black mb-2">100%</span>
                                <span className="text-agency-black/50 text-sm font-bold uppercase tracking-[0.2em]">Success Rate</span>
                            </div>
                        </Card>
                    </div>

                    {/* 3. PHILOSOPHY (Medium Block) */}
                    <div className="grid-item lg:col-span-4">
                        <Card className="h-full">
                            <h3 className="text-3xl font-display font-bold text-agency-black mb-6 uppercase">Philosophy</h3>
                            <p className="text-lg text-agency-black/70 leading-relaxed font-medium">
                                We believe in "Subtractive Design". We remove the noise until only the essential signal remains.
                            </p>
                        </Card>
                    </div>

                    {/* 4. METHOD (Medium Block) */}
                    <div className="grid-item lg:col-span-4">
                        <Card className="h-full">
                            <h3 className="text-3xl font-display font-bold text-agency-black mb-6 uppercase">Method</h3>
                            <p className="text-lg text-agency-black/70 leading-relaxed font-medium">
                                Strategy first. Code second. We don't write a single line of code until we clearly understand the problem.
                            </p>
                        </Card>
                    </div>

                    {/* 5. VISUAL BREAK (Full Width) */}
                    <div className="grid-item lg:col-span-12">
                        <div className="relative py-32 flex items-center justify-center overflow-hidden rounded-[30px]">
                            {/* Neumorphic Background Text */}
                            <span className="absolute inset-0 flex items-center justify-center text-[20vw] font-display font-black text-neumorph-inset select-none pointer-events-none opacity-60">
                                STORM
                            </span>

                            <div className="relative z-10 text-center max-w-4xl">
                                <p className="text-4xl md:text-6xl font-black text-agency-black leading-tight">
                                    "We don't just build websites.<br /> We build <span className="text-storm-lime inline-block transform hover:skew-x-12 transition-transform duration-300">digital empires</span>."
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 6. THE COLLECTIVE (Wide Block) */}
                    <div className="grid-item lg:col-span-7">
                        <Card className="h-full">
                            <h3 className="text-4xl font-display font-bold text-agency-black mb-8 uppercase">The Collective</h3>
                            <div className="space-y-8">
                                <div className="flex items-start border-b border-agency-black/10 pb-8">
                                    <span className="text-2xl font-bold text-storm-lime mr-6">01.</span>
                                    <div>
                                        <h4 className="text-2xl font-bold text-agency-black">Designers</h4>
                                        <p className="text-agency-black/60 font-medium">Obsessed with aesthetics and user flow.</p>
                                    </div>
                                </div>
                                <div className="flex items-start border-b border-agency-black/10 pb-8">
                                    <span className="text-2xl font-bold text-storm-lime mr-6">02.</span>
                                    <div>
                                        <h4 className="text-2xl font-bold text-agency-black">Engineers</h4>
                                        <p className="text-agency-black/60 font-medium">Architects of robust, scalable systems.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-2xl font-bold text-storm-lime mr-6">03.</span>
                                    <div>
                                        <h4 className="text-2xl font-bold text-agency-black">Strategists</h4>
                                        <p className="text-agency-black/60 font-medium">Planning the path to market dominance.</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* 7. CTA (Wide Block) */}
                    <Link to="/contact" className="grid-item lg:col-span-5 group">
                        <Card className="h-full bg-agency-black flex flex-col items-center justify-center text-center shadow-[12px_12px_24px_#a3b1c6,-12px_-12px_24px_#ffffff] group-hover:scale-[0.98] transition-transform duration-300 border-none">
                            <span className="text-6xl md:text-8xl font-display font-black text-white mb-4 group-hover:text-storm-lime transition-colors">START<br />NOW.</span>
                            <div className="w-16 h-1 bg-white/20 rounded-full mt-4 group-hover:w-32 transition-all duration-300 bg-storm-lime"></div>
                        </Card>
                    </Link>

                </div>
            </div>

        </main>
    );
}
