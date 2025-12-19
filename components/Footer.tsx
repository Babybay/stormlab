import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import TextPressure from './TextPressure';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Link Stagger
    gsap.from(".footer-link-group", {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      delay: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%"
      }
    });

  }, { scope: containerRef });

  return (
    <footer ref={containerRef} className="relative bg-white pt-[60px] flex flex-col justify-between overflow-hidden z-10 border-t border-agency-black/10">

      <div className="ml-auto mr-auto w-full max-w-[1320px] px-[65.33px] mb-[60px]">
        {/* Top: Minimal Grid */}
        <div className="flex flex-wrap justify-between items-start pt-[20px]">

          {/* Column 1: Copyright */}
          <div className="footer-link-group w-full sm:w-1/2 md:w-auto mb-8 md:mb-0 order-1 md:order-1">
            <span className="block text-[14px] text-agency-black/40">© 2025 StormLab Agency.</span>
            <span className="block text-[14px] text-agency-black/40 mt-1">All Rights Reserved.</span>
          </div>

          {/* Column 2: Navigation */}
          <div className="footer-link-group w-1/2 sm:w-1/4 md:w-auto pr-8 order-2 md:order-2 mb-8 md:mb-0">
            <h4 className="text-[12px] uppercase tracking-wider text-agency-black/40 mb-4">Explore</h4>
            <ul className="space-y-2">
              {['Work', 'Services', 'Agency', 'Insights'].map(item => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase() === 'agency' ? 'company' : item.toLowerCase() === 'insights' ? 'blog' : item.toLowerCase()}`}
                    className="text-[16px] font-medium text-agency-black hover:text-agency-black/60 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Socials */}
          <div className="footer-link-group w-1/2 sm:w-1/4 md:w-auto order-3 md:order-3 mb-8 md:mb-0">
            <h4 className="text-[12px] uppercase tracking-wider text-agency-black/40 mb-4">Connect</h4>
            <ul className="space-y-2">
              {[
                { name: 'Instagram', href: 'https://instagram.com/stormlab.creative' },
                // { name: 'Twitter/X', href: '#' },
                // { name: 'LinkedIn', href: '#' },
                { name: 'Email', href: 'mailto:stormlab.creative@gmail.com' }
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-[16px] font-medium text-agency-black hover:text-agency-black/60 transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Location/CTA Small */}
          <div className="footer-link-group w-full sm:w-1/2 md:w-auto mt-0 md:mt-0 md:text-right order-4 md:order-4">
            <p className="text-[16px] font-medium mb-1">Bali, Indonesia</p>
            <a href="mailto:hello@stormlab.agency" className="text-[16px] text-agency-black/40 hover:text-agency-black transition-colors">hello@stormlab.agency</a>
          </div>

        </div>
      </div>

      {/* Bottom: Massive CTA/Brand - Full Width */}
      <div className="w-full h-[300px] mb-[40px] px-4 md:px-10 mt-[auto] overflow-hidden relative z-50">
        <TextPressure
          text="StormLab."
          flex={true}
          alpha={false}
          stroke={false}
          width={true}
          weight={true}
          italic={true}
          textColor="#0F1115"
          minFontSize={36}
        />
      </div>

    </footer>
  );
}