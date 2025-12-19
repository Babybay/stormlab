import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Clients from '../components/Clients';

export default function Work() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [works, setWorks] = React.useState<any[]>([]);
    const [error, setError] = React.useState<string | null>(null);

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
    }, { scope: containerRef, dependencies: [works] });

    React.useEffect(() => {
        console.log("Fetching projects from Sanity...");
        import('../lib/sanity').then(({ client, urlFor }) => {
            client.fetch(`*[_type == "project"]{
                title,
                "cat": client,
                "img": mainImage,
                "slug": slug.current
            }`).then(data => {
                console.log("Sanity data received:", data);
                const formatted = data.map((d: any) => ({
                    ...d,
                    img: d.img ? urlFor(d.img).url() : "https://placehold.co/800x600/1a1a1a/FFFFFF?text=No+Image"
                }));
                setWorks(formatted);
                setError(null);
            }).catch(err => {
                console.error("Sanity fetch error:", err);
                setError(err.message);
            });
        });
    }, []);

    return (
        <div ref={containerRef} className="min-h-screen bg-agency-black pt-[81.6667px] pb-[80px]">
            <div className="ml-auto mr-auto max-w-[1320px] px-[65.3333px]">
                <h1 className="font-medium text-[67.64px] tracking-[-4.7348px] leading-[62.2998px] mb-[60px] text-white">
                    Selected Work
                </h1>

                {error ? (
                    <div className="text-red-500 text-xl border border-red-500 p-4 rounded">
                        <p className="font-bold">Connection Error:</p>
                        <p>{error}</p>
                        <p className="text-sm text-white mt-2">Please check your CORS settings at sanity.io/manage</p>
                    </div>
                ) : works.length === 0 ? (
                    <div className="text-white text-xl">
                        <p>No projects found. Please add some content in the Sanity Studio.</p>
                        <p className="text-sm opacity-50 mt-2">Check console for connection errors.</p>
                    </div>
                ) : (
                    <div className="flex flex-wrap -mx-[16.3333px]">
                        {works.map((work, idx) => (
                            <div key={idx} className="work-item w-[50%] px-[16.3333px] mb-[60px]">
                                <Link to={`/work/${work.slug}`} className="group cursor-pointer block">
                                    <div className="overflow-hidden relative w-full aspect-[2/1] bg-white/5 mb-[14.7px]">
                                        <img
                                            src={work.img}
                                            alt={work.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                    <p className="mb-[8px] text-[14.24px] font-medium text-white group-hover:text-storm-lime transition-colors">{work.title}</p>
                                    <p className="text-white/50 text-[14.24px]">{work.cat}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Clients />
        </div>
    );
}
