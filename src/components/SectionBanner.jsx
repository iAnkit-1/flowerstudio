import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function SectionBanner({
  badge = 'Luxury Gifting',
  title,
  subtitle,
  image,
  ctaText = 'Explore Collection',
  onCtaClick,
  gradientOverlay = 'from-slate-950/80 via-slate-950/40 to-transparent',
}) {
  return (
    <div className="relative w-full rounded-3xl overflow-hidden shadow-lg border border-slate-100 my-8 group">
      {/* Background Image */}
      <div
        className="w-full h-44 sm:h-56 md:h-64 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${image})` }}
      >
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-r ${gradientOverlay}`} />
      </div>

      {/* Banner Content */}
      <div className="absolute inset-0 p-6 sm:p-8 md:p-10 flex flex-col justify-center max-w-xl text-left space-y-2.5 z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] sm:text-xs font-extrabold tracking-wider uppercase w-fit border border-white/30">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>{badge}</span>
        </div>

        <h3 className="font-serif font-extrabold text-xl sm:text-2xl md:text-3xl text-white leading-tight">
          {title}
        </h3>

        {subtitle && (
          <p className="text-xs sm:text-sm text-slate-200 font-medium line-clamp-2 max-w-md">
            {subtitle}
          </p>
        )}

        {onCtaClick && (
          <div className="pt-2">
            <button
              onClick={onCtaClick}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-lotus-pink to-lotus-pink-dark hover:from-lotus-pink-dark hover:to-lotus-pink text-white font-extrabold px-5 py-2.5 rounded-full text-xs shadow-md shadow-pink-500/25 hover:scale-105 transition-all cursor-pointer"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
