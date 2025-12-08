import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowRight } from 'react-icons/fi';
import CircularText from './CircularText';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Web & mobile apps",
    description: "Custom-built applications for iOS, Android, and web platforms with seamless performance. We focus on scalability and user experience."
  },
  {
    title: "UX & product design",
    description: "User-centric design strategies that drive engagement and solve complex problems. We prototype, test, and iterate to perfection."
  },
  {
    title: "Product development",
    description: "End-to-end development services from MVP to scalable enterprise solutions. Our engineering standards ensure reliability and speed."
  },
  {
    title: "Communication design",
    description: "Strategic visual communication that amplifies your brand's voice and message. Consistent, impactful, and memorable."
  }
];

export default function Capabilities() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useGSAP(() => {
    gsap.from(".capability-item", {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full bg-agency-black text-white py-[120px] z-[70]">
      <div className="max-w-[1320px] mx-auto px-[20px] lg:px-[65px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          {/* Left Column: Title & Image */}
          {/* Left Column: Circular Text */}
          <div className="lg:col-span-4 mb-10 lg:mb-0 relative">
            <div className="sticky top-24 flex justify-center lg:justify-start">
              <CircularText
                text="STORMY*CAPABILITIES*"
                onHover="speedUp"
                spinDuration={20}
                className="text-storm-lime"
              />
            </div>
          </div>

          {/* Right Column: Clean List */}
          <div className="lg:col-span-8">
            <div className="flex flex-col">
              {services.map((service, idx) => {
                const isOpen = activeIndex === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => toggleItem(idx)}
                    className="capability-item group border-t border-white/10 py-8 cursor-pointer transition-colors duration-300"
                  >
                    <div className="flex justify-between items-center px-4 md:px-0">
                      <h3 className="text-[28px] md:text-[40px] font-light tracking-tight transition-opacity duration-300 group-hover:opacity-70">
                        {service.title}
                      </h3>

                      {/* Minimalist Arrow */}
                      <div className={`transform transition-transform duration-500 flex items-center justify-center ${isOpen ? 'rotate-90' : 'group-hover:-rotate-45'}`}>
                        <FiArrowRight className="w-6 h-6 md:w-8 md:h-8 text-white opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>

                    {/* Accordion Content - Clean slide down */}
                    <div
                      className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0 mt-0'}`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-[18px] text-white/60 font-light leading-relaxed max-w-lg md:pl-0">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
              {/* Final Border */}
              <div className="border-t border-white/10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}