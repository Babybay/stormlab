import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLUListElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useGSAP(() => {
    gsap.from(headerRef.current, {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.2
    });
  }, { scope: headerRef });

  const handleMouseEnter = () => {
    // Clear any pending close timer if re-entering
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    // 1. Header Expansion & Background
    gsap.to(headerRef.current, {
      height: 380,
      backgroundColor: "#000000",
      duration: 0.3,
      ease: "power3.inOut"
    });

    // 2. Dropdown Visibility
    gsap.to(dropdownRef.current, {
      autoAlpha: 1,
      duration: 0.1,
      delay: 0
    });

    // 3. Arrow Rotation
    gsap.to(arrowRef.current, {
      rotation: 90,
      duration: 0.2,
      ease: "back.out(1.7)"
    });

    // 4. Staggered Menu Items Reveal
    if (menuItemsRef.current) {
      gsap.killTweensOf(menuItemsRef.current.children); // Kill any ongoing animations
      gsap.fromTo(menuItemsRef.current.children,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.03,
          duration: 0.3,
          delay: 0.1, // Slightly reduced delay for snappiness
          ease: "power2.out"
        }
      );
    }
  };

  const handleMouseLeave = () => {
    // Add delay to check if user really left or just crossing gap
    closeTimeoutRef.current = setTimeout(() => {
      // 1. Hide Dropdown
      gsap.to(dropdownRef.current, {
        autoAlpha: 0,
        duration: 0.1
      });

      // 2. Arrow Rotation Back
      gsap.to(arrowRef.current, {
        rotation: 0,
        duration: 0.2,
        ease: "power2.inOut"
      });

      // 3. Header Collapse
      gsap.to(headerRef.current, {
        height: 60,
        backgroundColor: "#000000",
        duration: 0.3,
        ease: "power3.inOut",
        delay: 0.1
      });

      // 4. Reset Menu Items (Optional cleanup)
      if (menuItemsRef.current) {
        gsap.to(menuItemsRef.current.children, { opacity: 0, duration: 0.1 });
      }
    }, 50); // 100ms bridge for the gap
  };

  return (
    <>
      <header ref={headerRef} className="fixed w-full h-[60px] left-0 top-0 bg-agency-black z-[999] overflow-visible text-white">
        <div className="relative top-0 pt-[15px] pb-[15px] after:h-px after:absolute after:w-full after:left-0 after:right-0 after:bottom-0 after:bg-white/10 after:content-['']">
          <div className="ml-auto mr-auto relative w-full max-w-[1320px] px-[65.3333px]">
            <div className="items-center flex flex-wrap -mx-[16.3333px]">
              {/* Logo */}
              <div className="w-1/6 px-[16.3333px]">
                <span className="items-center flex leading-[0px]">
                  <Link to="/" className="text-[24px] font-bold text-white tracking-tighter hover:opacity-70 transition-opacity">
                    StormLab.
                  </Link>
                </span>
              </div>

              {/* Expertise Dropdown Trigger */}
              <div
                className="w-1/6 ml-[8.33333%] px-[16.3333px] relative z-[60]"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="group cursor-pointer items-center flex max-w-max text-[16px] tracking-[-0.5696px] leading-[16px]">
                  <span className="items-center flex justify-center relative text-center align-middle whitespace-nowrap h-[24.5px] text-[15px] group-hover:opacity-70 transition-opacity">
                    Expertise
                  </span>
                  <div ref={arrowRef} className="ml-[8.16667px] w-[18px] h-[18px] rounded-full bg-white flex items-center justify-center text-agency-black">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </div>

                {/* Dropdown Menu */}
                <div
                  ref={dropdownRef}
                  className="absolute left-[-16.33px] top-[60px] px-[16.33px] pt-[30px] w-[500px] opacity-0 invisible"
                >
                  <ul ref={menuItemsRef} className="flex flex-col space-y-[12px]">
                    {[
                      "Strategic Planning",
                      "Social Media Planning",
                      "SEO & Content Marketing",
                      "Design and Graphics",
                      "Analytics & Reporting"
                    ].map((item, idx) => (
                      <li key={idx} className="overflow-hidden">
                        <Link
                          to="/services"
                          className="block text-[28px] font-medium leading-[1.2] tracking-[-1px] text-white hover:text-storm-lime transition-colors duration-300 relative group/link"
                        >
                          <span className="relative z-10">{item}</span>
                          <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-storm-lime transition-all duration-300 group-hover/link:w-full"></span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Navigation */}
              <div className="w-[41.6667%] ml-[16.6667%] px-[16.3333px]">
                <nav>
                  <ul className="flex justify-end space-x-[30px]">
                    {['Work', 'Company', 'Blog', 'Contact'].map((item) => (
                      <li key={item} className="items-center flex text-left">
                        <Link to={`/${item.toLowerCase()}`} className="block relative overflow-hidden h-[20px] group/nav text-[15px] tracking-[-0.52px]">
                          <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/nav:-translate-y-1/2">
                            <span className="h-[20px] flex items-center">{item}</span>
                            <span className="h-[20px] flex items-center">{item}</span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}