import React from 'react';
import ProductCard from '../components/ProductCard';
import SectionBanner from '../components/SectionBanner';
import { useProductsContext } from '../context/ProductsContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CategoryProductsSection({
  targetCategory,
  title,
  subtitle,
  bannerBadge,
  bannerTitle,
  bannerSubtitle,
  bannerImage,
  gradientOverlay = 'from-slate-950/85 via-slate-950/50 to-transparent',
  onBuyNow,
}) {
  const { products, navigateToPage } = useProductsContext();

  // Filter all products for this category
  const categoryProducts = products.filter((p) => {
    const cat = p.category ? p.category.toLowerCase().trim() : '';
    const target = targetCategory.toLowerCase().trim();

    if (target === 'flower' || target === 'flowers' || target === 'bouquets') {
      return cat === 'flower' || cat === 'flowers' || cat === 'bouquets';
    }
    if (target === 'hamper' || target === 'hampers') {
      return cat === 'hamper' || cat === 'hampers';
    }
    if (target === 'cake' || target === 'cakes') {
      return cat === 'cake' || cat === 'cakes';
    }
    if (target === 'plant' || target === 'plants') {
      return cat === 'plant' || cat === 'plants';
    }
    return cat === target;
  });

  if (categoryProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-10 bg-white relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Preceding E-Commerce Banner */}
        <SectionBanner
          badge={bannerBadge}
          title={bannerTitle}
          subtitle={bannerSubtitle}
          image={bannerImage}
          ctaText={`View All ${title}`}
          onCtaClick={() => navigateToPage('products', targetCategory)}
          gradientOverlay={gradientOverlay}
        />

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div className="space-y-1">
            <span className="text-xs font-extrabold text-lotus-pink uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-lotus-pink" />
              Curated Collection
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-lg">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Multi-row 4 Cards per row Grid displaying ALL category products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} onBuyNow={onBuyNow} />
          ))}
        </div>

        {/* Centered View All Button */}
        <div className="flex justify-center pt-8">
          <button
            onClick={() => navigateToPage('products', targetCategory)}
            className="flex items-center gap-2 bg-gradient-to-r from-lotus-pink to-lotus-pink-dark hover:from-lotus-pink-dark hover:to-lotus-pink text-white font-extrabold py-3.5 px-8 rounded-full shadow-lg shadow-pink-500/20 hover:scale-105 transition-all cursor-pointer text-xs sm:text-sm group"
          >
            <span>Explore All {title}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
