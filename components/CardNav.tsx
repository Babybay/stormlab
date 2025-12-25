import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
// use your own icon import if react-icons is not available
import { GoArrowUpRight } from 'react-icons/go';
import { Link } from 'react-router-dom';

type CardNavLink = {
    label: string;
    href: string;
    ariaLabel: string;
};

export type CardNavItem = {
    label: string;
    bgColor: string;
    textColor: string;
    links: CardNavLink[];
};

export interface CardNavProps {
    logo: string;
    logoAlt?: string;
    items: CardNavItem[];
    className?: string;
    ease?: string;
    baseColor?: string;
    menuColor?: string;
    buttonBgColor?: string;
    buttonTextColor?: string;
}

const CardNav: React.FC<CardNavProps> = ({
    logo,
    logoAlt = 'Logo',
    items,
    className = '',
    ease = 'power3.out',
    baseColor = '#fff',
    menuColor,
    buttonBgColor,
    buttonTextColor
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const navRef = useRef<HTMLDivElement | null>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);

    // Animation Constants
    const ANIM_DURATION = 0.4;
    const STAGGER = 0.08;

    const calculateHeight = () => {
        const navEl = navRef.current;
        if (!navEl) return 260;

        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        if (isMobile) {
            const contentEl = navEl.querySelector('.card-nav-content') as HTMLElement;
            if (contentEl) {
                // Measure naturally
                const totalHeight = 60 + contentEl.scrollHeight + 16; // 60(top) + content + 16(padding)
                return totalHeight;
            }
        }
        return 260; // Desktop height
    };

    // Handle Animation based on State
    useLayoutEffect(() => {
        const navEl = navRef.current;
        const cards = cardsRef.current;

        if (!navEl) return;

        const ctx = gsap.context(() => {
            if (isExpanded) {
                // OPEN ANIMATION
                const height = calculateHeight();

                gsap.to(navEl, {
                    height: height,
                    duration: ANIM_DURATION,
                    ease: ease
                });

                gsap.to(cards, {
                    y: 0,
                    opacity: 1,
                    duration: ANIM_DURATION,
                    ease: ease,
                    stagger: STAGGER,
                    delay: 0.1 // Slight delay after container starts opening
                });
            } else {
                // CLOSE ANIMATION
                gsap.to(navEl, {
                    height: 60,
                    duration: ANIM_DURATION,
                    ease: ease
                });

                gsap.to(cards, {
                    y: 20,
                    opacity: 0,
                    duration: ANIM_DURATION / 2, // Faster exit
                    ease: ease,
                    stagger: { amount: 0.1, from: "end" } // Reverse stagger
                });
            }
        }, navRef); // Scope to navRef

        return () => ctx.revert(); // Cleanup GSAP context on unmount or state change? 
        // Actually, reverting on every toggle might jump the animation. 
        // Better to NOT revert, but just let GSAP overwrite. 
        // So I'll remove the revert for smooth toggling, OR use a ref to store tween.
        // Simple "gsap.to" overwrites automatically. 

    }, [isExpanded, ease]);

    const toggleMenu = () => {
        setIsExpanded(prev => !prev);
    };

    // Helper for cards ref
    const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
        if (el) cardsRef.current[i] = el;
    };

    return (
        <div
            className={`card-nav-container fixed left-1/2 -translate-x-1/2 w-[90%] max-w-[800px] z-[999] top-[1.2em] md:top-[2em] ${className}`}
        >
            <nav
                ref={navRef}
                className={`card-nav ${isExpanded ? 'open' : ''} block h-[60px] p-0 rounded-xl shadow-md relative overflow-hidden will-change-[height]`}
                style={{ backgroundColor: baseColor }}
            >
                <div className="card-nav-top absolute inset-x-0 top-0 h-[60px] flex items-center justify-between p-2 pl-[1.1rem] z-[2]">
                    <div
                        className={`hamburger-menu ${isExpanded ? 'open' : ''} group h-full flex flex-col items-center justify-center cursor-pointer gap-[6px] order-2 md:order-none relative z-50`}
                        onClick={toggleMenu}
                        role="button"
                        aria-label={isExpanded ? 'Close menu' : 'Open menu'}
                        tabIndex={0}
                        style={{ color: menuColor || '#000' }}
                    >
                        <div
                            className={`hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] ${isExpanded ? 'translate-y-[4px] rotate-45' : ''
                                } group-hover:opacity-75`}
                        />
                        <div
                            className={`hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] ${isExpanded ? '-translate-y-[4px] -rotate-45' : ''
                                } group-hover:opacity-75`}
                        />
                    </div>

                    <div className="logo-container flex items-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 order-1 md:order-none">
                        <Link to="/" className="text-[24px] font-bold tracking-tighter hover:opacity-70 transition-opacity no-underline" style={{ color: menuColor || '#000' }}>
                            {logo}
                        </Link>
                    </div>

                    <Link
                        to="/contact"
                        className="card-nav-cta-button hidden md:inline-flex border-0 rounded-[calc(0.75rem-0.2rem)] w-32 items-center h-full font-medium cursor-pointer transition-colors duration-300 relative overflow-hidden group/btn"
                        style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
                    >
                        <div className="relative w-full h-full flex flex-col items-center justify-center transition-transform duration-300 group-hover/btn:-translate-y-full">
                            <span className="flex items-center justify-center h-full w-full">Get Started</span>
                            <span className="absolute top-full left-0 w-full h-full flex items-center justify-center">Get Started</span>
                        </div>
                    </Link>
                </div>

                <div
                    className={`card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-2 flex flex-col items-stretch gap-2 justify-start z-[1] ${isExpanded ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
                        } md:flex-row md:items-end md:gap-[12px]`}
                    aria-hidden={!isExpanded}
                >
                    {(items || []).slice(0, 3).map((item, idx) => (
                        <div
                            key={`${item.label}-${idx}`}
                            className="nav-card select-none relative flex flex-col gap-2 p-[12px_16px] rounded-[calc(0.75rem-0.2rem)] min-w-0 flex-[1_1_auto] h-auto min-h-[60px] md:h-full md:min-h-0 md:flex-[1_1_0%]"
                            ref={setCardRef(idx)}
                            style={{ backgroundColor: item.bgColor, color: item.textColor }}
                        >
                            <div className="nav-card-label font-normal tracking-[-0.5px] text-[18px] md:text-[22px]">
                                {item.label}
                            </div>
                            <div className="nav-card-links mt-auto flex flex-col gap-[2px]">
                                {item.links?.map((lnk, i) => (
                                    <Link
                                        key={`${lnk.label}-${i}`}
                                        className="nav-card-link inline-flex items-center gap-[6px] no-underline cursor-pointer transition-opacity duration-300 hover:opacity-75 text-[15px] md:text-[16px]"
                                        to={lnk.href}
                                        aria-label={lnk.ariaLabel}
                                        onClick={toggleMenu} // Close on click for mobile/UX
                                    >
                                        <GoArrowUpRight className="nav-card-link-icon shrink-0" aria-hidden="true" />
                                        {lnk.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default CardNav;
