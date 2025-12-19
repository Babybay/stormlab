
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

// Reusable Neumorphic Card
const NeumorphicCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-[#121212] rounded-[30px] p-6 shadow-[10px_10px_20px_#050505,-10px_-10px_20px_#1f1f1f] border border-white/5 ${className}`}>
        {children}
    </div>
);

// Neumorphic Button (for filters)
const NeumorphicButton = ({ children, isActive, onClick }: { children: React.ReactNode, isActive: boolean, onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 ${isActive
            ? "bg-[#121212] text-storm-lime shadow-[inset_3px_3px_6px_#050505,inset_-3px_-3px_6px_#1f1f1f]" // Pressed state
            : "bg-[#121212] text-white/60 shadow-[5px_5px_10px_#050505,-5px_-5px_10px_#1f1f1f] hover:translate-y-[1px] hover:shadow-[3px_3px_6px_#050505,-3px_-3px_6px_#1f1f1f]" // Unpressed state
            }`}
    >
        {children}
    </button>
);

export default function Blog() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedCategory, setSelectedCategory] = React.useState("All");
    const [blogPosts, setBlogPosts] = React.useState<any[]>([]);
    const [error, setError] = React.useState<string | null>(null);

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
                // Sort by date descending
                formatted.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
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
        <div ref={containerRef} className="min-h-screen bg-[#121212] font-sans selection:bg-storm-lime selection:text-black pb-32">

            <div className="max-w-[1280px] mx-auto px-6 md:px-12 pt-40 md:pt-48 relative z-10">

                {/* HEADLINE */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 md:mb-32">
                    <div>
                        <div className="inline-block p-4 rounded-xl bg-[#121212] shadow-[inset_3px_3px_6px_#050505,inset_-3px_-3px_6px_#1f1f1f] mb-8">
                            <span className="font-mono text-storm-lime text-xs uppercase tracking-[0.2em] px-2 font-bold">Insights & Intel</span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-display font-black leading-none text-white tracking-tight">
                            Digital <span className="text-white/20">Feed.</span>
                        </h1>
                    </div>

                    {/* FILTERS */}
                    <div className="flex flex-wrap gap-4 mt-8 md:mt-0">
                        {categories.map(cat => (
                            <NeumorphicButton
                                key={cat}
                                isActive={selectedCategory === cat}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat}
                            </NeumorphicButton>
                        ))}
                    </div>
                </div>

                {/* CONTENT AREA */}
                {error ? (
                    <div className="p-8 rounded-[30px] bg-[#1a0505] border border-red-900/50 shadow-[inset_5px_5px_10px_#0f0303,inset_-5px_-5px_10px_#250707]">
                        <p className="font-mono text-red-500 font-bold uppercase tracking-widest mb-2">Signal Lost</p>
                        <p className="text-white/60">{error}</p>
                    </div>
                ) : filteredPosts.length === 0 ? (
                    <NeumorphicCard className="text-center py-20">
                        <p className="text-white/40 font-mono uppercase tracking-widest">No signals detected yet.</p>
                    </NeumorphicCard>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                        {filteredPosts.map((post) => (
                            <div key={post.id} className="group">
                                <Link to={`/blog/${post.slug}`}>
                                    <NeumorphicCard className="h-full flex flex-col transition-transform duration-300 hover:-translate-y-2 hover:shadow-[15px_15px_30px_#050505,-15px_-15px_30px_#1f1f1f]">

                                        {/* Image Container (Inset Shadow) */}
                                        <div className="rounded-2xl overflow-hidden bg-[#121212] shadow-[inset_5px_5px_10px_#050505,inset_-5px_-5px_10px_#1f1f1f] p-2 mb-6">
                                            <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
                                                <div className="absolute top-3 left-3 z-10">
                                                    <span className="px-3 py-1 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-lg border border-white/10">
                                                        {post.category || 'General'}
                                                    </span>
                                                </div>
                                                <img
                                                    src={post.image}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                                />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex flex-col flex-grow">
                                            <span className="text-storm-lime/60 font-mono text-xs mb-3 block">
                                                {post.date}
                                            </span>
                                            <h2 className="text-xl md:text-2xl font-display font-bold text-white mb-4 leading-tight group-hover:text-storm-lime transition-colors">
                                                {post.title}
                                            </h2>
                                            <p className="text-white/50 text-sm leading-relaxed mb-6 line-clamp-3">
                                                {post.excerpt}
                                            </p>

                                            <div className="mt-auto flex items-center gap-2 text-white/40 text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                                                <span>Read Signal</span>
                                                <div className="w-8 h-[1px] bg-white/20 group-hover:bg-storm-lime transition-colors" />
                                            </div>
                                        </div>
                                    </NeumorphicCard>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
