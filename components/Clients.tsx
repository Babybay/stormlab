import React from 'react';
import LogoLoop from './LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';

const techLogos = [
    { node: <SiReact />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
]

export default function Clients() {
    return (
        <section className="bg-storm-lime py-5 border-y border-agency-black">
            <div className="w-full text-agency-black opacity-100 hover:opacity-80 transition-opacity duration-500">
                <LogoLoop
                    logos={techLogos}
                    speed={50}
                    gap={80}
                    logoHeight={80}
                    pauseOnHover={true}
                />
            </div>
        </section>
    );
}
