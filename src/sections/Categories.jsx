import React from 'react';

const categoryPresets = [
  { id: 'all', name: 'All Collections', image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=400' },
  { id: 'flower', name: 'Fresh Flowers', image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=400' },
  { id: 'hamper', name: 'Gift Hampers', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=400' },
  { id: 'cake', name: 'Delicious Cakes', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=400' },
  { id: 'plants', name: 'Gift Plants', image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&q=80&w=400' },
  { id: 'pooja', name: 'Pooja Items', image: 'https://images.unsplash.com/photo-1534009502677-4e5080efa8c6?auto=format&fit=crop&q=80&w=400' },
  { id: 'jewellery', name: 'Luxury Jewelry', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=400' },
];

export default function Categories({ activeCategory, onSelectCategory, availableCategories = [] }) {
  const handleCategoryClick = (catId) => {
    onSelectCategory(catId);
    const element = document.querySelector('#products');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const displayCategories = availableCategories.length > 0
    ? categoryPresets.filter(c => c.id === 'all' || availableCategories.includes(c.id))
    : categoryPresets;

  return (
    <section id="categories" className="py-16 bg-[#FFF9FA] relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-10 right-[-5%] w-72 h-72 rounded-full bg-pink-100/30 filter blur-3xl -z-10" />
      <div className="absolute bottom-10 left-[-5%] w-72 h-72 rounded-full bg-green-100/30 filter blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-extrabold text-lotus-pink uppercase tracking-widest bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
            Handcrafted Offerings
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-slate-900 leading-tight">
            Shop By <span className="text-lotus-pink">Category</span>
          </h2>
          <p className="text-sm text-slate-500 max-w-lg mx-auto">
            Choose from our premium collections, freshly gathered and curated to make every occasion memorable.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
          {displayCategories.map((cat) => {
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`group relative aspect-square rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer border-2 ${
                  isActive
                    ? 'border-lotus-pink shadow-lg shadow-pink-500/15 scale-[1.02]'
                    : 'border-transparent hover:border-pink-200'
                }`}
              >
                {/* Background Image */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Dark Gradient Overlay */}
                <div className={`absolute inset-0 transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-t from-lotus-pink/90 via-slate-950/40 to-transparent'
                    : 'bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent group-hover:from-slate-950/90'
                }`} />

                {/* Card Title */}
                <div className="absolute inset-0 p-3.5 flex flex-col justify-end text-left z-10">
                  <span className="font-sans font-extrabold text-xs text-white tracking-wider uppercase leading-snug">
                    {cat.name}
                  </span>
                  <span className="text-[9px] text-amber-300 font-extrabold uppercase tracking-wider mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
