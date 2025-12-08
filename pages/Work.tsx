import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Clients from '../components/Clients';

export default function Work() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(".work-item", {
            y: 80,
            opacity: 0,
            scale: 0.95,
            stagger: 0.1,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%"
            }
        });
    }, { scope: containerRef });

    const works = [
        { title: "Market Evolution", cat: "Strategic Planning", img: "https://placehold.co/800x600/1a1a1a/FFFFFF?text=Strategy+Project" },
        { title: "Social Wave", cat: "Social Media", img: "https://placehold.co/800x600/1a1a1a/FFFFFF?text=Social+Campaign" },
        { title: "Search Dominance", cat: "SEO & Content", img: "https://placehold.co/800x600/1a1a1a/FFFFFF?text=SEO+Case" },
        { title: "Visual Identity System", cat: "Design", img: "https://placehold.co/800x600/1a1a1a/FFFFFF?text=Design+System" },
        { title: "Data Insights 2024", cat: "Analytics", img: "https://placehold.co/800x600/1a1a1a/FFFFFF?text=Analytics+Report" },
        { title: "Global Rebrand", cat: "Design & Strategy", img: "https://placehold.co/800x600/1a1a1a/FFFFFF?text=Rebrand+Project" },
    ];

    return (
        <div ref={containerRef} className="min-h-screen bg-agency-black pt-[81.6667px] pb-[80px]">
            <div className="ml-auto mr-auto max-w-[1320px] px-[65.3333px]">
                <h1 className="font-medium text-[67.64px] tracking-[-4.7348px] leading-[62.2998px] mb-[60px] text-white">
                    Selected Work
                </h1>

                <div className="flex flex-wrap -mx-[16.3333px]">
                    {works.map((work, idx) => (
                        <div key={idx} className="work-item w-[50%] px-[16.3333px] mb-[60px]">
                            <div className="group cursor-pointer">
                                <div className="overflow-hidden relative w-full aspect-[2/1] bg-white/5 mb-[14.7px]">
                                    <img
                                        src={work.img}
                                        alt={work.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <p className="mb-[8px] text-[14.24px] font-medium text-white group-hover:text-storm-lime transition-colors">{work.title}</p>
                                <p className="text-white/50 text-[14.24px]">{work.cat}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Clients />
        </div>
    );
}
