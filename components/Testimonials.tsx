
import React from 'react';

const testimonials = [
    {
        id: 1,
        quote: "StormLab didn't just build a website; they built a digital ecosystem that completely revitalized our brand presence.",
        author: "Sarah Jenkins",
        role: "CMO, TechFlow",
        theme: "storm-lime"
    },
    {
        id: 2,
        quote: "The strategic depth they bring is unmatched. They understood our market better than we did.",
        author: "David Chen",
        role: "Founder, Apex",
        theme: "cyan-400"
    },
    {
        id: 3,
        quote: "Fast, precise, and incredibly beautiful work. The ROI on our new platform has been significant.",
        author: "Elena Rodriguez",
        role: "Director, ArtHouse",
        theme: "fuchsia-500"
    },
    {
        id: 4,
        quote: "A partnership that feels less like a vendor relationship and more like an extension of our core team.",
        author: "Marcus Thorne",
        role: "VP Product, Obsidian",
        theme: "orange-500"
    }
];

export default function Testimonials() {

    return (
        <section className="py-32 px-6 md:px-12 bg-agency-black relative overflow-hidden">

            {/* Section Title */}
            <div className="max-w-[1280px] mx-auto mb-20 text-center">
                <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
                    Client <span className="text-white/20">Transmission.</span>
                </h2>
            </div>

            {/* Carousel Container */}
            <div
                className="max-w-[1400px] mx-auto flex gap-8 overflow-x-auto pb-12 px-4 no-scrollbar snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {testimonials.map((t) => (
                    <div
                        key={t.id}
                        className="testimonial-card flex-shrink-0 w-[85vw] md:w-[500px] snap-center group"
                    >
                        <div className={`h-full rounded-[40px] p-8 md:p-12 flex flex-col relative overflow-hidden bg-${t.theme} shadow-[inset_5px_5px_10px_rgba(0,0,0,0.2),inset_-5px_-5px_10px_rgba(255,255,255,0.2)] text-agency-black`}>

                            {/* Quote Icon */}
                            <div className="mb-8 text-agency-black/20">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
                                </svg>
                            </div>

                            {/* BOLD Typography Request */}
                            <p className="text-2xl md:text-3xl font-display font-black leading-tight tracking-tight mb-8 flex-grow text-agency-black">
                                "{t.quote}"
                            </p>

                            <div className="flex items-center gap-4 pt-8 border-t border-agency-black/10">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold bg-agency-black/10 text-agency-black">
                                    {t.author.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-base tracking-wide text-agency-black">{t.author}</h4>
                                    <p className="text-xs uppercase tracking-widest text-agency-black/60">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Webkit scrollbar hiding */}
            <style>{`
                 .no-scrollbar::-webkit-scrollbar {
                     display: none;
                 }
                 .no-scrollbar {
                     -ms-overflow-style: none; 
                     scrollbar-width: none; 
                 }
             `}</style>
        </section>
    );
}
