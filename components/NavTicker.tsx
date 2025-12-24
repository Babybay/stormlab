import React from 'react';
import LogoLoop from './LogoLoop';

const TICKER_TEXT = "Stormlab digital agency  ⁕  Build your brand with us  ⁕  Stormlab digital agency  ⁕  Build your brand with us  ⁕"
const REPEAT_COUNT = 10; // Creating enough copies for smoothness

const tickerItems = Array(REPEAT_COUNT).fill(null).map((_, i) => ({
    node: (
        <span className="text-[16px] leading-none font-light uppercase tracking-wider px-2 whitespace-nowrap font-display pt-[4px]">
            {TICKER_TEXT}
        </span>
    ),
    title: TICKER_TEXT,
    ariaLabel: TICKER_TEXT
}));

export default function NavTicker() {
    return (
        <div className="w-full h-[30px] bg-storm-lime text-agency-black rounded-lg overflow-hidden flex items-center shadow-md">
            <LogoLoop
                logos={tickerItems}
                speed={40}
                direction="left"
                gap={0}
                logoHeight={30}
                pauseOnHover={false}
                className="w-full h-full flex items-center"
            />
        </div>
    );
}
