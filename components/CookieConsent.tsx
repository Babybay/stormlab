import React, { useState } from 'react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-[24.5px] bg-white shadow-lg z-[100] rounded-[2rem] overflow-hidden">
      <div className="flex items-center px-[24.5px] py-[12.25px] w-[276px]">
        <p className="text-agency-black/50 text-[12.46px] mr-auto">
          This website uses <span className="text-agency-black">cookies</span>
        </p>
        <button 
          onClick={() => setVisible(false)}
          className="bg-agency-black text-white text-[9.8px] rounded-full px-[15px] py-[7px] hover:bg-agency-black/80 transition-colors"
        >
          Accept
        </button>
      </div>
    </div>
  );
}