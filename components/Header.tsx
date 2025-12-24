
import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { FiMenu, FiX, FiChevronRight } from 'react-icons/fi';

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLUListElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

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
    if (window.innerWidth < 1024) return; // Disable hover effects on tablet/mobile

    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    // 1. Header Expansion
    gsap.to(headerRef.current, {
      height: 380,
      backgroundColor: "#e0e5ec", // Light Theme
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
      gsap.killTweensOf(menuItemsRef.current.children);
      gsap.fromTo(menuItemsRef.current.children,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.03,
          duration: 0.3,
          delay: 0.1,
          ease: "power2.out"
        }
      );
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth < 1024) return;

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
        backgroundColor: "#e0e5ec", // Light Theme
        duration: 0.3,
        ease: "power3.inOut",
        delay: 0.1
      });

      if (menuItemsRef.current) {
        gsap.to(menuItemsRef.current.children, { opacity: 0, duration: 0.1 });
      }
    }, 50);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header ref={headerRef} className="fixed w-full h-[60px] left-0 top-0 bg-[#e0e5ec] z-[999] text-agency-black shadow-sm transition-colors duration-300">
        <div className="relative top-0 pt-[15px] pb-[15px] after:h-px after:absolute after:w-full after:left-0 after:right-0 after:bottom-0 after:bg-agency-black/10 after:content-['']">
          <div className="mx-auto w-full max-w-[1320px] px-6 lg:px-[65px]">
            <div className="flex items-center justify-between">

              {/* Logo */}
              <div className="z-[1001] relative">
                <Link to="/" className="text-[24px] font-bold tracking-tighter hover:opacity-70 transition-opacity">
                  StormLab.
                </Link>
              </div>

              {/* Desktop Nav Group */}
              <div className="hidden lg:flex items-center space-x-12">

                {/* Expertise Dropdown Trigger */}
                <div
                  className="relative z-[60] h-full flex items-center"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="group cursor-pointer items-center flex text-[16px] tracking-tight">
                    <span className="group-hover:opacity-70 transition-opacity font-medium">
                      Expertise
                    </span>
                    <div ref={arrowRef} className="ml-2 w-[18px] h-[18px] rounded-full bg-agency-black flex items-center justify-center text-white">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                  </div>

                  {/* Desktop Dropdown Menu */}
                  <div
                    ref={dropdownRef}
                    className="absolute left-[-20px] top-[45px] pt-4 w-[400px] opacity-0 invisible"
                  >
                    <ul ref={menuItemsRef} className="flex flex-col space-y-3">
                      {[
                        "Strategic Planning",
                        "Social Media Planning",
                        "SEO & Content Marketing",
                        "Design and Graphics"
                      ].map((item, idx) => (
                        <li key={idx} className="overflow-hidden">
                          <Link
                            to="/services"
                            className="block text-[24px] font-medium leading-tight tracking-tight hover:text-storm-lime transition-colors duration-300"
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Standard Links */}
                <nav>
                  <ul className="flex space-x-8">
                    {['Work', 'About', 'Blog', 'Contact'].map((item) => (
                      <li key={item}>
                        <Link to={`/${item.toLowerCase()}`} className="text-[15px] font-medium tracking-tight hover:text-storm-lime transition-colors">
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* Mobile Hamburger */}
              <button
                className="lg:hidden z-[1001] p-2 text-agency-black"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>

            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#e0e5ec] z-[990] pt-24 px-6 transition-transform duration-500 ease-in-out lg:hidden flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <nav className="flex flex-col space-y-6">
          <div className="border-b border-agency-black/10 pb-6">
            <span className="text-xs uppercase tracking-widest text-agency-black/40 mb-4 block">Menu</span>
            <ul className="space-y-4">
              {['Work', 'About', 'Blog', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className="text-3xl font-display font-medium text-agency-black block">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-agency-black/40 mb-4 block">Expertise</span>
            <ul className="space-y-3">
              {[
                "Strategic Planning",
                "Social Media Planning",
                "SEO & Content Marketing",
                "Design and Graphics"
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    to="/services"
                    className="text-lg font-medium text-agency-black/70 block flex items-center justify-between"
                  >
                    {item}
                    <FiChevronRight className="opacity-50" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}