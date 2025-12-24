import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import StudioStatement from '../components/StudioStatement';
import ExpertiseSection from '../components/ExpertiseSection';
import Capabilities from '../components/Capabilities';
import PricingSection from '../components/PricingSection';
import Clients from '../components/Clients';
import FAQ from '../components/FAQ';
import Testimonials from '../components/Testimonials';
import { client, urlFor } from '../lib/sanity'; // Import Sanity client

const initialExpertises = [
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
    }
];

export default function Home() {
    // 1. Initialize with defaul structure (Title, Description, Links)
    const [expertises, setExpertises] = useState<any[]>(initialExpertises);

    useEffect(() => {
        // 2. Fetch ALL Highlighted Projects
        const query = `*[_type == "project" && "Highlight" in tags] | order(_createdAt desc) {
            title,
            serviceCategory,
            "category": tags[0],
            mainImage,
            "slug": slug.current
        }`;

        client.fetch(query).then((projects) => {
            if (!projects || projects.length === 0) return;

            // 3. Map Projects to Sections
            const updatedExpertises = initialExpertises.map((section) => {
                // Find projects that match this section's ID (e.g., 'strategic-planning')
                const sectionProjects = projects.filter((p: any) => p.serviceCategory === section.id);

                // If backend projects exist for this category, use them.
                // Otherwise fall back to default (or empty if preferred, currently keeping default for demo).
                if (sectionProjects.length > 0) {
                    return {
                        ...section,
                        projects: sectionProjects.map((proj: any) => ({
                            name: proj.title,
                            category: proj.category || 'Project',
                            image: proj.mainImage ? urlFor(proj.mainImage).url() : 'https://placehold.co/800x600/1a1a1a/FFFFFF?text=No+Image',
                            url: `/work/${proj.slug}`
                        }))
                    };
                }
                return section; // Keep default if no backend projects
            });

            setExpertises(updatedExpertises);
        }).catch(console.error);
    }, []);
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

            {/* 4. Capabilities - Final Layer */}
            {/* Stacking logic: If last expertise is z-34, this needs to be higher */}
            <section className="relative w-full min-h-screen bg-[#e0e5ec] shadow-[0_-5px_20px_rgba(0,0,0,0.05)]" style={{ zIndex: 30 + expertises.length + 1 }}>
                <Capabilities />
            </section>

            {/* 5. Pricing Section - Standalone */}
            <section className="relative w-full" style={{ zIndex: 30 + expertises.length + 2 }}>
                <PricingSection />
            </section>

            {/* 6. Clients, Testimonials, FAQ */}
            <section className="relative w-full bg-agency-black" style={{ zIndex: 30 + expertises.length + 3 }}>
                <Clients />
                <Testimonials />
                <FAQ />
            </section>
        </main>
    );
}
