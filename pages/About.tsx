
import React from 'react';

// Light Neumorphic Card
const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-[#e0e5ec] rounded-[30px] p-8 md:p-12 shadow-[12px_12px_24px_rgb(163,177,198,0.6),-12px_-12px_24px_rgba(255,255,255,0.7)] border border-white/50 ${className}`}>
        {children}
    </div>
);

export default function About() {
    return (
        <main className="min-h-screen bg-[#e0e5ec] font-sans selection:bg-storm-lime selection:text-black pb-32 pt-32">

            <div className="max-w-[1400px] mx-auto px-6 md:px-12">

                {/* HERO TEXT */}
                <div className="text-center mb-24 cursor-default">
                    <h1 className="py-12 text-[18vw] md:text-[14vw] font-display font-black text-[#e0e5ec] text-shadow-neumorph leading-[0.8] tracking-tighter uppercase mb-8 md:mb-12 select-none" style={{ textShadow: "10px 10px 20px #a3b1c6, -10px -10px 20px #ffffff" }}>
                        WHO WE ARE
                    </h1>
                    <div className="text-agency-black/50 text-xl md:text-3xl font-light tracking-wide max-w-2xl mx-auto opacity-70">
                        A multidisciplinary collective defining the new standard.
                    </div>
                </div>

                {/* BENTO GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12">

                    {/* 1. THE ORIGIN (Large Block) */}
                    <div className="lg:col-span-8">
                        <Card className="h-full flex flex-col justify-between hover:bg-[#e6ebf2] transition-colors duration-500">
                            <div>
                                <h3 className="text-4xl md:text-5xl font-display font-bold text-agency-black mb-8 uppercase tracking-wide">The Origin</h3>
                                <p className="text-xl md:text-2xl text-agency-black/80 leading-relaxed max-w-3xl font-medium">
                                    StormLab was born from a simple observation: the web has become boring. We set out to build an agency that rejects templates and embraces the chaotic energy of true innovation.
                                </p>
                            </div>
                            <div className="mt-16 flex items-end justify-between">
                                <span className="text-9xl font-display font-black text-agency-black/5 select-none opacity-50">01</span>
                                <div className="hidden md:block w-32 h-1 bg-agency-black/10"></div>
                            </div>
                        </Card>
                    </div>

                    {/* 2. STATS */}
                    <div className="lg:col-span-4 lg:row-span-2">
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

                    {/* 3. PHILOSOPHY */}
                    <div className="lg:col-span-4">
                        <Card className="h-full">
                            <h3 className="text-3xl font-display font-bold text-agency-black mb-6 uppercase">Philosophy</h3>
                            <p className="text-lg text-agency-black/70 leading-relaxed font-medium">
                                We believe in "Subtractive Design". We remove the noise until only the essential signal remains.
                            </p>
                        </Card>
                    </div>

                    {/* 4. METHOD */}
                    <div className="lg:col-span-4">
                        <Card className="h-full">
                            <h3 className="text-3xl font-display font-bold text-agency-black mb-6 uppercase">Method</h3>
                            <p className="text-lg text-agency-black/70 leading-relaxed font-medium">
                                Strategy first. Code second. We don't write a single line of code until we clearly understand the problem.
                            </p>
                        </Card>
                    </div>

                    {/* 5. VISUAL BREAK */}
                    <div className="lg:col-span-12">
                        <div className="relative py-32 flex items-center justify-center overflow-hidden rounded-[30px] shadow-[inset_10px_10px_20px_#a3b1c6,inset_-10px_-10px_20px_#ffffff] bg-[#e0e5ec]">
                            <span className="absolute inset-0 flex items-center justify-center text-[20vw] font-display font-black text-agency-black/5 select-none pointer-events-none">
                                STORM
                            </span>
                            <div className="relative z-10 text-center max-w-4xl px-4">
                                <p className="text-4xl md:text-6xl font-black text-agency-black leading-tight">
                                    "We don't just build websites.<br /> We build <span className="text-storm-lime inline-block">digital empires</span>."
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 6. THE COLLECTIVE */}
                    <div className="lg:col-span-7">
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

                    {/* 7. CTA */}
                    <div className="lg:col-span-5 relative group cursor-pointer" onClick={() => window.location.href = '/contact'}>
                        <div className="absolute inset-0 bg-[#e0e5ec] rounded-[30px] shadow-[12px_12px_24px_rgb(163,177,198,0.6),-12px_-12px_24px_rgba(255,255,255,0.7)] group-hover:first-letter:shadow-[inset_5px_5px_10px_#a3b1c6,inset_-5px_-5px_10px_#ffffff] transition-all duration-300"></div>
                        <div className="h-full bg-agency-black rounded-[30px] flex flex-col items-center justify-center text-center p-8 relative z-10 transition-transform duration-300 group-hover:scale-[0.98]">
                            <span className="text-6xl md:text-8xl font-display font-black text-white mb-4 group-hover:text-storm-lime transition-colors">START<br />NOW.</span>
                            <div className="w-16 h-1 bg-white/20 rounded-full mt-4 group-hover:w-32 transition-all duration-300 bg-storm-lime"></div>
                        </div>
                    </div>

                </div>
            </div>

        </main>
    );
}
