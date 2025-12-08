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
    <section ref={sectionRef} id={id} className="-mt-px relative bg-white min-h-[calc(100vh-60px)] border-b border-agency-black/5 z-[1]">
      <div className="flex flex-col h-full min-h-[calc(100vh-60px)]">
        {/* Sticky Header within the section */}
        <div className="sticky top-[40.83px] z-[20] bg-white border-t border-agency-black/10 py-[13.88px]">
          <div className="ml-auto mr-auto max-w-[1320px] px-[65.33px]">
          </div>
        </div>

        {/* Content Container */}
        <div className="ml-auto mr-auto max-w-[1320px] px-[20px] md:px-[65.33px] pb-[61.25px] flex-grow relative">

          {/* Sticky Description Row */}
          <div className="sticky top-[70px] z-[10] flex flex-wrap -mx-[16.33px] pt-[40.83px] pb-[20.41px] pointer-events-none">
            <div className="w-full md:w-[50%] md:ml-[25%] px-[16.33px] order-1 pointer-events-auto mb-8 md:mb-0">
              <h2 className="font-medium text-[32px] md:text-[42px] leading-[1.1] pb-[20px] md:pb-[34.7px]">{title}</h2>
              <p className="max-w-[385px] text-[16px] leading-relaxed">{description}</p>
            </div>
            <div className="w-full md:w-[25%] px-[16.33px] pointer-events-auto mb-8 md:mb-0">
              <div className="flex items-center group cursor-pointer">
                <div className="w-[40px] h-[40px] mr-[14.29px] bg-agency-black text-white rounded-full flex items-center justify-center text-[16px] font-medium">
                  {number}
                </div>
                <a href={link} className="h-[40px] px-[20px] bg-agency-black/5 rounded-full flex items-center text-[14px] group-hover:bg-agency-black group-hover:text-white transition-colors duration-300">
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
                {/* Bg white on items to ensure cover */}
                <div className="relative group cursor-pointer bg-white">
                  <a href={project.url} className="block overflow-hidden relative w-full aspect-[2/1]">
                    <div className="size-full overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="project-image block w-full h-full object-cover transition-transform duration-700"
                      />
                    </div>
                    {/* Hover Overlay Button */}
                    <div className="absolute right-[32px] bottom-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <div className="w-[24.5px] h-[24.5px] bg-agency-black rounded-full flex items-center justify-center text-white">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </div>
                    </div>
                  </a>
                  <div className="mt-[14.7px] bg-white">
                    <p className="mb-[8px] text-[14.24px] font-medium">{project.name}</p>
                    <p className="text-agency-black/50 text-[14.24px]">{project.category}</p>
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