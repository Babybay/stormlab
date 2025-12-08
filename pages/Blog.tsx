import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Blog() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedCategory, setSelectedCategory] = React.useState("All");

    useGSAP(() => {
        gsap.from(".blog-item", {
            y: 60,
            opacity: 0,
            stagger: 0.15,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%"
            }
        });
    }, { scope: containerRef, dependencies: [selectedCategory] }); // Re-run anim on category change

    const categories = ["All", "Strategy", "Tech", "Design", "News"];

    const blogPosts = [
        { id: 1, title: "The Future of Digital Strategy", category: "Strategy", date: "Oct 12, 2024", image: "https://placehold.co/800x400/1a1a1a/FFFFFF?text=Strategy", excerpt: "How AI and data are reshaping the way we plan branding campaigns." },
        { id: 2, title: "Minimalist Design Principles", category: "Design", date: "Nov 03, 2024", image: "https://placehold.co/800x400/1a1a1a/FFFFFF?text=Design", excerpt: "Why less is more in the age of information overload." },
        { id: 3, title: "Next-Gen Web Performance", category: "Tech", date: "Nov 28, 2024", image: "https://placehold.co/800x400/1a1a1a/FFFFFF?text=Tech", excerpt: "Optimizing React applications for speed and accessibility." },
        { id: 4, title: "Agency Life: Behind the Scenes", category: "News", date: "Dec 05, 2024", image: "https://placehold.co/800x400/1a1a1a/FFFFFF?text=News", excerpt: "A look into our creative process and team culture." },
        { id: 5, title: "SEO in 2025", category: "Strategy", date: "Dec 10, 2024", image: "https://placehold.co/800x400/1a1a1a/FFFFFF?text=SEO", excerpt: "Preparing your content strategy for the next wave of search engines." },
        { id: 6, title: "Creative Coding with WebGL", category: "Tech", date: "Dec 15, 2024", image: "https://placehold.co/800x400/1a1a1a/FFFFFF?text=WebGL", excerpt: "Pushing the boundaries of browser-based graphics." }
    ];

    const filteredPosts = selectedCategory === "All"
        ? blogPosts
        : blogPosts.filter(post => post.category === selectedCategory);

    return (
        <div ref={containerRef} className="min-h-screen bg-agency-black pt-[81.6667px] pb-[80px]">
            <div className="ml-auto mr-auto max-w-[1320px] px-[65.3333px]">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-[60px]">
                    <h1 className="font-medium text-[67.64px] tracking-[-4.7348px] leading-[62.2998px] text-white">
                        Insights
                    </h1>

                    <div className="flex flex-wrap gap-[10px] mt-[30px] md:mt-0">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-[20px] py-[8px] rounded-full text-[14px] transition-all duration-300 border ${selectedCategory === cat
                                    ? "bg-storm-lime text-agency-black border-storm-lime"
                                    : "bg-transparent text-white border-white/20 hover:border-storm-lime hover:text-storm-lime"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-wrap -mx-[16.3333px]">
                    {filteredPosts.map((post) => (
                        <div key={post.id} className="blog-item w-[50%] px-[16.3333px] mb-[60px]">
                            <div className="group cursor-pointer">
                                <div className="overflow-hidden relative w-full aspect-[2/1] bg-white/5 mb-[20px]">
                                    <div className="absolute top-[20px] left-[20px] z-10 bg-storm-lime text-agency-black text-[12px] font-bold px-[10px] py-[4px] rounded-sm">
                                        {post.category}
                                    </div>
                                    <img src={post.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                </div>
                                <span className="text-[12.46px] text-white/50 block mb-[10px]">{post.date}</span>
                                <h2 className="text-[28.48px] leading-[31.15px] font-medium mb-[10px] text-white group-hover:text-storm-lime transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-[14.24px] leading-[20px] text-white/70">
                                    {post.excerpt}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
