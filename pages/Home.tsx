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

import ServicesSection from '../components/ServicesSection';

// Dummy Data for ExpertiseSection
const expertiseProjects = [
    { name: 'KINETIC', category: 'Fintech Mobile App', image: 'https://picsum.photos/seed/kinetic/800/600', url: '#' },
    { name: 'AURA', category: 'Luxury E-Commerce', image: 'https://picsum.photos/seed/aura/800/600', url: '#' },
    { name: 'SYNTH', category: 'AI SaaS Dashboard', image: 'https://picsum.photos/seed/synth/800/600', url: '#' },
    { name: 'NEXUS', category: 'Web3 Platform', image: 'https://picsum.photos/seed/nexus/800/600', url: '#' },
    { name: 'ECHO', category: 'Sonic Branding', image: 'https://picsum.photos/seed/echo/800/600', url: '#' },
    { name: 'FLUX', category: 'Automotive Interface', image: 'https://picsum.photos/seed/flux/800/600', url: '#' },
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

            <ServicesSection />
            <ExpertiseSection
                id="expertise"
                number="01"
                title="WHAT WE'RE WORKING ON"
                link="#"
            />

            {/* <GradientBlinds /> */}
            <PricingSection />
            <Clients />
            <Testimonials />
            <FAQ />
            {/* <Footer /> is likely initialized in Layout or App, but if not present here it might be needed? User only asked to reveal hidden ones. */}
        </div>
    );
}
