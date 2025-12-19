
import { useRef, useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import CircularText from './CircularText';

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

  return (
    <section ref={containerRef} className="relative w-full bg-[#e0e5ec] text-agency-black py-[120px] z-[70]">
      <div className="max-w-[1320px] mx-auto px-[20px] lg:px-[65px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

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
                    className={`capability-item group mb-6 rounded-[20px] px-8 py-8 cursor-pointer transition-all duration-300 border border-white/40 ${isOpen
                      ? 'bg-[#e0e5ec] shadow-[inset_5px_5px_10px_#a3b1c6,inset_-5px_-5px_10px_#ffffff]'
                      : 'bg-[#e0e5ec] shadow-[9px_9px_16px_rgb(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)] hover:-translate-y-1'}`}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-[28px] md:text-[40px] font-light tracking-tight transition-opacity duration-300 group-hover:opacity-70 text-agency-black">
                        {service.title}
                      </h3>

                      {/* Minimalist Arrow */}
                      <div className={`transform transition-transform duration-500 flex items-center justify-center ${isOpen ? 'rotate-90' : 'group-hover:-rotate-45'}`}>
                        <FiArrowRight className="w-6 h-6 md:w-8 md:h-8 text-agency-black opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>

                    {/* Accordion Content - Clean slide down */}
                    <div
                      className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0 mt-0'}`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-[18px] text-agency-black/60 font-light leading-relaxed max-w-lg">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}