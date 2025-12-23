import React, { useRef } from 'react';

interface Testimonial {
    id: number;
    text: string;
    author: string;
    role: string;
    theme: 'pink' | 'green' | 'blue';
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        author: "Lorem Ipsum",
        role: "Dolor Sit Amet",
        theme: "pink"
    },
    {
        id: 2,
        text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        author: "Consectetur Adipiscing",
        role: "Elit Sed",
        theme: "green"
    },
    {
        id: 3,
        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        author: "Tempor Incididunt",
        role: "Labore Et Dolore",
        theme: "blue"
    }
];

const QuoteIcon = ({ color }: { color: string }) => (
    <svg width="100%" height="100%" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M27.1837 63.1402H0V39.7885C0 35.581 0.489796 31.6539 1.46939 28.0074C2.61225 24.2207 4.2449 20.9248 6.36735 18.1198C8.65306 15.3148 11.5103 13.0708 14.9388 11.3878C18.3673 9.70479 22.3673 8.86328 26.9387 8.86328V19.3821C24.1633 19.3821 21.8776 20.0132 20.0817 21.2754C18.2857 22.3975 16.8163 23.9402 15.6735 25.9037C14.5306 27.8672 13.7143 30.1113 13.2245 32.6357C12.898 35.02 12.7347 37.4043 12.7347 39.7885H27.1837V63.1402ZM72 63.1402H44.8163V39.7885C44.8163 35.581 45.3062 31.6539 46.2857 28.0074C47.4286 24.2207 49.0612 20.9248 51.1837 18.1198C53.4694 15.3148 56.3265 13.0708 59.7551 11.3878C63.1837 9.70479 67.1836 8.86328 71.7551 8.86328V19.3821C68.9795 19.3821 66.6939 20.0132 64.8979 21.2754C63.102 22.3975 61.6327 23.9402 60.4897 25.9037C59.3469 27.8672 58.5306 30.1113 58.0409 32.6357C57.7143 35.02 57.551 37.4043 57.551 39.7885H72V63.1402Z" fill={color} />
    </svg>
);

const ArrowLeftIcon = () => (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M11.1298 3.55859L2.18799 12.5003L11.1291 21.4415L11.999 20.5715L4.54303 13.1154H22.1968V11.8851H4.54303L11.9997 4.42854L11.1298 3.55859Z" fill="currentColor" />
    </svg>
);

const ArrowRightIcon = () => (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M13.8703 3.55859L22.812 12.5003L13.8709 21.4415L13.001 20.5715L20.457 13.1154H2.80322V11.8851H20.457L13.0004 4.42854L13.8703 3.55859Z" fill="currentColor" />
    </svg>
);

const Testimonials = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const card = scrollContainerRef.current.querySelector('.testimonial-card');
            const cardWidth = card ? card.clientWidth + 36 : 350;

            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -cardWidth : cardWidth,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="bg-agency-black py-[60px] md:py-[80px] overflow-hidden text-white flex flex-col gap-[40px] md:gap-[60px]">
            <div className="ml-auto mr-auto w-full max-w-[1320px] px-[20px] lg:px-[65.3333px] flex flex-col md:flex-row justify-between items-end">
                <h2 className="font-medium text-[36px] md:text-[67.64px] tracking-[-1px] md:tracking-[-4.7348px] leading-[1.1] md:leading-[62.2998px] text-white">
                    Testimonials
                </h2>
                <div className="flex items-center gap-[9px] mt-6 md:mt-0 hidden md:flex">
                    <button
                        onClick={() => scroll('left')}
                        className="flex w-[45px] h-[45px] p-[9px] justify-center items-center rounded-full border border-white/20 bg-transparent cursor-pointer transition-all duration-300 text-white hover:border-storm-lime hover:text-storm-lime disabled:opacity-30 disabled:cursor-not-allowed group"
                        aria-label="Previous testimonial"
                    >
                        <ArrowLeftIcon />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="flex w-[45px] h-[45px] p-[9px] justify-center items-center rounded-full border border-white/20 bg-transparent cursor-pointer transition-all duration-300 text-white hover:border-storm-lime hover:text-storm-lime disabled:opacity-30 disabled:cursor-not-allowed group"
                        aria-label="Next testimonial"
                    >
                        <ArrowRightIcon />
                    </button>
                </div>
            </div>

            <div className="relative w-full">
                <div
                    className="flex w-full overflow-x-auto pb-[40px] snap-x snap-mandatory scroll-smooth no-scrollbar pl-[20px] md:pl-[calc((100vw-1320px)/2+65px)] pr-[20px]"
                    ref={scrollContainerRef}
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <div className="flex items-start gap-[20px] md:gap-[36px] w-max">
                        {testimonials.map((item) => {
                            const getColors = (theme: string) => {
                                switch (theme) {
                                    case 'pink': return { bg: 'bg-[#8A0467]', text: 'text-white', icon: '#CDCECF' };
                                    case 'green': return { bg: 'bg-[#03624C]', text: 'text-white', icon: '#CDCECF' };
                                    case 'blue': return { bg: 'bg-[#A5C8EB]', text: 'text-agency-black', icon: '#000000' };
                                    default: return { bg: 'bg-agency-gray', text: 'text-agency-black', icon: '#000000' };
                                }
                            };
                            const colors = getColors(item.theme);

                            return (
                                <div key={item.id} className="testimonial-card snap-center flex flex-col justify-between w-[90vw] md:w-[600px] lg:w-[932px] box-border rounded-[20px] overflow-hidden shrink-0">
                                    <div className={`flex p-[24px] md:p-[54px] flex-col justify-between items-start h-[400px] md:h-[600px] lg:h-[720px] box-border ${colors.bg} ${colors.text}`}>
                                        <div className="flex justify-between items-start gap-[10px] md:gap-[20px] w-full">
                                            <p className="font-sans text-[22px] md:text-[40px] lg:text-[48px] font-normal leading-[1.2] md:leading-[1.1] tracking-[-0.5px] md:tracking-[-1.5px] max-w-[85%] m-0">
                                                {item.text}
                                            </p>
                                            <div className="w-[32px] h-[32px] md:w-[72px] md:h-[72px] flex-shrink-0 opacity-50">
                                                <QuoteIcon color={colors.icon} />
                                            </div>
                                        </div>
                                        <div className="flex right ml-[auto] items-start py-[auto] gap-0 flex-col md:flex-row md:items-center">
                                            <span className="font-sans text-[16px] md:text-[18px] font-normal leading-[1.4] tracking-[-0.36px] font-bold">{item.author}</span>
                                            <span className="hidden md:inline mx-1">-</span>
                                            <span className="font-sans text-[14px] md:text-[18px] font-normal leading-[1.4] tracking-[-0.36px] opacity-80">{item.role}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                {/* Mobile Navigation Arrows Overlay */}
                <div className="flex md:hidden justify-center gap-[20px] mt-4">
                    <button
                        onClick={() => scroll('left')}
                        className="flex w-[45px] h-[45px] p-[9px] justify-center items-center rounded-full border border-white/20 bg-agency-black/50 backdrop-blur-sm cursor-pointer transition-all duration-300 text-white hover:border-storm-lime hover:text-storm-lime"
                    >
                        <ArrowLeftIcon />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="flex w-[45px] h-[45px] p-[9px] justify-center items-center rounded-full border border-white/20 bg-agency-black/50 backdrop-blur-sm cursor-pointer transition-all duration-300 text-white hover:border-storm-lime hover:text-storm-lime"
                    >
                        <ArrowRightIcon />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
