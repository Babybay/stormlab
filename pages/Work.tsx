
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Light Neumorphic Card (Off-White)
const NeumorphicCardLight = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-[#e0e5ec] rounded-[30px] p-6 shadow-[9px_9px_16px_rgb(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)] border border-white/40 ${className}`}>
        {children}
    </div>
);

export default function Work() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [works, setWorks] = React.useState<any[]>([]);
    const [error, setError] = React.useState<string | null>(null);

    // Simple fade in, no complex motion
    useGSAP(() => {
        gsap.from(".work-item", {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%"
            }
        });
    }, { scope: containerRef, dependencies: [works] });

    React.useEffect(() => {
        import('../lib/sanity').then(({ client, urlFor }) => {
            client.fetch(`*[_type == "project"]{
                title,
                "cat": client,
                "img": mainImage,
                "slug": slug.current
            }`).then(data => {
                const formatted = data.map((d: any) => ({
                    ...d,
                    img: d.img ? urlFor(d.img).url() : "https://placehold.co/800x600/e0e5ec/000000?text=No+Image"
                }));
                // Sort? Sanity doesn't guarantee order unless specified.
                setWorks(formatted);
                setError(null);
            }).catch(err => {
                console.error(err);
                setError(err.message);
            });
        });
    }, []);

    return (
        <div ref={containerRef} className="min-h-screen bg-[#e0e5ec] font-sans selection:bg-storm-lime selection:text-black pb-32">

            {/* Nav placeholder if needed, but App.tsx handles Header. 
                However, existing Header might be styled for Dark mode (white text). 
                If Header is global and transparent, we might need to adjust it or 
                just accept it is visible against the light bg if it has a background.
                Assuming Header adapts or is fixed. for now we focus on the page content.
            */}

            <div className="max-w-[1280px] mx-auto px-6 md:px-12 pt-40 md:pt-48 relative z-10">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 md:mb-32">
                    <div>
                        <div className="inline-block p-4 rounded-xl bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff] mb-8">
                            <span className="font-mono text-gray-500 text-xs uppercase tracking-[0.2em] px-2 font-bold">Selected Works</span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-display font-black leading-none text-gray-800 tracking-tight">
                            Digital <span className="text-gray-400">Craft.</span>
                        </h1>
                    </div>
                </div>

                {/* WORK GRID */}
                {error ? (
                    <div className="p-8 rounded-[30px] bg-[#e0e5ec] border border-red-500/20 shadow-[inset_5px_5px_10px_#a3b1c6,inset_-5px_-5px_10px_#ffffff]">
                        <p className="font-mono text-red-500 font-bold uppercase tracking-widest mb-2">Connection Failure</p>
                        <p className="text-gray-600">{error}</p>
                    </div>
                ) : works.length === 0 ? (
                    <NeumorphicCardLight className="text-center py-20">
                        <p className="text-gray-400 font-mono uppercase tracking-widest">No projects found.</p>
                    </NeumorphicCardLight>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                        {works.map((work, idx) => (
                            <div key={idx} className="work-item group">
                                <Link to={`/work/${work.slug}`}>
                                    <NeumorphicCardLight className="h-full flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-[15px_15px_30px_#a3b1c6,-15px_-15px_30px_#ffffff]">

                                        {/* Image Container (Inset Shadow for depth) */}
                                        <div className="rounded-2xl overflow-hidden bg-[#e0e5ec] shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff] p-3 mb-6">
                                            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                                                <img
                                                    src={work.img}
                                                    alt={work.title}
                                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110"
                                                />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex flex-col flex-grow px-2">
                                            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-800 mb-2 leading-tight group-hover:text-storm-lime hover:drop-shadow-sm transition-colors">
                                                {work.title}
                                            </h2>
                                            <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">
                                                {work.cat || 'Development'}
                                            </p>
                                        </div>
                                    </NeumorphicCardLight>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
