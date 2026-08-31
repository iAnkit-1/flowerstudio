import React from 'react';

export default function Logo({ className = '', size = 36, showText = true, textClass = '' }) {
  return (
    <div className={`inline-flex items-center gap-2.5 select-none cursor-pointer group ${className}`}>
      <img
        src="/logo.png"
        alt="Flower Studio Logo"
        style={{ width: size, height: size }}
        className="object-contain transition-transform duration-300 group-hover:scale-105"
        onError={(e) => {
          // Fallback if image fails to render
          e.target.style.display = 'none';
        }}
      />
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`font-serif font-extrabold tracking-tight text-slate-900 group-hover:text-lotus-pink transition-colors text-lg ${textClass}`}>
            Flower <span className="text-lotus-pink">Studio</span>
          </span>
          <span className="text-[9px] font-bold text-lotus-green tracking-widest uppercase mt-0.5">
            Luxury Florist
          </span>
        </div>
      )}
    </div>
  );
}
