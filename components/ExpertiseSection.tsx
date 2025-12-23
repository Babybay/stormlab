import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

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
    <section ref={sectionRef} id={id} className="-mt-px relative bg-[#e0e5ec] min-h-[calc(100vh-60px)] border-b border-white/40 z-[1]">
      <div className="flex flex-col h-full min-h-[calc(100vh-60px)]">
        {/* Sticky Header within the section */}
        <div className="sticky top-[40.83px] z-[20] bg-[#e0e5ec] border-t border-white/40 py-[13.88px]">
          <div className="ml-auto mr-auto max-w-[1320px] px-[65.33px]">
          </div>
        </div>

        {/* Content Container */}
        <div className="ml-auto mr-auto max-w-[1320px] px-[20px] md:px-[65.33px] pb-[61.25px] flex-grow relative">

          {/* Sticky Description Row */}
          <div className="sticky top-[70px] z-[10] flex flex-wrap -mx-[16.33px] pt-[40.83px] pb-[20.41px] pointer-events-none">
            <div className="w-full md:w-[50%] md:ml-[25%] px-[16.33px] order-1 pointer-events-auto mb-8 md:mb-0 text-agency-black">
              <h2 className="font-medium text-[32px] md:text-[42px] leading-[1.1] pb-[20px] md:pb-[34.7px]">{title}</h2>
              <p className="max-w-[385px] text-[16px] leading-relaxed text-agency-black/60">{description}</p>
            </div>
            <div className="w-full md:w-[25%] px-[16.33px] pointer-events-auto mb-8 md:mb-0">
              <div className="flex items-center group cursor-pointer">
                <div className="w-[40px] h-[40px] mr-[14.29px] bg-[#e0e5ec] text-storm-lime border border-storm-lime rounded-full flex items-center justify-center text-[16px] font-medium shadow-[5px_5px_10px_#a3b1c6,-5px_-5px_10px_#ffffff]">
                  {number}
                </div>
                <a href={link} className="h-[40px] px-[20px] bg-[#e0e5ec] border border-white rounded-full flex items-center text-[14px] text-agency-black hover:text-storm-lime hover:border-storm-lime transition-all duration-300 shadow-[5px_5px_10px_#a3b1c6,-5px_-5px_10px_#ffffff]">
                  Learn More
                </a>
              </div>
            </div>
          </div>

          {/* Projects Grid - Scrolls over the sticky description */}
          <div className="relative z-[15] flex flex-wrap mt-[20px] -mx-[16.33px] bg-transparent">
            {/* Spacer to allow initial view of sticky text before projects cover it */}
            <div className="w-full h-[15px]"></div>
            {projects.map((project, idx) => (
              <div key={idx} className="project-item w-full md:w-[50%] px-[16.33px] mt-[40px] md:mt-0 pb-4">
                {/* Bg light on items to ensure cover */}
                <div className="relative group cursor-pointer bg-[#e0e5ec] border border-white/40 rounded-[30px] p-4 shadow-[9px_9px_16px_rgb(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)] hover:shadow-[12px_12px_24px_rgb(163,177,198,0.6),-12px_-12px_24px_rgba(255,255,255,0.5)] transition-all duration-300">
                  <a href={project.url} className="block overflow-hidden relative w-full aspect-[2/1] rounded-[20px]">
                    <div className="size-full overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="project-image block w-full h-full object-cover transition-transform duration-700"
                      />
                    </div>
                    {/* Hover Overlay Button */}
                    <div className="absolute right-[32px] bottom-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <div className="w-[40px] h-[40px] bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-storm-lime shadow-lg">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </div>
                    </div>
                  </a>
                  <div className="mt-[20px] px-2">
                    <p className="mb-[8px] text-[18px] font-medium text-agency-black group-hover:text-storm-lime transition-colors">{project.name}</p>
                    <p className="text-agency-black/50 text-[14px]">{project.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
