
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StudioStatement from '../components/StudioStatement';
import ExpertiseSection from '../components/ExpertiseSection';
import Capabilities from '../components/Capabilities';
import Clients from '../components/Clients';
import FAQ from '../components/FAQ';
import Testimonials from '../components/Testimonials';

gsap.registerPlugin(ScrollTrigger);

const expertises = [
    {
        id: "strategic-planning",
        title: "Strategic Planning",
        description: "We help you to create plan for reaching measurable goals and customers with complete focus into business.",
        link: "/services/strategy",
        projects: [
            { name: "Business Growth Strategy", category: "Strategy", image: "https://placehold.co/800x600/1a1a1a/FFFFFF?text=Strategy+I", url: "/work/strategy-1" },
            { name: "Market Analysis 2024", category: "Analysis", image: "https://placehold.co/800x600/1a1a1a/FFFFFF?text=Strategy+II", url: "/work/strategy-2" }
        ]
    },
    {
        id: "social-media",
        title: "Social Media Planning",
        description: "Comprehensive social media strategies that engage your audience and build lasting brand connections.",
        link: "/services/social",
        projects: [
            { name: "Instagram Campaigns", category: "Social Media", image: "https://placehold.co/800x600/1a1a1a/FFFFFF?text=Social+Media+I", url: "/work/social-1" },
            { name: "Brand Community", category: "Engagement", image: "https://placehold.co/800x600/1a1a1a/FFFFFF?text=Social+Media+II", url: "/work/social-2" }
        ]
    },
    {
        id: "seo-content",
        title: "SEO & Content Marketing",
        description: "Drive organic traffic and boost your search rankings with data-driven SEO and compelling content.",
        link: "/services/seo",
        projects: [
            { name: "Keyword Dominance", category: "SEO", image: "https://placehold.co/800x600/1a1a1a/FFFFFF?text=SEO+Project+I", url: "/work/seo-1" },
            { name: "Content Hub", category: "Marketing", image: "https://placehold.co/800x600/1a1a1a/FFFFFF?text=SEO+Project+II", url: "/work/seo-2" }
        ]
    },
    {
        id: "design-graphics",
        title: "Design and Graphics",
        description: "Creative visual solutions that capture attention and communicate your brand story effectively.",
        link: "/services/design",
        projects: [
            { name: "Brand Identity", category: "Design", image: "https://placehold.co/800x600/1a1a1a/FFFFFF?text=Design+I", url: "/work/design-1" },
            { name: "Visual Assets", category: "Graphics", image: "https://placehold.co/800x600/1a1a1a/FFFFFF?text=Design+II", url: "/work/design-2" }
        ]
    },
    {
        id: "analytics-reporting",
        title: "Analytics & Reporting",
        description: "Track performance metrics and gain actionable insights to optimize your marketing campaigns.",
        link: "/services/analytics",
        projects: [
            { name: "Performance Dashboard", category: "Analytics", image: "https://placehold.co/800x600/1a1a1a/FFFFFF?text=Analytics+I", url: "/work/analytics-1" },
            { name: "Growth Reports", category: "Data", image: "https://placehold.co/800x600/1a1a1a/FFFFFF?text=Analytics+II", url: "/work/analytics-2" }
        ]
    }
];

export default function Home() {
    const mainRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "+=100%",
                scrub: 1,
                pin: true,
            }
        });

        // 1. Text Color Shift: Inset (Gray) -> Solid Black
        tl.to(".hero-text", {
            color: "#1a1a1a", // Agency Black
            textShadow: "0px 0px 0px rgba(0,0,0,0)",
            ease: "power2.inOut",
        }, 0);

        // 2. Subtext Shift
        tl.to(".hero-desc", {
            color: "#1a1a1a",
            opacity: 1,
            y: 0,
            ease: "power2.inOut",
        }, 0);

        // 3. Grid Lines Light Up
        tl.to(".hero-grid-line", {
            backgroundColor: "#ccff00", // Storm Lime
            opacity: 1,
            stagger: 0.1,
            ease: "power1.out",
        }, 0);

        // 4. Grid Cells Pulse
        tl.to(".hero-grid-cell", {
            backgroundColor: "rgba(224, 229, 236, 1)", // Back to base
            boxShadow: "inset 4px 4px 8px #a3b1c6, inset -4px -4px 8px #ffffff", // Pressed look
            stagger: {
                amount: 1,
                grid: [4, 4],
                from: "random"
            }
        }, 0);

    }, { scope: mainRef });

    return (
        <main ref={mainRef} className="relative w-full isolate bg-[#e0e5ec]">

            {/* NEW HERO SECTION WITH SCROLL MOTION */}
            <div ref={heroRef} className="h-screen w-full relative flex items-center justify-center overflow-hidden bg-[#e0e5ec]">

                {/* DECORATIVE GRID BACKGROUND */}
                <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-6 grid-rows-6 opacity-30 pointer-events-none">
                    {Array.from({ length: 36 }).map((_, i) => (
                        <div key={i} className="hero-grid-cell border border-agency-black/5 flex items-center justify-center transition-all duration-500">
                            {/* Randomly placed dots for texture */}
                            {i % 3 === 0 && <div className="w-1 h-1 bg-agency-black/10 rounded-full"></div>}
                        </div>
                    ))}
                </div>

                {/* HORIZONTAL GRID LINES */}
                <div className="absolute top-1/3 left-0 w-full h-[1px] bg-agency-black/10 hero-grid-line opacity-20"></div>
                <div className="absolute top-2/3 left-0 w-full h-[1px] bg-agency-black/10 hero-grid-line opacity-20"></div>

                {/* VERTICAL GRID LINES */}
                <div className="absolute top-0 left-1/4 h-full w-[1px] bg-agency-black/10 hero-grid-line opacity-20"></div>
                <div className="absolute top-0 right-1/4 h-full w-[1px] bg-agency-black/10 hero-grid-line opacity-20"></div>


                <div className="relative z-10 text-center px-4 max-w-[90vw] mx-auto">
                    {/* CREATIVE OVERLAY TEXT */}
                    <div className="relative inline-block mb-8">
                        {/* Large "STORM" overlaying grid */}
                        <h1 className="hero-text text-[20vw] font-display font-black text-neumorph-inset leading-[0.75] tracking-tighter uppercase cursor-default select-none relative z-20 mix-blend-hard-light">
                            STORM
                        </h1>
                        {/* "LAB" positioned creatively */}
                        <h1 className="hero-text text-[20vw] font-display font-black text-neumorph-inset leading-[0.75] tracking-tighter uppercase cursor-default select-none relative z-10 -mt-[4vw] ml-[25vw]">
                            LAB
                        </h1>
                    </div>

                    {/* DESCRIPTION TEXT */}
                    <p className="hero-desc text-agency-black/40 text-2xl md:text-4xl font-light font-sans max-w-4xl mx-auto leading-tight translate-y-12 opacity-50">
                        We orchestrate digital chaos into <span className="font-bold">functional art</span>.
                        Defining the next era of web experience.
                    </p>
                </div>

                {/* SCROLL INDICATOR */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                    <span className="text-xs uppercase tracking-[0.3em] text-agency-black/40 mb-2">Initialize</span>
                    <div className="w-[1px] h-16 bg-agency-black/10 overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-full h-1/2 bg-storm-lime animate-bounce"></div>
                    </div>
                </div>
            </div>

            {/* SPACER FOR SCROLL LOGIC */}
            <div className="h-[20vh] w-full bg-[#e0e5ec]"></div>

            {/* 2. Studio Statement - Gradient Reveal */}
            <StudioStatement />

            {/* 4. Dynamic Expertise Sections - Slide over each other */}
            {expertises.map((expertise, index) => (
                <section
                    key={expertise.id}
                    className="sticky top-0 w-full min-h-screen overflow-hidden bg-[#e0e5ec] border-t border-white/40"
                    style={{ zIndex: 30 + index }} // Explicit stacking order: 30, 31, 32...
                >
                    <ExpertiseSection
                        id={expertise.id}
                        number={`0${index + 1}`}
                        title={expertise.title}
                        description={expertise.description}
                        link={expertise.link}
                        projects={expertise.projects}
                    />
                </section>
            ))}

            {/* 4. Capabilities & Footer - Final Layer */}
            {/* Stacking logic: If last expertise is z-34, this needs to be higher */}
            <section className="relative w-full min-h-screen bg-agency-black shadow-[0_-5px_20px_rgba(0,0,0,0.05)]" style={{ zIndex: 30 + expertises.length + 1 }}>
                <Capabilities />
                <Clients />
                <Testimonials />
                <FAQ />
            </section>
        </main>
    );
}
