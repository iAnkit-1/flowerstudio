import React from 'react';
import { useProductsContext } from '../context/ProductsContext';
import { MapPin, Sparkles, ArrowRight } from 'lucide-react';

const categoryItems = [
  {
    id: 'flower',
    name: 'Fresh Flowers',
    tagline: 'Handpicked Stem Roses & Lilies',
    iconUrl: 'https://api.floraindia.com/upload/ZBH3UgnqXQ1777524815795.webp',
    bgGradient: 'from-rose-100 to-pink-50',
    borderColor: 'border-pink-200',
  },
  {
    id: 'hamper',
    name: 'Gift Hampers',
    tagline: 'Gourmet Baskets & Combos',
    iconUrl: 'https://giftcarnation.com/cdn/shop/products/Christmas_Gift_Hamper.png?v=1731157197',
    bgGradient: 'from-amber-100 to-amber-50',
    borderColor: 'border-amber-200',
  },
  {
    id: 'cake',
    name: 'Fresh Cakes',
    tagline: '100% Eggless & Freshly Baked',
    iconUrl: 'https://www.fnp.com/images/pr/l/v20221205202758/chocolate-rose-designer-cake-2-kg-eggless_1.jpg',
    bgGradient: 'from-orange-100 to-rose-50',
    borderColor: 'border-orange-200',
  },
  {
    id: 'plants',
    name: 'Gift Plants',
    tagline: 'Air-Purifying & Bonsai Trees',
    iconUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjeUmerHzljyTxF861DFHHzubgBTahkKHnxybdxmEFbRoUQ1NdUG1BAzw&s=10',
    bgGradient: 'from-green-100 to-emerald-50',
    borderColor: 'border-green-200',
  },
  {
    id: 'pooja',
    name: 'Pooja Essentials',
    tagline: 'Sacred Floral Garlands & Offerings',
    iconUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/8553335f-5f14-4ebc-a6b9-0534d4c0ff60.png',
    bgGradient: 'from-yellow-100 to-amber-50',
    borderColor: 'border-yellow-200',
  },
  {
    id: 'jewellery',
    name: 'Luxury Jewelry',
    tagline: 'Elegant Accessories & Keepsakes',
    iconUrl: 'https://www.crunchyfashion.com/cdn/shop/files/CFFS0074_1.jpg?v=1735063148',
    bgGradient: 'from-purple-100 to-pink-50',
    borderColor: 'border-purple-200',
  },
];

export default function CategoryHeaderGrid() {
  const { navigateToPage } = useProductsContext();

  return (
    <section className="py-10 bg-gradient-to-b from-pink-50/60 via-[#FFF9FA] to-white border-b border-pink-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tricity Delivery Location Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-gradient-to-r from-lotus-pink/90 to-lotus-pink-dark text-white rounded-2xl shadow-md mb-8">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/15 backdrop-blur-md text-amber-300">
              <MapPin className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm sm:text-base tracking-tight">
                Express Delivery in Chandigarh • Mohali • Panchkula
              </h4>
              <p className="text-xs text-pink-100">
                Same-Day & 60-Minute Delivery across the entire Tricity region
              </p>
            </div>
          </div>

          <button
            onClick={() => navigateToPage('products', 'all')}
            className="flex items-center gap-1.5 bg-white text-lotus-pink font-extrabold px-4 py-2 rounded-xl text-xs shadow hover:bg-pink-50 transition-all cursor-pointer"
          >
            <span>Browse All Gifts</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Section Title */}
        <div className="text-center space-y-2 mb-8">
          <span className="text-xs font-extrabold text-lotus-pink uppercase tracking-widest bg-pink-100/70 px-3.5 py-1 rounded-full border border-pink-200/60 inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-lotus-pink" />
            India's Premium Gifting Destination
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-slate-900 leading-tight">
            Shop By <span className="text-lotus-pink">Category</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Select a category to explore handpicked stem flowers, hampers, fresh cakes, and plants.
          </p>
        </div>

        {/* Categories Icon Grid (Transparent / Backgroundless styling) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5 sm:gap-6">
          {categoryItems.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigateToPage('products', cat.id)}
              className={`group flex flex-col bg-white border ${cat.borderColor} rounded-[22px] overflow-hidden shadow-xs hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 cursor-pointer`}
            >
              {/* Full-width Image Header */}
              <div className="relative w-full aspect-square overflow-hidden bg-slate-50">
                <img
                  src={cat.iconUrl}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent" />
              </div>

              {/* Details bottom footer */}
              <div className="p-3 sm:p-4 text-left flex-grow flex flex-col justify-between space-y-1 bg-gradient-to-b from-white to-slate-50/20">
                <div className="space-y-0.5">
                  <h3 className="font-sans font-extrabold text-slate-900 text-xs sm:text-sm group-hover:text-lotus-pink transition-colors line-clamp-1">
                    {cat.name}
                  </h3>
                  <p className="text-[10px] text-slate-500 font-medium line-clamp-1">
                    {cat.tagline}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-1 text-[10px] font-extrabold text-lotus-pink transition-transform duration-300 group-hover:translate-x-1">
                  <span>Explore</span>
                  <span className="text-xs">→</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
