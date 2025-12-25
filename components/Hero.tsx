import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import CircularGallery from './CircularGallery';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Initial States
    gsap.set(".reveal-text", { yPercent: 100 });
    gsap.set(".hero-fade", { opacity: 0 });

    // Animation Sequence (Masked Reveal)
    tl.to(".reveal-text", {
      yPercent: 0,
      duration: 1.5,
      stagger: 0.1,
      ease: "power4.out"
    })
      .to(".hero-fade", {
        opacity: 1,
        duration: 1,
        stagger: 0.2
      }, "-=1.0");

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#333] flex flex-col justify-between p-6 md:p-12 overflow-hidden z-10"
    >
      {/* BACKGROUND GALLERY */}
      <div className="absolute inset-0 z-0 bg-agency-black mb-0">
        <CircularGallery
          bend={2}
          textColor="#ffffff"
          borderRadius={0.05}
        />
      </div>

      {/* FOREGROUND CONTENT (Overlay) */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-12 z-20 pointer-events-none">

        {/* TOP ROW */}
        <div className="w-full flex justify-between items-start">
          <div className="overflow-hidden">
            <h2 className="reveal-text font-sans font-bold text-[1.5vh] md:text-[2vh] tracking-widest uppercase text-white mix-blend-difference">
              EST. 2024
            </h2>
          </div>
          <div className="overflow-hidden text-right">
            <h2 className="reveal-text font-sans font-bold text-[1.5vh] md:text-[2vh] tracking-widest uppercase text-white mix-blend-difference">
              BASED IN INDONESIA<br />
              AVAILABLE WORLDWIDE
            </h2>
          </div>
        </div>

        {/* CENTER MAIN TITLES */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center flex flex-col items-center justify-center">
          <div className="w-full py-2 overflow-hidden">
            {/* NEUMORPHIC TITLE (Updated for Dark BG) */}
            <h1 className="reveal-text text-[18vw] py-4 leading-[0.8] font-display font-black tracking-tighter cursor-default text-storm-lime drop-shadow-2xl">
              STORMLAB
            </h1>
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className="w-full flex justify-between items-end">
          <div className="max-w-md overflow-hidden pointer-events-auto">
            <p className="reveal-text font-sans text-lg md:text-xl font-medium leading-tight text-white mix-blend-difference">
              We redefine digital landscapes through <span className="underline decoration-2 decoration-storm-lime underline-offset-4">radical design</span>.
            </p>
          </div>

          <div className="overflow-hidden pointer-events-auto cursor-pointer">
            <div className="hero-fade w-12 h-12 rounded-full border border-white flex items-center justify-center animate-spin-slow text-white">
              <span className="mb-1 text-2xl">↓</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}