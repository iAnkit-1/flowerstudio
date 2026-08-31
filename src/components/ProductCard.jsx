import React, { useState, useEffect } from 'react';
import { Tag, Sparkles } from 'lucide-react';

export default function ProductCard({ product, onBuyNow }) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const rawImages = product.images && product.images.length > 0 ? product.images : [product.image];
  const images = rawImages.filter(img => img && typeof img === 'string' && img.trim().length > 0);
  const validImages = images.length > 0 ? images : ['https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=400'];

  const rawDiscount = product.discountPercentage > 0
    ? product.discountPercentage
    : (product.originalPrice > product.price
        ? ((product.originalPrice - product.price) / product.originalPrice) * 100
        : 0);
  const discountVal = Math.round(rawDiscount);

  // Automatic slideshow animation (matching Customer app)
  useEffect(() => {
    if (validImages.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setActiveImageIdx((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));
    }, 3200);

    return () => clearInterval(interval);
  }, [validImages.length, isPaused]);

  const savingsAmount = product.originalPrice > product.price ? Math.round(product.originalPrice - product.price) : 0;

  return (
    <div
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        setActiveImageIdx(0);
      }}
    >
      {/* Image Container with Automatic Slideshow & Discount Ribbon */}
      <div
        className="relative pt-[92%] overflow-hidden bg-slate-50 cursor-pointer"
        onClick={() => onBuyNow(product)}
      >
        {/* Render stacked images with smooth opacity transition */}
        {validImages.map((imgUrl, idx) => {
          const isActive = idx === activeImageIdx;
          return (
            <img
              key={idx}
              src={imgUrl}
              alt={`${product.name} - Slide ${idx + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-108 ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
              loading="lazy"
            />
          );
        })}

        {/* Premium Discount Ribbon on Top Left (Integer without decimal) */}
        {discountVal > 0 && (
          <div className="absolute top-0 left-0 bg-gradient-to-r from-lotus-pink via-rose-600 to-lotus-pink-dark text-white text-[10px] font-extrabold px-3 py-1 rounded-br-2xl shadow-md z-20 uppercase tracking-widest flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-amber-300" />
            <span>{discountVal}% OFF</span>
          </div>
        )}

        {/* Category Tag on Top Right */}
        <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-slate-800 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border border-slate-100 shadow-xs z-20">
          {product.category}
        </span>

        {/* Slideshow Dot Indicators */}
        {validImages.length > 1 && (
          <div className="absolute bottom-2.5 left-0 right-0 flex justify-center gap-1.5 z-20">
            <div className="flex gap-1 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
              {validImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIdx(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeImageIdx ? 'bg-white w-4' : 'bg-white/50 w-1.5'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Card Body - Title, Description, Subcategory Tags, Price, Save Amount & Buy Now Button at Bottom Right */}
      <div className="p-4 flex-grow flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          {/* Subcategory Tags */}
          <div className="flex flex-wrap gap-1.5 min-h-[22px]">
            {product.subCategory && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-lotus-pink bg-pink-50 border border-pink-100/60 px-2 py-0.5 rounded-md capitalize">
                <Tag className="w-2.5 h-2.5" />
                {product.subCategory}
              </span>
            )}
            {product.tags && product.tags.slice(0, 1).map((tag, i) => (
              <span key={i} className="text-[10px] font-semibold text-lotus-green bg-green-50 border border-green-100/60 px-2 py-0.5 rounded-md">
                #{tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3
            className="font-sans font-bold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-lotus-pink transition-colors line-clamp-1 cursor-pointer"
            onClick={() => onBuyNow(product)}
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Description directly below Title */}
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-normal">
            {product.description}
          </p>
        </div>

        {/* Footer Area: Price & Save Amount on Left, Buy Now Button at Bottom Right */}
        <div className="pt-2 border-t border-slate-100 flex items-end justify-between gap-2">
          {/* Left: Price & Save tag placed directly below price */}
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-black text-slate-900">₹{product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-xs font-semibold text-slate-400 line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>

            {savingsAmount > 0 && (
              <span className="text-[10px] font-extrabold text-lotus-green mt-0.5">
                Save ₹{savingsAmount}
              </span>
            )}
          </div>

          {/* Right: Buy Now Button positioned at bottom right */}
          <button
            onClick={() => onBuyNow(product)}
            className="flex items-center justify-center bg-gradient-to-r from-lotus-pink to-lotus-pink-dark hover:from-lotus-pink-dark hover:to-lotus-pink text-white font-extrabold py-2 px-4 rounded-xl shadow-sm shadow-pink-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer text-xs uppercase tracking-wider flex-shrink-0"
          >
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}
