import React from 'react';
import GradientBlinds from './GradientBlinds';
import ScrollReveal from './ScrollReveal';

export default function StudioStatement() {
    return (
        <section className="relative w-full h-screen overflow-hidden bg-agency-black flex items-center justify-center">
            {/* Background Gradient Blinds */}
            <div className="absolute inset-0 z-0">
                <GradientBlinds
                    gradientColors={['#000000', '#000000', '#ccff00', '#ccff00']}
                    blindCount={20}
                    noise={0.1}
                />
            </div>

            {/* Scroll Reveal Content */}
            <div className="relative z-10 max-w-[1320px] mx-auto px-[20px] lg:px-[65px] text-center">
                <ScrollReveal
                    textClassName="text-white selection:bg-black selection:text-white"
                    baseOpacity={0}
                    baseRotation={5}
                    enableBlur={true}
                >
                    We build digital experiences that defy gravity. StormLab combines strategic rigor with creative chaos to produce work that matters.
                </ScrollReveal>

                {/* Process Steps */}
                <div className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-4 md:gap-x-16">
                    {['Discovery', 'Strategy', 'Execution Guidance', 'Optimization & Reporting', 'Maintenance & Support'].map((step, i) => (
                        <div key={i} className="group flex items-center gap-3">
                            <span className="font-mono text-storm-lime text-sm tracking-widest">0{i + 1}</span>
                            <span className="text-white/80 text-lg md:text-xl font-light group-hover:text-storm-lime transition-colors duration-300 cursor-default">
                                {step}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
