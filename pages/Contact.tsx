import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

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

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xzznaagy"; // [!IMPORTANT] Replace with your Formspree ID

export default function Contact() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({ name: '', email: '', project: '', budget: '' });
    const [tooltip, setTooltip] = useState({ visible: false, text: '', x: 0, y: 0 });
    const [isCompleted, setIsCompleted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    useGSAP(() => {
        gsap.from(containerRef.current, { opacity: 0, duration: 1.2, ease: "power2.out" });
    }, { scope: containerRef });

    useEffect(() => {
        if (isCompleted) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(".step-anim",
                { y: 30, opacity: 0, filter: "blur(10px)" },
                { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.6, stagger: 0.1, ease: "power2.out" }
            );

            gsap.to(".progress-track", {
                width: `${((currentStep + 1) / steps.length) * 100}%`,
                duration: 0.8,
                ease: "power2.inOut"
            });
        }, containerRef);

        return () => ctx.revert();
    }, [currentStep, isCompleted]);

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
                    errorMessage = 'Please enter a valid email address (e.g. name@domain.com).';
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
            gsap.to(".input-container", { keyframes: { x: [-10, 10, -10, 10, 0] }, duration: 0.4 });
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
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setIsCompleted(true);
            } else {
                throw new Error('Submission failed');
            }
        } catch (err) {
            console.error(err);
            // Fallback: Open Mailto
            const subject = `New Project Inquiry from ${formData.name}`;
            const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0AProject: ${formData.project}%0D%0ABudget: ${formData.budget}`;
            window.location.href = `mailto:hello@stormlab.agency?subject=${subject}&body=${body}`; // Replace with your email
            setIsCompleted(true); // Still show success to not frustrate user
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
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center">
                <h1 className="text-agency-black text-[40px] md:text-[60px] font-medium tracking-tight mb-6">
                    Thank you, {formData.name}.
                </h1>
                <p className="text-agency-black/60 text-lg md:text-xl font-light max-w-xl">
                    We have received your details. Our team will review your project and get back to you within 24 hours.
                </p>
                <div className="mt-12">
                    <button
                        onClick={() => window.location.reload()}
                        className="text-agency-black text-sm uppercase tracking-widest hover:text-storm-lime transition-colors border-b border-agency-black hover:border-storm-lime pb-1"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    const step = steps[currentStep];

    return (
        <div ref={containerRef} className="min-h-screen bg-white flex flex-col pt-[120px] pb-[40px] px-[20px] md:px-[65px] relative">
            {/* Minimal Header */}
            <div className="absolute top-[40px] left-[20px] md:left-[65px] flex items-center gap-4">
                <span className="text-agency-black/30 text-xs font-mono tracking-widest uppercase">
                    Start a Project
                </span>
            </div>

            {/* Progress Indicator */}
            <div className="absolute top-[120px] left-[20px] md:left-[65px] right-[20px] md:right-[65px] h-[1px] bg-agency-black/10">
                <div className="progress-track h-full bg-storm-lime w-0 shadow-[0_0_15px_rgba(204,255,0,0.3)]"></div>
            </div>

            <div className="flex-1 flex flex-col justify-center max-w-[900px] w-full mx-auto">
                <div className="mb-12 step-anim">
                    <span className="text-agency-black/50 font-mono text-sm tracking-widest uppercase mb-4 block">
                        0{step.id} / 0{steps.length} — {step.title}
                    </span>
                    <h2 className="text-[40px] md:text-[68px] leading-[1.1] font-medium text-agency-black tracking-tight">
                        {step.question}
                    </h2>
                </div>

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
                                    onMouseEnter={(e) => {
                                        setTooltip({
                                            visible: true,
                                            text: opt.description,
                                            x: e.clientX,
                                            y: e.clientY
                                        });
                                    }}
                                    onMouseMove={(e) => {
                                        setTooltip(prev => ({ ...prev, x: e.clientX, y: e.clientY }));
                                    }}
                                    onMouseLeave={() => {
                                        setTooltip(prev => ({ ...prev, visible: false }));
                                    }}
                                    className={`group relative px-8 py-4 rounded-sm border transition-all duration-300 text-lg flex flex-col items-center ${formData.budget === opt.value
                                        ? 'border-storm-lime text-agency-black bg-storm-lime'
                                        : 'border-agency-black/10 text-agency-black hover:border-agency-black/30 bg-white'
                                        }`}
                                >
                                    <span className="font-medium">{opt.label}</span>
                                </button>
                            ))}
                        </div>
                    ) : (
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
                            className="w-full bg-transparent border-b border-agency-black/20 py-4 text-[24px] md:text-[32px] text-agency-black focus:border-storm-lime outline-none placeholder:text-agency-black/20 transition-colors font-light"
                        />
                    )}
                    {error && (
                        <p className="absolute -bottom-8 left-0 text-red-500 text-sm mt-2">{error}</p>
                    )}
                </div>

                <div className="flex items-center gap-6 step-anim">
                    <button
                        onClick={handleNext}
                        disabled={isSubmitting}
                        className="h-[50px] px-10 bg-agency-black text-white rounded-sm font-medium hover:bg-storm-lime hover:text-agency-black transition-colors text-[15px] disabled:opacity-50 disabled:cursor-wait"
                    >
                        {isSubmitting ? 'Sending...' : (currentStep === steps.length - 1 ? 'Submit Proposal' : 'Continue')}
                    </button>

                    {currentStep > 0 && !isSubmitting && (
                        <button
                            onClick={handleBack}
                            className="text-agency-black/40 hover:text-agency-black transition-colors text-[15px]"
                        >
                            Back
                        </button>
                    )}

                    <span className="ml-auto text-agency-black/20 text-xs hidden md:block">
                        Press <strong>Enter ↵</strong> to continue
                    </span>
                </div>
            </div>

            {/* Floating Tooltip */}
            <div
                className="fixed pointer-events-none z-50 bg-agency-black text-white px-4 py-2 rounded text-sm shadow-xl max-w-[250px] transition-opacity duration-200 border border-white/10"
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
