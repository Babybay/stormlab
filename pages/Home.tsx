import React from 'react';
import Hero from '../components/Hero';
import MarqueeReveal from '../components/MarqueeReveal';
import StudioStatement from '../components/StudioStatement';
import Clients from '../components/Clients';
import ExpertiseSection from '../components/ExpertiseSection';
import GradientBlinds from '../components/GradientBlinds';
import Testimonials from '../components/Testimonials';
import LogoLoop from '../components/LogoLoop';
import PricingSection from '../components/PricingSection';
import FAQ from '../components/FAQ';

// Dummy Data for ExpertiseSection
const expertiseProjects = [
    { name: 'Neon Horizon', category: 'Web Development', image: 'https://picsum.photos/seed/neon/800/600', url: '#' },
    { name: 'Cyber Pulse', category: 'Brand Identity', image: 'https://picsum.photos/seed/cyber/800/600', url: '#' },
    { name: 'Quantum Flow', category: 'UI/UX Design', image: 'https://picsum.photos/seed/flow/800/600', url: '#' },
];

// Dummy Data for LogoLoop
const partnerLogos = [
    { src: 'https://via.placeholder.com/150x50?text=LOGO+1', alt: 'Partner 1' },
    { src: 'https://via.placeholder.com/150x50?text=LOGO+2', alt: 'Partner 2' },
    { src: 'https://via.placeholder.com/150x50?text=LOGO+3', alt: 'Partner 3' },
    { src: 'https://via.placeholder.com/150x50?text=LOGO+4', alt: 'Partner 4' },
    { src: 'https://via.placeholder.com/150x50?text=LOGO+5', alt: 'Partner 5' },
];

export default function Home() {
    return (
        <div className="w-full">
            <Hero />
            <MarqueeReveal />
            <StudioStatement />
            <ExpertiseSection
                id="expertise"
                number="01"
                title="OUR EXPERTISE"
                description="We combine strategy, design, and technology to build brands that lead."
                link="#"
                projects={expertiseProjects}
            />

            {/* <GradientBlinds /> */}
            <Testimonials />
            <Clients />
            <PricingSection />
            <FAQ />
            {/* <Footer /> is likely initialized in Layout or App, but if not present here it might be needed? User only asked to reveal hidden ones. */}
        </div>
    );
}
