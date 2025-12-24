import React from 'react';

const pricingPlans = [
    {
        id: 'starter',
        name: 'STARTER',
        price: '2.5',
        unit: 'jt',
        period: '/bulan',
        description: 'Perfect for small businesses starting their digital journey',
        features: [
            'Social Media Management',
            'Basic Content Creation',
            'Monthly Reports',
            'Email Support'
        ],
        highlighted: false
    },
    {
        id: 'growth',
        name: 'GROWTH',
        price: '7.5',
        unit: 'jt',
        period: '/bulan',
        description: 'Ideal for growing brands ready to scale',
        features: [
            'Everything in Starter',
            'SEO Optimization',
            'Paid Ads Management',
            'Weekly Strategy Calls',
            'Priority Support'
        ],
        highlighted: true
    },
    {
        id: 'enterprise',
        name: 'ENTERPRISE',
        price: 'Custom',
        unit: '',
        period: '',
        description: 'Full-service solution for established businesses',
        features: [
            'Everything in Growth',
            'Dedicated Account Manager',
            'Custom Integrations',
            '24/7 Support',
            'Quarterly Reviews'
        ],
        highlighted: false
    }
];

export default function Pricing() {
    return (
        <section className="relative w-full bg-storm-lime py-24 md:py-32 overflow-hidden">

            <div className="relative z-10 max-w-[1320px] mx-auto px-4 md:px-16">

                {/* Header */}
                <div className="pricing-title text-center mb-16 md:mb-24">
                    <span className="inline-block font-mono text-sm text-agency-black/60 tracking-[0.3em] uppercase mb-4">
                        Pricing
                    </span>
                    <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] uppercase"
                        style={{
                            color: '#ccff00',
                            textShadow: '3px 3px 6px rgba(0,0,0,0.4), -2px -2px 4px rgba(255,255,255,0.3), inset 1px 1px 2px rgba(0,0,0,0.3)'
                        }}>
                        INVEST IN<br />YOUR GROWTH
                    </h2>
                    <p className="font-sans text-lg md:text-xl text-agency-black/60 mt-6 max-w-2xl mx-auto">
                        Transparent pricing with no hidden fees. Choose the plan that fits your ambition.
                    </p>
                </div>

                {/* Pricing Grid */}
                <div className="pricing-grid grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {pricingPlans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`pricing-card relative rounded-[30px] p-8 md:p-10 transition-all duration-300 hover:-translate-y-2
                                ${plan.highlighted
                                    ? 'bg-agency-black text-white shadow-[12px_12px_24px_rgba(0,0,0,0.3)]'
                                    : 'bg-storm-lime text-agency-black border-2 border-agency-black/20 shadow-[8px_8px_16px_rgba(0,0,0,0.15),-8px_-8px_16px_rgba(255,255,255,0.5)]'
                                }
                            `}
                        >
                            {/* Popular Badge */}
                            {plan.highlighted && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-storm-lime text-agency-black font-mono text-xs tracking-widest uppercase px-4 py-2 rounded-full">
                                    Most Popular
                                </div>
                            )}

                            {/* Plan Name */}
                            <h3 className={`font-display text-2xl md:text-3xl font-black tracking-tight mb-4`}
                                style={plan.highlighted ? {
                                    color: '#ccff00',
                                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                                } : {
                                    color: '#0F1115',
                                    textShadow: '2px 2px 4px rgba(0,0,0,0.2), -1px -1px 2px rgba(255,255,255,0.4)'
                                }}>
                                {plan.name}
                            </h3>

                            {/* Price */}
                            <div className="flex items-baseline gap-1 mb-4">
                                <span className={`font-display text-5xl md:text-6xl font-black ${plan.highlighted ? 'text-white' : 'text-agency-black'}`}>
                                    {plan.price}
                                </span>
                                <span className={`font-sans text-xl ${plan.highlighted ? 'text-white/60' : 'text-agency-black/60'}`}>
                                    {plan.unit}{plan.period}
                                </span>
                            </div>

                            {/* Description */}
                            <p className={`font-sans text-sm mb-8 ${plan.highlighted ? 'text-white/60' : 'text-agency-black/60'}`}>
                                {plan.description}
                            </p>

                            {/* Features */}
                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-3">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${plan.highlighted ? 'bg-storm-lime/20' : 'bg-agency-black/10'}`}>
                                            <svg className={`w-3 h-3 ${plan.highlighted ? 'text-storm-lime' : 'text-agency-black'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className={`font-sans text-sm ${plan.highlighted ? 'text-white/80' : 'text-agency-black/80'}`}>
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <a
                                href="/contact"
                                className={`block w-full text-center font-display text-sm uppercase tracking-wider py-4 rounded-full transition-all duration-300
                                    ${plan.highlighted
                                        ? 'bg-storm-lime text-agency-black hover:bg-white'
                                        : 'bg-agency-black text-storm-lime hover:bg-agency-black/80 shadow-[4px_4px_8px_rgba(0,0,0,0.2),-4px_-4px_8px_rgba(255,255,255,0.5)]'
                                    }
                                `}
                            >
                                Get Started
                            </a>
                        </div>
                    ))}
                </div>

                {/* Bottom Note */}
                <p className="text-center font-sans text-sm text-agency-black/50 mt-12">
                    All prices in IDR. Custom enterprise solutions available upon request.
                </p>
            </div>
        </section>
    );
}
