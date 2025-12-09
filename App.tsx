import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';

import Header from './components/Header';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';

import Home from './pages/Home';
import Services from './pages/Services';
import Work from './pages/Work';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import About from './pages/About';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

export default function App() {
    const mainRef = useRef<HTMLDivElement>(null);

    // Initialize Lenis for Smooth Scrolling
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <Router>
            <ScrollToTop />
            <div
                ref={mainRef}
                className="min-h-screen text-agency-black text-[10px] leading-[11.5px] font-serif w-full"
            >
                <div className="w-full bg-white text-agency-black text-[16.91px] tracking-[-0.8455px] leading-[19.5799px] min-h-[640px] font-sans flex flex-col">

                    <Header />

                    <main>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/services" element={<Services />} />
                            <Route path="/work" element={<Work />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/blog" element={<Blog />} />
                            <Route path="/contact" element={<Contact />} />
                            {/* Fallback */}
                            <Route path="*" element={<Home />} />
                        </Routes>
                    </main>

                    <Footer />
                    <CookieConsent />
                </div>
            </div>
        </Router>
    );
}
