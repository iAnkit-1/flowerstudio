import React from 'react';
import { categories } from '../data/mockData';

export default function Categories({ activeCategory, onSelectCategory }) {
  const handleCategoryClick = (categoryId) => {
    // Set activeCategory to 'all' to show all sections, then scroll to the specific category section
    onSelectCategory('all');

    setTimeout(() => {
      let targetId = '#products';
      if (categoryId === 'flowers' || categoryId === 'bouquets') {
        targetId = '#section-flowers-bouquets';
      } else if (categoryId === 'hampers') {
        targetId = '#section-hampers';
      } else if (categoryId === 'plants') {
        targetId = '#section-plants';
      } else if (categoryId === 'cakes') {
        targetId = '#section-cakes';
      } else if (categoryId === 'pooja') {
        targetId = '#section-pooja';
      }

      const element = document.querySelector(targetId);
      if (element) {
        const offset = 100;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  return (
    <section id="categories" className="py-16 bg-slate-55 relative overflow-hidden">
      {/* Decorative background flowers */}
      <div className="absolute top-10 right-[-5%] w-72 h-72 rounded-full bg-lotus-pink-light/20 filter blur-3xl -z-10"></div>
      <div className="absolute bottom-10 left-[-5%] w-72 h-72 rounded-full bg-lotus-green-light/20 filter blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold text-lotus-pink uppercase tracking-widest">Handcrafted Offerings</span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-slate-900 leading-tight">
            Shop By <span className="text-lotus-pink">Category</span>
          </h2>
          <p className="text-sm text-slate-500 max-w-lg mx-auto">
            Choose from our premium collections, freshly gathered and curated to make your special moments extra memorable.
          </p>
        </div>

        {/* Categories Grid (Squared shapes, full bleed images, no white boxes) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-5">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`group relative aspect-square rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-350 cursor-pointer border-2 ${
                  isActive
                    ? 'border-lotus-pink shadow-lg shadow-pink-500/10'
                    : 'border-transparent hover:border-lotus-pink-light'
                }`}
              >
                {/* Full Square Image */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Dark/Gradient Overlay */}
                <div className={`absolute inset-0 transition-all duration-350 ${
                  isActive
                    ? 'bg-gradient-to-t from-lotus-pink/90 via-slate-950/40 to-transparent'
                    : 'bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent group-hover:from-slate-950/90'
                }`}></div>

                {/* Content (Name & Indicator) */}
                <div className="absolute inset-0 p-4 flex flex-col justify-end text-left z-10">
                  <span className="font-sans font-bold text-xs text-white tracking-wider uppercase leading-snug">
                    {cat.name}
                  </span>
                  <span className="text-[9px] text-lotus-green font-bold uppercase tracking-wider mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {isActive ? 'Selected ✓' : 'Explore →'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
