import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CardNav, { CardNavItem } from './CardNav';
import NavTicker from './NavTicker';

gsap.registerPlugin(ScrollTrigger);

import { useLocation } from 'react-router-dom';

export default function Header() {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isContact = location.pathname === '/contact';

  useGSAP(() => {
    if (isContact) return; // Skip GSAP if contact

    if (isHome) {
      // Set initial state for animation
      gsap.set(containerRef.current, { y: -150, autoAlpha: 0, xPercent: -50 });

      gsap.to(containerRef.current, {
        y: 0,
        autoAlpha: 1,
        xPercent: -50,
        duration: 0.6,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: "body",
          start: "640px top",
          toggleActions: "play none none reverse",
        }
      });
    } else {
      // Ensure visible and interactive on other pages
      gsap.set(containerRef.current, { y: 0, autoAlpha: 1, xPercent: -50 });
    }
  }, { scope: containerRef, dependencies: [location.pathname] });

  const navItems: CardNavItem[] = [
    {
      label: 'Expertise',
      bgColor: '#ffffff',
      textColor: '#000000',
      links: [
        { label: 'Strategic Planning', href: '/services', ariaLabel: 'Strategic Planning' },
        { label: 'Social Media Planning', href: '/services', ariaLabel: 'Social Media Planning' },
        { label: 'SEO & Content Marketing', href: '/services', ariaLabel: 'SEO & Content Marketing' },
        { label: 'Design and Graphics', href: '/services', ariaLabel: 'Design and Graphics' },
      ],
    },
    {
      label: 'Company',
      bgColor: '#ffffff',
      textColor: '#000000',
      links: [
        { label: 'Work', href: '/work', ariaLabel: 'Work' },
        { label: 'About', href: '/about', ariaLabel: 'About' },
        { label: 'Blog', href: '/blog', ariaLabel: 'Blog' },
      ],
    },
    {
      label: 'Connect',
      bgColor: '#ccff00',
      textColor: '#000000',
      links: [
        { label: 'Contact', href: '/contact', ariaLabel: 'Contact' },
      ],
    },
  ];

  if (isContact) return null;

  return (
    <div ref={containerRef} className="fixed left-1/2 -translate-x-1/2 w-[90%] max-w-[800px] z-[999] top-[1.2em] md:top-[2em] flex flex-col gap-2">
      <CardNav
        logo="StormLab."
        logoAlt="StormLab Logo"
        items={navItems}
        baseColor="#e0e5ec"
        menuColor="#000000"
        buttonBgColor="#000000"
        buttonTextColor="#ccff00"
        className="!relative !inset-auto !w-full !max-w-none !transform-none !top-auto !left-auto"
      />
      <NavTicker />
    </div>
  );
}
