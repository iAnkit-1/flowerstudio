import React, { useRef } from 'react';
import ProductCard from '../components/ProductCard';
import SectionBanner from '../components/SectionBanner';
import { useProductsContext } from '../context/ProductsContext';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';

export default function BestsellersSection({ onBuyNow }) {
  const { products, navigateToPage } = useProductsContext();
  const scrollContainerRef = useRef(null);

  // Bestsellers products: tagged as bestseller, featured, or top rated
  const bestsellers = products.filter(
    (p) =>
      (p.tags && (p.tags.includes('bestseller') || p.tags.includes('featured') || p.tags.includes('Trending'))) ||
      p.rating >= 4.7
  ).slice(0, 10);

  const displayItems = bestsellers.length > 0 ? bestsellers : products.slice(0, 8);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Banner (FNP/IGP style banner before section) */}
        <SectionBanner
          badge="Most Popular Gifts"
          title="Shop By Bestsellers"
          subtitle="Explore the most loved floral arrangements, hampers, and fresh cakes across Chandigarh, Mohali & Panchkula."
          image="https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=1200"
          ctaText="Explore All Bestsellers"
          onCtaClick={() => navigateToPage('products', 'all')}
          gradientOverlay="from-rose-950/90 via-pink-950/70 to-transparent"
        />

        {/* Section Header with Left/Right Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <span className="text-xs font-extrabold text-lotus-pink uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-lotus-pink" />
              Customer Favorites
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
              Shop By <span className="text-lotus-pink">Bestsellers</span>
            </h2>
          </div>

          {/* Carousel Arrow Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={scrollLeft}
              className="p-2.5 rounded-full bg-slate-100 hover:bg-lotus-pink hover:text-white text-slate-700 transition-all cursor-pointer shadow-sm"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              className="p-2.5 rounded-full bg-slate-100 hover:bg-lotus-pink hover:text-white text-slate-700 transition-all cursor-pointer shadow-sm"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Product Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto no-scrollbar py-2 snap-x snap-mandatory scroll-smooth"
        >
          {displayItems.map((product) => (
            <div
              key={product.id}
              className="w-[260px] sm:w-[280px] flex-shrink-0 snap-start"
            >
              <ProductCard product={product} onBuyNow={onBuyNow} />
            </div>
          ))}
        </div>

        {/* Centered View All Button at Bottom of Section */}
        <div className="flex justify-center pt-10">
          <button
            onClick={() => navigateToPage('products', 'all')}
            className="flex items-center gap-2 bg-gradient-to-r from-lotus-pink to-lotus-pink-dark hover:from-lotus-pink-dark hover:to-lotus-pink text-white font-extrabold py-3.5 px-8 rounded-full shadow-lg shadow-pink-500/25 hover:scale-105 transition-all cursor-pointer text-xs sm:text-sm group"
          >
            <span>View All Bestsellers</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
