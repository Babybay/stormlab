import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Premium Staggered Text Reveal
    tl.from(titleRef.current?.querySelectorAll('.char') || [], {
      yPercent: 100,
      opacity: 0,
      rotateX: -90,
      stagger: 0.03,
      duration: 1.5,
      ease: "power4.out",
      transformOrigin: "0% 50% -50"
    });

    // Description Text Stagger
    tl.from(textRef.current?.querySelectorAll('span') || [], {
      y: 30,
      opacity: 0,
      stagger: 0.015,
      duration: 1,
      ease: "power3.out"
    }, "-=1.0"); // Overlap slightly with title

    // Floating circle graphic animation (subtle parallax or float)
    const circle = textRef.current?.querySelector('.animate-spin-slow');
    if (circle) {
      gsap.from(circle, {
        scale: 0,
        rotation: -180,
        duration: 1.5,
        ease: "back.out(1.7)",
        delay: 0.5
      });
    }

  }, { scope: containerRef });

  const wrapChars = (str: string, colorClass: string) => {
    return str.split('').map((char, index) => (
      <span key={index} className={`inline-block char ${colorClass}`}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section ref={containerRef} className="relative min-h-[640px] pt-[90px] pb-[40.8333px] z-10">
      <div className="ml-auto mr-auto relative w-full h-[470.4px] max-w-[1320px] px-[65.3333px] flex flex-col">
        <div className="flex flex-wrap -mx-[16.3333px] pb-[40.8333px]">
          <div className="w-[83.3333%] px-[16.3333px]">
            <h1 ref={titleRef} className="font-medium text-[67.64px] tracking-[-4.7348px] leading-[62.2998px]">
              <span className="block mb-2">
                {wrapChars("Digital.", "text-white")}
                {wrapChars(" Branding.", "text-white")}
              </span>
              <span className="block">
                {wrapChars("StormLab.", "text-storm-lime")}
              </span>
            </h1>
          </div>
        </div>

        <div ref={textRef} className="items-end flex flex-wrap mt-auto -mx-[16.3333px]">
          <div className="w-[33.3333%] ml-[41.6667%] px-[16.3333px] order-1">
            <p className="text-[14.24px] leading-5 text-white">
              <span>We</span> <span>are</span> <span>a</span> <span>digital</span> <span>agency</span> <span>providing</span> <span>exceptional</span> <span>marketing,</span> <span>web</span> <span>development,</span> <span>and</span> <span>branding</span> <span>solutions.</span>
            </p>
          </div>
          <div className="w-[25%] px-[16.3333px]">
            <div className="w-full flex gap-2">
              <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.yourstory.com%2Fcs%2F7%2Fa09f22505c6411ea9c48a10bad99c62f%2FAnandjitRayPeripheralVapidSeries-1632330015975.png%3Ffm%3Dpng%26auto%3Dformat%26w%3D800&f=1&nofb=1&ipt=fad901b147e41d9bfaf019445748c40a5a987ece4548b936bf1ebb432e0b84ff" className="w-1/3 h-auto object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-300" alt="Surrealism 1" />
              <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.squarespace-cdn.com%2Fcontent%2Fv1%2F53ced4d0e4b0e38a2bb0b7a3%2F1639954060090-TF1X951Z8YIIOC44E7J8%2Fimage-asset.png&f=1&nofb=1&ipt=ef80e92e731750bed917ad447c1ed0baea75c4b5cf6d8230e230411d7bd57f4c" className="w-1/3 h-auto object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-300" alt="Surrealism 2" />
              <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fnews.viverse.com%2Fwp-content%2Fuploads%2F2025%2F09%2F1.Image-to-3D-case-study-2048x1458.png&f=1&nofb=1&ipt=4afdd5ab9453c0aa8972399e59f1a9f254c3f2c835a10b777be523d16825a5e3" className="w-1/3 h-auto object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-300" alt="Surrealism 3" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}