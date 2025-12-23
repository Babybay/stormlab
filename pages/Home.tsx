import React from 'react';
import Hero from '../components/Hero';
import StudioStatement from '../components/StudioStatement';
import ExpertiseSection from '../components/ExpertiseSection';
import Capabilities from '../components/Capabilities';
import Clients from '../components/Clients';
import FAQ from '../components/FAQ';
import Testimonials from '../components/Testimonials';

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
    return (
        <main className="relative w-full isolate">
            {/* 1. Hero */}
            <section className="w-full h-screen overflow-hidden bg-agency-black border-b border-agency-black/5 z-10 relative">
                <Hero />
            </section>

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
