import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from '../lib/sanity';
import TextPressure from '../components/TextPressure';
import { PortableText } from '@portabletext/react';

export default function ProjectDetail() {
    const { slug } = useParams();
    const [project, setProject] = useState<any>(null);

    useEffect(() => {
        client.fetch(
            `*[_type == "project" && slug.current == $slug][0]{
        title,
        client,
        year,
        description,
        mainImage,
        gallery,
        tags
      }`,
            { slug }
        ).then((data) => setProject(data))
            .catch(console.error);
    }, [slug]);

    if (!project) return <div className="min-h-screen bg-agency-black flex items-center justify-center text-white">Loading...</div>;

    return (
        <div className="min-h-screen bg-agency-black text-white pt-[120px] pb-[80px]">
            <div className="max-w-[1320px] mx-auto px-[20px] md:px-[65px]">

                {/* Header */}
                <div className="mb-[60px]">
                    <Link to="/work" className="text-white/50 hover:text-storm-lime mb-4 inline-block">← Back to Work</Link>
                    <h1 className="text-[4rem] leading-none mb-4">{project.title}</h1>
                    <div className="flex gap-8 text-white/60">
                        <span>{project.client}</span>
                        <span>{project.year}</span>
                    </div>
                </div>

                {/* Main Image */}
                {project.mainImage && (
                    <div className="w-full aspect-video mb-[60px]">
                        <img
                            src={urlFor(project.mainImage).url()}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-[80px]">
                    <div className="md:col-span-1">
                        <h3 className="text-xl font-medium mb-4">Description</h3>
                    </div>
                    <div className="md:col-span-2 text-white/80 text-lg leading-relaxed">
                        <p>{project.description}</p>
                    </div>
                </div>

                {/* Gallery */}
                {project.gallery && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-[80px]">
                        {project.gallery.map((img: any, i: number) => (
                            <img key={i} src={urlFor(img).url()} className="w-full h-auto" alt={`Gallery ${i}`} />
                        ))}
                    </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {project.tags?.map((tag: string) => (
                        <span key={tag} className="border border-white/20 px-3 py-1 rounded-full text-sm">{tag}</span>
                    ))}
                </div>

            </div>
        </div>
    );
}
