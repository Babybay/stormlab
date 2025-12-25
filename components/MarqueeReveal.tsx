import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MarqueeReveal() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Row Animations
        const rows = gsap.utils.toArray('.marquee-row');
        rows.forEach((row: any, i) => {
            const direction = i % 2 === 0 ? -1 : 1; // Alternating direction
            gsap.to(row.querySelector('.marquee-content'), {
                xPercent: direction * 50,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.5
                }
            });
        });

    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[100vh] bg-agency-black overflow-hidden flex flex-col justify-center gap-0 z-20 py-20"
            // Added shadow to ensure clean separation from the fixed hero below during scroll
            style={{ boxShadow: '0px -20px 50px rgba(0,0,0,0.5)' }}
        >
            {[1, 2, 3].map((_, i) => (
                <div key={i} className="marquee-row w-full overflow-hidden flex relative border-y border-white/10 py-8 bg-agency-black">
                    <div className={`marquee-content flex whitespace-nowrap will-change-transform ${i % 2 !== 0 ? '-ml-[50%]' : ''}`}>
                        {[1, 2, 3, 4].map((_, j) => (
                            <h2 key={j} className={`text-[12vh] font-display font-black uppercase tracking-tighter px-8 ${i === 1 ? 'text-storm-lime' : 'text-transparent stroke-white opacity-40'}`}>
                                {i === 1 ? "WE CREATE IMPACT" : "DIGITAL FUTURE"} •&nbsp;
                            </h2>
                        ))}
                    </div>
                </div>
            ))}

            <style>{`
        .stroke-white { -webkit-text-stroke: 1px #fff; }
      `}</style>
        </section>
    );
}
