import React, { useRef, useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const faqs = [
    {
        id: 1,
        question: "What makes Stormlab different from other agencies?",
        answer: "We don't just build websites; we engineer digital experiences. Our focus on performance, motion design, and brand storytelling ensures your product stands out in a crowded market."
    },
    {
        id: 2,
        question: "How do you handle project timelines and deliverables?",
        answer: "We operate on agile sprints. You'll have access to a dedicated dashboard to track progress in real-time. Typical projects range from 4-12 weeks depending on complexity."
    },
    {
        id: 3,
        question: "Do you offer post-launch support?",
        answer: "Absolutely. We provide a 30-day hyper-care period post-launch. Beyond that, we offer tailored retainer packages for ongoing optimization and growth."
    },
    {
        id: 4,
        question: "What is your pricing model?",
        answer: "We offer both project-based fixed pricing and retainer models. We believe in transparency—no hidden fees, just clear value-based partnerships."
    },
    {
        id: 5,
        question: "Can you help with branding and strategy?",
        answer: "Yes. Our team includes strategists and brand designers who can build your identity from the ground up before we write a single line of code."
    }
];

const FAQItem = ({ faq, isOpen, toggle }: { faq: any, isOpen: boolean, toggle: () => void }) => {
    const answerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (isOpen) {
            gsap.to(answerRef.current, {
                height: 'auto',
                opacity: 1,
                duration: 0.4,
                ease: 'power2.out',
            });
        } else {
            gsap.to(answerRef.current, {
                height: 0,
                opacity: 0,
                duration: 0.3,
                ease: 'power2.out',
            });
        }
    }, { scope: containerRef, dependencies: [isOpen] });

    return (
        <div
            ref={containerRef}
            className="border-b border-white/10 group"
        >
            <button
                onClick={toggle}
                className="w-full py-[24px] flex items-start justify-between text-left focus:outline-none"
            >
                <h3 className={`text-[20px] font-medium transition-opacity duration-300 pr-8 ${isOpen ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'} text-white`}>
                    {faq.question}
                </h3>
                <div className={`mt-1 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-white' : 'text-white/50 group-hover:text-white'}`}>
                    {isOpen ? <Minus size={24} /> : <Plus size={24} />}
                </div>
            </button>

            <div
                ref={answerRef}
                className="overflow-hidden h-0 opacity-0"
            >
                <p className="text-[14.24px] text-white/60 pb-[30px] leading-relaxed max-w-[600px]">
                    {faq.answer}
                </p>
            </div>
        </div>
    );
};

const FAQ = () => {
    const [openId, setOpenId] = useState<number | null>(1);

    return (
        <section className="bg-agency-black py-[120px] px-[20px] lg:px-[65px] border-t border-white/10" id="help">
            <div className="max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

                {/* Left: Sticky Header */}
                <div className="lg:col-span-4">
                    <div className="sticky top-32">
                        <h2 className="text-[48px] font-medium tracking-tight leading-[1.1] text-white mb-8">
                            Common <br />Questions
                        </h2>
                        <p className="text-[14.24px] text-white/60 max-w-sm mb-12">
                            Everything you need to know about working with Stormlab. Can't find the answer?
                        </p>
                        <a href="#contact" className="inline-flex items-center gap-2 text-white border-b border-white/30 pb-1 hover:border-white transition-colors text-[14.24px]">
                            Contact Support
                        </a>
                    </div>
                </div>

                {/* Right: Accordion */}
                <div className="lg:col-span-8">
                    <div className="flex flex-col white">
                        {faqs.map((faq) => (
                            <FAQItem
                                key={faq.id}
                                faq={faq}
                                isOpen={openId === faq.id}
                                toggle={() => setOpenId(openId === faq.id ? null : faq.id)}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default FAQ;
