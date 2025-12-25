import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  name: string;
  category: string;
  image: string;
  url: string;
}

interface ExpertiseProps {
  id: string;
  number: string;
  title: string;
  description: string;
  link: string;
  projects: Project[];
}

export default function ExpertiseSection({ id, number, title, description, link, projects }: ExpertiseProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    // 1. Icon Rotation on Scroll
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        rotation: 360,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    }

    // 2. Parallax effect for images
    const images = gsap.utils.toArray<HTMLElement>('.project-image');
    images.forEach((img) => {
      gsap.fromTo(img,
        { scale: 1.1 },
        {
          scale: 1,
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5
          }
        }
      );
    });

    // 3. Reveal project items
    const items = gsap.utils.toArray<HTMLElement>('.project-item');
    gsap.from(items, {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      }
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id={id} className="-mt-px relative bg-[#e0e5ec] min-h-[calc(100vh-60px)] border-b border-white/40 z-[1] py-20">
      <div className="ml-auto mr-auto max-w-[1320px] px-[20px] md:px-[65.33px] relative h-full">

        <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">

          {/* Left Column: Sticky Title & Description */}
          <div className="w-full md:w-5/12 sticky top-32 z-20">
            <div className="flex items-center gap-4 mb-4">
              <span className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-agency-black text-agency-black font-display font-bold text-xl bg-transparent">
                {number}
              </span>
              <div className="h-[2px] w-12 bg-agency-black"></div>
            </div>

            <h2 className="font-display font-black text-6xl md:text-7xl lg:text-8xl text-agency-black uppercase leading-[0.9] tracking-tight mb-8">
              {title}
            </h2>

            <p className="font-sans text-lg md:text-xl text-agency-black/70 font-medium leading-relaxed max-w-md mb-10">
              {description}
            </p>

            <a href={link} className="inline-flex items-center gap-2 font-display font-bold text-agency-black uppercase tracking-widest text-sm hover:text-opacity-70 transition-all group">
              View All Projects
              <span className="w-8 h-8 rounded-full bg-agency-black text-white flex items-center justify-center transition-transform group-hover:translate-x-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </span>
            </a>
          </div>

          {/* Right Column: Projects Grid (Scrollable) */}
          <div className="w-full md:w-7/12 pt-0 md:pt-32">
            <div className="grid grid-cols-1 gap-12">
              {projects.map((project, idx) => (
                <div key={idx} className="project-item group">
                  <a href={project.url} className="block relative w-full aspect-[4/3] rounded-[30px] overflow-hidden border-2 border-agency-black/5 bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] transition-transform duration-500 hover:-translate-y-2">
                    <div className="absolute inset-0 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="project-image w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    {/* Overlay Details */}
                    <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between">
                      <div>
                        <p className="text-white font-sans text-sm uppercase tracking-wider mb-1">{project.category}</p>
                        <h3 className="text-white font-display font-bold text-3xl">{project.name}</h3>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-white text-agency-black flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="17" x2="17" y2="7"></line>
                          <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                      </div>
                    </div>
                  </a>
                  <div className="mt-4 flex justify-between items-center px-2 md:hidden">
                    <h3 className="text-agency-black font-display font-bold text-2xl">{project.name}</h3>
                    <p className="text-agency-black/50 font-sans text-sm">{project.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
