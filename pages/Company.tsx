import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Company() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%"
            }
        });

        tl.from(".fade-in", {
            y: 40,
            opacity: 0,
            stagger: 0.2,
            duration: 1,
            ease: "power3.out"
        });

        // Parallax for team images
        const teamImages = gsap.utils.toArray<HTMLElement>('.team-img-container');
        teamImages.forEach(img => {
            gsap.fromTo(img.querySelector('img'),
                { scale: 1.2 },
                {
                    scale: 1,
                    scrollTrigger: {
                        trigger: img,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                }
            );
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="min-h-screen bg-agency-black pt-[81.6667px] pb-[80px]">
            <div className="ml-auto mr-auto max-w-[1320px] px-[65.3333px]">
                <h1 className="font-medium text-[67.64px] tracking-[-4.7348px] leading-[62.2998px] mb-[60px] fade-in text-white">
                    About StormLab
                </h1>

                <div className="flex flex-wrap -mx-[16.3333px] mb-[80px] fade-in">
                    <div className="w-[50%] px-[16.3333px]">
                        <p className="text-[28.48px] leading-[31.15px] font-medium mb-[30px] text-white">
                            We are a digital agency focused on delivering quality and performance.
                        </p>
                        <p className="text-[14.24px] leading-[20px] mb-[20px] text-white/70">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <p className="text-[14.24px] leading-[20px] text-white/70">
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                    <div className="w-[50%] px-[16.3333px]">
                        <div className="w-full h-[400px] bg-white/5 border border-white/10 flex items-center justify-center">
                            <span className="text-white/20">Office Image Placeholder</span>
                        </div>
                    </div>
                </div>

                <h2 className="font-medium text-[40px] tracking-[-1px] mb-[40px] fade-in text-white">Our Team</h2>
                <div className="flex flex-wrap -mx-[16.3333px] fade-in">
                    {[1, 2, 3].map((member) => (
                        <div key={member} className="w-[33.33%] px-[16.3333px]">
                            <div className="team-img-container w-full aspect-[3/4] bg-white/5 border border-white/10 mb-[20px] flex items-center justify-center relative group overflow-hidden">
                                <span className="text-white/20 group-hover:opacity-0 transition-opacity">Member {member}</span>
                                <img src={`https://placehold.co/400x533/1a1a1a/FFFFFF?text=Member+${member}`} className="absolute top-0 left-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                            <h3 className="text-[18px] font-medium text-white group-hover:text-storm-lime transition-colors">Team Member Name</h3>
                            <p className="text-[14.24px] text-white/50">Position</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
