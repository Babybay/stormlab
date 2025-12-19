import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Blog() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedCategory, setSelectedCategory] = React.useState("All");
    const [blogPosts, setBlogPosts] = React.useState<any[]>([]);
    const [error, setError] = React.useState<string | null>(null);

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
    }, { scope: containerRef, dependencies: [selectedCategory, blogPosts] });

    React.useEffect(() => {
        import('../lib/sanity').then(({ client, urlFor }) => {
            client.fetch(`*[_type == "post"]{
                "id": _id,
                title,
                "category": categories[0],
                "date": publishedAt,
                mainImage,
                "excerpt": pt::text(body)[0..100] + "...",
                "slug": slug.current
             }`).then(data => {
                const formatted = data.map((d: any) => ({
                    ...d,
                    image: d.mainImage ? urlFor(d.mainImage).url() : "https://placehold.co/800x400/1a1a1a/FFFFFF?text=No+Image",
                    date: d.date ? new Date(d.date).toLocaleDateString() : 'recent'
                }));
                setBlogPosts(formatted);
                setError(null);
            }).catch(err => {
                console.error(err);
                setError(err.message);
            });
        });
    }, []);

    const categories = ["All", ...Array.from(new Set(blogPosts.map(p => p.category).filter(Boolean)))];

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

                {error ? (
                    <div className="text-red-500 text-xl border border-red-500 p-4 rounded">
                        <p className="font-bold">Connection Error:</p>
                        <p>{error}</p>
                    </div>
                ) : filteredPosts.length === 0 ? (
                    <div className="text-white text-xl">
                        <p>No posts found. Please add some content in the Sanity Studio.</p>
                    </div>
                ) : (
                    <div className="flex flex-wrap -mx-[16.3333px]">
                        {filteredPosts.map((post) => (
                            <div key={post.id} className="blog-item w-[50%] px-[16.3333px] mb-[60px]">
                                <Link to={`/blog/${post.slug}`} className="group cursor-pointer block">
                                    <div className="overflow-hidden relative w-full aspect-[2/1] bg-white/5 mb-[20px]">
                                        <div className="absolute top-[20px] left-[20px] z-10 bg-storm-lime text-agency-black text-[12px] font-bold px-[10px] py-[4px] rounded-sm">
                                            {post.category || 'Uncategorized'}
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
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
