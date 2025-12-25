import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { client, urlFor } from '../lib/sanity';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  serviceCategory: string;
  mainImage: any;
  slug: { current: string };
}

interface ExpertiseProps {
  id: string;
  number: string;
  title: string;
  link: string;
}

export default function ExpertiseSection({ id, number, title, link }: ExpertiseProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await client.fetch(`*[_type == "project"]{
                title,
                serviceCategory,
                mainImage,
                slug
            }`);
        if (data && data.length > 0) {
          setProjects(data);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };
    fetchProjects();
  }, []);

  useGSAP(() => {
    // Simple, foolproof animation: just fade in slightly when section is reached
    // but default to visible immediately if triggered
    if (projects.length > 0) {
      gsap.fromTo('.project-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%", // Triggers earlier
          }
        }
      );
    }
  }, { scope: sectionRef, dependencies: [projects] });

  return (
    <section ref={sectionRef} id={id} className="relative w-full bg-[#e0e5ec] min-h-screen">

      <div className="flex flex-col lg:flex-row max-w-[1600px] mx-auto">

        {/* Left Column - Sticky Header */}
        <div className="w-full lg:w-5/12 relative">
          <div className="relative lg:sticky top-0 h-auto lg:h-screen flex flex-col justify-center px-6 py-20 lg:p-20">

            <h2 className="font-display font-black text-agency-black/90 uppercase leading-[0.9] tracking-tighter mb-8"
              style={{
                fontSize: 'clamp(3rem, 9vw, 8rem)',
                textShadow: '-4px -4px 8px rgba(255,255,255,0.6), 4px 4px 8px rgba(163,177,198,0.6)'
              }}>
              WHAT<br />
              WE'RE<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-agency-black to-agency-black/40">WORKING</span><br />
              ON
            </h2>

            <p className="font-sans text-lg text-agency-black/70 max-w-md leading-relaxed mb-12">
              A curated selection of our most recent digital products, brand identities, and strategic partnerships.
            </p>

            <a href={link} className="inline-flex items-center gap-3 group">
              <span className="w-14 h-14 rounded-full border border-agency-black/20 flex items-center justify-center group-hover:bg-agency-black group-hover:text-white transition-all duration-300">
                <ArrowUpRight strokeWidth={1.5} className="transition-transform duration-300 group-hover:rotate-45" />
              </span>
              <span className="font-display font-bold uppercase tracking-widest text-sm text-agency-black group-hover:opacity-60 transition-opacity">View All Archives</span>
            </a>

          </div>
        </div>

        {/* Right Column - Scrollable Gallery */}
        <div className="w-full lg:w-7/12 px-4 py-20 lg:py-32 lg:pr-20">
          <div className="flex flex-col gap-12 lg:gap-24">
            {projects.map((project, idx) => (
              <div key={idx} className="project-card group relative w-full aspect-[4/3] md:aspect-[16/10] rounded-[2rem] overflow-hidden bg-white shadow-xl cursor-pointer">
                <a href={project.slug?.current ? `/projects/${project.slug.current}` : '#'} className="block w-full h-full">

                  {/* Image Container */}
                  <div className="absolute inset-0 overflow-hidden">
                    {project.mainImage && (
                      <img
                        src={urlFor(project.mainImage).width(800).auto('format').url()}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                      />
                    )}
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40"></div>
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 flex flex-col justify-end items-start transition-transform duration-500">
                    <div className="overflow-hidden mb-2">
                      <div className="transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-100">
                        <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/10 text-white text-xs font-bold uppercase tracking-wider mb-2">
                          {project.serviceCategory?.replace('-', ' ')}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white uppercase leading-none mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {project.title}
                    </h3>

                    <div className="w-full h-[1px] bg-white/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                  </div>

                </a>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
