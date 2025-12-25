
import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const steps = [
    {
        id: 1,
        title: "Introduction",
        question: "Let's start with your name.",
        placeholder: "Enter your name...",
        field: "name",
        type: "text",
    },
    {
        id: 2,
        title: "Email",
        question: "Where can we send the proposal?",
        placeholder: "name@company.com",
        field: "email",
        type: "email",
    },
    {
        id: 3,
        title: "Project Scope",
        question: "Tell us about your project or idea.",
        placeholder: "We are looking to...",
        field: "project",
        type: "text",
    },
    {
        id: 4,
        title: "Package Selection",
        question: "Which package interests you?",
        options: [
            { label: "Web Strategy: Starter", value: "Web Strategy: Starter", description: "Perfect for small businesses or startups." },
            { label: "Web Strategy: Growth", value: "Web Strategy: Growth", description: "For businesses needing a serious roadmap." },
            { label: "Social Media: Starter", value: "Social Media: Starter", description: "Essential social foundation to get you started." },
            { label: "Design: Starter", value: "Design: Starter", description: "Quick, high-quality assets for your feed." },
            { label: "Design: Growth", value: "Design: Growth", description: "Consistent visual identity for growing brands." },
            { label: "Design: Pro", value: "Design: Pro", description: "Full-scale creative direction and campaign support." },
            { label: "Custom / Not Sure", value: "Custom", description: "Let's discuss your unique needs." }
        ],
        field: "budget",
        type: "radio",
    }
];

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xzznaagy";

export default function Contact() {
    const containerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({ name: '', email: '', project: '', budget: '' });
    const [tooltip, setTooltip] = useState({ visible: false, text: '', x: 0, y: 0 });
    const [isCompleted, setIsCompleted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    useGSAP(() => {
        gsap.from(containerRef.current, { opacity: 0, duration: 1.2, ease: "power2.out" });
        gsap.from(".custom-nav", { y: -20, opacity: 0, duration: 0.8, delay: 0.2, ease: "power2.out" });
    }, { scope: containerRef });

    useEffect(() => {
        if (isCompleted) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(".step-anim",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }
            );

            gsap.to(".progress-track", {
                width: `${((currentStep + 1) / steps.length) * 100}%`,
                duration: 0.8,
                ease: "power2.inOut"
            });
        }, containerRef);

        return () => ctx.revert();
    }, [currentStep, isCompleted]);

    // ... validation and submitForm omitted for brevity in diff ...

    const validate = () => {
        const step = steps[currentStep];
        const value = (formData as any)[step.field];
        let isValid = true;
        let errorMessage = '';

        switch (step.field) {
            case 'name':
                if (!value || value.length < 2) {
                    isValid = false;
                    errorMessage = 'Please enter a valid name (min 2 chars).';
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value || !emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address.';
                }
                break;
            case 'project':
                if (!value || value.length < 10) {
                    isValid = false;
                    errorMessage = 'Please tell us a bit more (min 10 chars).';
                }
                break;
            case 'budget':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Please select a budget range.';
                }
                break;
            default:
                if (!value) {
                    isValid = false;
                    errorMessage = 'This field is required.';
                }
        }

        if (!isValid) {
            setError(errorMessage);
            gsap.to(".input-container", { keyframes: { x: [-5, 5, -5, 5, 0] }, duration: 0.3 });
            return false;
        }

        setError('');
        return true;
    };

    const submitForm = async () => {
        setIsSubmitting(true);
        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setIsCompleted(true);
            } else {
                throw new Error('Submission failed');
            }
        } catch (err) {
            console.error(err);
            const subject = `New Project Inquiry from ${formData.name}`;
            const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0AProject: ${formData.project}%0D%0ABudget: ${formData.budget}`;
            window.location.href = `mailto:hello@stormlab.agency?subject=${subject}&body=${body}`;
            setIsCompleted(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleNext = () => {
        if (!validate()) return;
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            submitForm();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
            setError('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleNext();
    };

    if (isCompleted) {
        return (
            <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center p-8 text-center text-white relative">
                {/* Custom Header for Success State too */}
                <div className="absolute top-0 left-0 w-full px-5 md:px-[65px] pt-8 md:pt-12 flex justify-between items-center z-50">
                    <button onClick={() => navigate(-1)} className="text-white hover:text-storm-lime transition-colors">
                        <ArrowLeft size={32} />
                    </button>
                    <Link to="/" className="font-display font-black text-2xl md:text-3xl tracking-tight text-white hover:text-storm-lime transition-colors">
                        STORMLAB.
                    </Link>
                </div>

                <div className="p-12 rounded-[40px] bg-[#121212] shadow-[20px_20px_60px_#050505,-20px_-20px_60px_#1f1f1f]">
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-storm-lime">
                        Received.
                    </h1>
                    <p className="text-white/60 text-lg font-light max-w-xl mb-12">
                        Stand by. We are analyzing your request and will establish contact within 24 hours.
                    </p>
                    <Link
                        to="/"
                        className="inline-block px-8 py-4 rounded-full bg-[#121212] text-white font-bold uppercase tracking-widest text-sm shadow-[5px_5px_10px_#050505,-5px_-5px_10px_#1f1f1f] hover:shadow-[inset_3px_3px_6px_#050505,inset_-3px_-3px_6px_#1f1f1f] transition-all"
                    >
                        Return to Base
                    </Link>
                </div>
            </div>
        );
    }

    const step = steps[currentStep];

    return (
        <div ref={containerRef} className="min-h-screen bg-[#121212] flex flex-col pt-[160px] pb-[40px] px-[20px] md:px-[65px] relative font-sans">

            {/* Custom Navigation Header */}
            <div className="custom-nav absolute top-0 left-0 w-full px-5 md:px-[65px] pt-8 md:pt-12 flex justify-between items-center z-50">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 -ml-2 text-white/50 hover:text-white hover:scale-110 transition-all duration-300"
                    aria-label="Go Back"
                >
                    <ArrowLeft size={32} />
                </button>

                <Link
                    to="/"
                    className="font-display font-black text-2xl md:text-3xl tracking-tight text-white/90 hover:text-storm-lime transition-colors"
                >
                    STORMLAB.
                </Link>
            </div>

            {/* Progress Bar Container (Inset Shadow) */}
            <div className="absolute top-[120px] left-[20px] md:left-[65px] right-[20px] md:right-[65px] h-2 rounded-full bg-[#121212] shadow-[inset_2px_2px_5px_#050505,inset_-2px_-2px_5px_#1f1f1f] overflow-hidden">
                <div className="progress-track h-full bg-storm-lime w-0 shadow-[0_0_10px_rgba(190,242,100,0.5)]"></div>
            </div>

            <div className="flex-1 flex flex-col justify-center max-w-[900px] w-full mx-auto">

                {/* Step Counter */}
                <div className="mb-12 step-anim">
                    <span className="text-white/30 font-mono text-sm tracking-widest uppercase mb-4 block">
                        Step 0{step.id} / 0{steps.length} — {step.title}
                    </span>
                    <h2 className="text-3xl md:text-5xl leading-tight font-bold text-white tracking-wide">
                        {step.question}
                    </h2>
                </div>

                {/* Input Area */}
                <div className="input-container step-anim mb-16 relative">
                    {step.type === 'radio' ? (
                        <div className="flex flex-wrap gap-4">
                            {step.options?.map((opt: any) => (
                                <button
                                    key={opt.value}
                                    onClick={() => {
                                        setFormData({ ...formData, budget: opt.value });
                                        setError('');
                                    }}
                                    onMouseEnter={(e) => setTooltip({ visible: true, text: opt.description, x: e.clientX, y: e.clientY })}
                                    onMouseMove={(e) => setTooltip(prev => ({ ...prev, x: e.clientX, y: e.clientY }))}
                                    onMouseLeave={() => setTooltip(prev => ({ ...prev, visible: false }))}
                                    className={`group relative px-6 py-4 rounded-2xl transition-all duration-300 text-sm md:text-base font-bold uppercase tracking-wide flex flex-col items-center ${formData.budget === opt.value
                                        ? 'bg-[#121212] text-storm-lime shadow-[inset_3px_3px_6px_#050505,inset_-3px_-3px_6px_#1f1f1f] border border-transparent' // Active (Pressed)
                                        : 'bg-[#121212] text-white/50 shadow-[5px_5px_10px_#050505,-5px_-5px_10px_#1f1f1f] hover:translate-y-[1px] hover:text-white border border-white/5' // Inactive (Outset)
                                        }`}
                                >
                                    <span>{opt.label}</span>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="relative">
                            <input
                                autoFocus
                                type={step.type}
                                value={(formData as any)[step.field]}
                                onChange={(e) => {
                                    setFormData({ ...formData, [step.field]: e.target.value });
                                    if (error) setError('');
                                }}
                                onKeyDown={handleKeyDown}
                                placeholder={step.placeholder}
                                className="w-full bg-[#121212] rounded-2xl px-8 py-6 text-xl md:text-2xl text-white placeholder:text-white/20 outline-none shadow-[inset_5px_5px_10px_#050505,inset_-5px_-5px_10px_#1f1f1f] border border-transparent focus:border-storm-lime/30 transition-all font-light"
                            />
                        </div>
                    )}
                    {error && (
                        <p className="absolute -bottom-8 left-4 text-red-500 text-xs font-mono uppercase tracking-widest mt-2">{error}</p>
                    )}
                </div>

                {/* Controls */}
                <div className="flex items-center gap-6 step-anim">
                    <button
                        onClick={handleNext}
                        disabled={isSubmitting}
                        className="h-[60px] px-12 rounded-full bg-[#121212] text-storm-lime font-bold uppercase tracking-widest shadow-[6px_6px_12px_#050505,-6px_-6px_12px_#1f1f1f] hover:text-white hover:shadow-[inset_3px_3px_6px_#050505,inset_-3px_-3px_6px_#1f1f1f] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Transmitting...' : (currentStep === steps.length - 1 ? 'Execute Protocol' : 'Next Step')}
                    </button>

                    {currentStep > 0 && !isSubmitting && (
                        <button
                            onClick={handleBack}
                            className="text-white/30 hover:text-white text-xs font-mono uppercase tracking-widest transition-colors flex items-center gap-2"
                        >
                            <span>← Back</span>
                        </button>
                    )}

                    <span className="ml-auto text-white/10 text-[10px] font-mono uppercase hidden md:block">
                        Press <strong>Enter ↵</strong>
                    </span>
                </div>
            </div>

            {/* Floating Tooltip */}
            <div
                className="fixed pointer-events-none z-50 bg-[#121212] text-white px-4 py-3 rounded-xl text-xs font-bold shadow-[5px_5px_10px_#050505,-5px_-5px_10px_#1f1f1f] transition-opacity duration-200 border border-white/5 max-w-[200px]"
                style={{
                    left: tooltip.x + 20,
                    top: tooltip.y + 20,
                    opacity: tooltip.visible ? 1 : 0
                }}>
                {tooltip.text}
            </div>
        </div>
    );
}
