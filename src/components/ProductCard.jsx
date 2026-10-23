import React, { useState, useEffect } from 'react';
import { Tag, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { useProductsContext } from '../context/ProductsContext';
import { isProductAvailable, redirectToWhatsAppOrderRequest } from '../utils/whatsapp';

export default function ProductCard({ product, onBuyNow }) {
  const { navigateToProduct } = useProductsContext();
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
  const available = isProductAvailable(product);

  const handleCardClick = () => {
    if (navigateToProduct) {
      navigateToProduct(product.id);
    } else if (onBuyNow) {
      onBuyNow(product);
    }
  };

  return (
    <div
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100/80"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        setActiveImageIdx(0);
      }}
    >
      {/* Image Container: Full image uncropped with object-contain */}
      <div
        className="relative w-full aspect-square overflow-hidden bg-gradient-to-b from-[#FDFBFB] via-[#FAF7F7] to-[#F5F1F1] cursor-pointer flex items-center justify-center p-3 select-none"
        onClick={handleCardClick}
      >
        {/* Render stacked images without cropping */}
        {validImages.map((imgUrl, idx) => {
          const isActive = idx === activeImageIdx;
          return (
            <img
              key={idx}
              src={imgUrl}
              alt={`${product.name} - View ${idx + 1}`}
              className={`absolute inset-0 w-full h-full p-2.5 object-contain drop-shadow-sm transition-all duration-700 ease-in-out group-hover:scale-105 ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
              loading="lazy"
            />
          );
        })}

        {/* Discount Tag on Top Left (matching #featured tag style) */}
        {discountVal > 0 && (
          <div className="absolute top-2.5 left-2.5 text-[10px] font-extrabold text-lotus-green bg-green-50/95 backdrop-blur-md border border-green-200/90 px-2 py-0.5 rounded-md shadow-xs z-20 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-lotus-green" />
            <span>{discountVal}% OFF</span>
          </div>
        )}

        {/* Category Tag on Top Right */}
        <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-md text-slate-800 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border border-slate-100 shadow-xs z-20">
          {product.category}
        </span>

        {/* Status Badge if Out of Stock / Request Only */}
        {!available && (
          <div className="absolute bottom-2.5 left-2.5 z-20 bg-emerald-900/80 backdrop-blur-md text-white text-[9px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>By Request</span>
          </div>
        )}

        {/* Slideshow Dot Indicators */}
        {validImages.length > 1 && (
          <div className="absolute bottom-2.5 left-0 right-0 flex justify-center gap-1.5 z-20 pointer-events-auto">
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
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Card Body - Subcategory, Title, Description, Price & Action Button */}
      <div className="p-4 flex-grow flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          {/* Subcategory & Tags */}
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
            onClick={handleCardClick}
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-normal">
            {product.description}
          </p>
        </div>

        {/* Footer Area: Price on Left, Buy Now or Request Order Button on Right */}
        <div className="pt-2 border-t border-slate-100 flex items-end justify-between gap-2">
          {/* Left: Price & Save Amount */}
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

          {/* Right: Conditional Action Button */}
          {available ? (
            /* Stock > 0 and available: Show Buy Now with #D90429 */
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick();
              }}
              className="flex items-center justify-center gap-1 bg-[#D90429] hover:bg-[#B00320] text-white font-extrabold py-2 px-3.5 rounded-xl shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer text-xs uppercase tracking-wider flex-shrink-0"
              title="View product details and buy"
            >
              <span>Buy Now</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          ) : (
            /* Otherwise: Show Theme Green Order Now button and open product details page */
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick();
              }}
              className="flex items-center justify-center gap-1.5 bg-lotus-green hover:bg-lotus-green-dark text-white font-extrabold py-2 px-3.5 rounded-xl shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer text-xs uppercase tracking-wider flex-shrink-0"
              title="View product details and order"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Order Now !</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
