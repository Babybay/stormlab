import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from '../lib/sanity';
import { PortableText } from '@portabletext/react';

export default function PostDetail() {
    const { slug } = useParams();
    const [post, setPost] = useState<any>(null);

    useEffect(() => {
        client.fetch(
            `*[_type == "post" && slug.current == $slug][0]{
        title,
        mainImage,
        publishedAt,
        author,
        body,
        categories
      }`,
            { slug }
        ).then((data) => setPost(data))
            .catch(console.error);
    }, [slug]);

    if (!post) return <div className="min-h-screen bg-agency-black flex items-center justify-center text-white">Loading...</div>;

    return (
        <div className="min-h-screen bg-agency-black text-white pt-[120px] pb-[80px]">
            <div className="max-w-[900px] mx-auto px-[20px]">

                <Link to="/blog" className="text-white/50 hover:text-storm-lime mb-8 inline-block">← Back to Insights</Link>

                {post.mainImage && (
                    <div className="w-full aspect-[21/9] mb-[40px] overflow-hidden">
                        <img
                            src={urlFor(post.mainImage).url()}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                <h1 className="text-[3rem] md:text-[4rem] leading-[1.1] mb-6">{post.title}</h1>

                <div className="flex justify-between border-t border-white/10 py-4 mb-10 text-white/50 text-sm">
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                    <span>{post.author}</span>
                </div>

                <div className="prose prose-invert prose-lg max-w-none">
                    <PortableText value={post.body} />
                </div>

            </div>
        </div>
    );
}
