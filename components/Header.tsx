import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CardNav, { CardNavItem } from './CardNav';
import NavTicker from './NavTicker';

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(containerRef.current,
      { y: -150, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.6,
        ease: "back.out(1.4)", // Pop up effect
        scrollTrigger: {
          trigger: "body",
          start: "640px top", // Approximately after Hero section
          toggleActions: "play none none reverse",
        }
      }
    );
  }, { scope: containerRef });

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

  return (
    <div ref={containerRef} className="fixed left-1/2 -translate-x-1/2 w-[90%] max-w-[800px] z-[999] top-[1.2em] md:top-[2em] flex flex-col gap-2 invisible">
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
