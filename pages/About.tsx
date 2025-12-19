
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Light Neumorphic Card
const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-[#e0e5ec] rounded-[30px] p-8 shadow-[9px_9px_16px_rgb(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)] border border-white/40 ${className}`}>
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
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%"
                }
            });
        });
    }, { scope: containerRef });

    return (
        <main ref={containerRef} className="min-h-screen bg-[#e0e5ec] font-sans selection:bg-storm-lime selection:text-black pb-32">

            <div className="max-w-[1280px] mx-auto px-6 md:px-12 pt-16 relative z-10">

                {/* Header (Minimal, No numbers) */}
                <header className="mb-24 md:mb-32 text-center max-w-4xl mx-auto">
                    <h1 className="text-6xl md:text-9xl font-display font-black text-gray-800 tracking-tighter mb-8 uppercase leading-[0.85]">
                        Who We <br /><span className="text-transparent bg-clip-text bg-gradient-to-br from-storm-lime to-emerald-600">Are.</span>
                    </h1>
                    <p className="text-gray-500 text-xl font-light leading-relaxed">
                        A multidisciplinary collective defining the new standard of digital interaction.
                    </p>
                </header>

                {/* THE GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">

                    {/* Item 1: Origin (Wide) */}
                    <Link to="/contact" className="grid-item md:col-span-2 group">
                        <Card className="h-full flex flex-col justify-between transition-all hover:bg-[#e6ebf2] hover:-translate-y-1">
                            <div>
                                <h3 className="text-3xl font-display font-bold text-gray-800 mb-6 group-hover:text-storm-lime transition-colors">The Origin</h3>
                                <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
                                    StormLab was born from a simple observation: the web has become boring. We set out to build an agency that rejects templates and embraces the chaotic energy of true innovation. Based in Bali, serving the globe.
                                </p>
                            </div>
                            <div className="mt-12 flex justify-end">
                                <div className="w-12 h-12 rounded-full bg-[#e0e5ec] shadow-[5px_5px_10px_#a3b1c6,-5px_-5px_10px_#ffffff] flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-600 group-hover:text-storm-lime" strokeWidth="2">
                                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                                    </svg>
                                </div>
                            </div>
                        </Card>
                    </Link>

                    {/* Item 2: Stats (Tall) */}
                    <div className="grid-item md:row-span-2">
                        <Card className="h-full flex flex-col items-center justify-center text-center">
                            <div className="mb-12">
                                <span className="block text-7xl font-display font-black text-gray-800 mb-2">25+</span>
                                <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Global Partners</span>
                            </div>
                            <div>
                                <span className="block text-7xl font-display font-black text-gray-800 mb-2">100%</span>
                                <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Success Rate</span>
                            </div>
                        </Card>
                    </div>

                    {/* Item 3: Philosophy */}
                    <div className="grid-item">
                        <Card className="h-full">
                            <h3 className="text-2xl font-display font-bold text-gray-800 mb-4">Philosophy</h3>
                            <p className="text-gray-600 leading-relaxed">
                                We believe in "Subtractive Design". We remove the noise until only the essential signal remains. Every pixel must earn its place.
                            </p>
                        </Card>
                    </div>

                    {/* Item 4: Method */}
                    <div className="grid-item">
                        <Card className="h-full">
                            <h3 className="text-2xl font-display font-bold text-gray-800 mb-4">Method</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Strategy first. Code second. We don't write a single line of code until we clearly understand the problem we are solving.
                            </p>
                        </Card>
                    </div>

                    {/* Item 5: Divider / Visual */}
                    <div className="grid-item md:col-span-3">
                        <Card className="flex items-center justify-center py-24 overflow-hidden relative">
                            <div className="absolute inset-0 flex items-center justify-center opacity-5 select-none pointer-events-none">
                                <span className="text-[20vw] font-display font-black">STORM</span>
                            </div>
                            <p className="text-2xl md:text-4xl text-center font-bold text-gray-700 max-w-3xl relative z-10 leading-tight">
                                "We don't just build websites. We build <span className="text-storm-lime">digital empires</span>."
                            </p>
                        </Card>
                    </div>

                    {/* Item 6: Team/Culture */}
                    <div className="grid-item md:col-span-2">
                        <Card className="h-full">
                            <h3 className="text-3xl font-display font-bold text-gray-800 mb-6">The Collective</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-bold text-gray-800">Designers</h4>
                                    <p className="text-sm text-gray-500">Obsessed with aesthetics and user flow.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800">Engineers</h4>
                                    <p className="text-sm text-gray-500">Architects of robust, scalable systems.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800">Strategists</h4>
                                    <p className="text-sm text-gray-500">Planning the path to market dominance.</p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Item 7: CTA */}
                    <Link to="/contact" className="grid-item group">
                        <Card className="h-full bg-storm-lime shadow-[9px_9px_16px_rgba(163,177,198,0.5),-9px_-9px_16px_rgba(255,255,255,0.8)] border-transparent flex flex-col items-center justify-center text-center transition-transform hover:scale-95 text-agency-black">
                            <span className="text-2xl font-bold uppercase tracking-widest mb-2">Join Us</span>
                            <span className="text-xs font-mono opacity-60">Start Your Project →</span>
                        </Card>
                    </Link>

                </div>
            </div>
        </main>
    );
}
