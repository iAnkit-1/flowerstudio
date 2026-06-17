import React, { useState, useEffect } from 'react';
import { ArrowRight, MessageSquare } from 'lucide-react';

const slides = [
  {
    subtitle: 'Vibrant & Sourced Daily',
    title: 'Fresh Flowers Collection',
    description: 'Beautiful stems of fresh roses, lilies, chrysanthemums, and exotic blossoms. Hand-delivered in Chandigarh to brighten your home.',
    image: 'https://www.dialabouquet.in/wp-content/uploads/2018/01/floralcare.jpg',
    ctaText: 'Explore Flowers',
    ctaLink: '#products',
    category: 'flowers',
    overlayGradient: 'from-rose-950/90 via-pink-950/85 to-slate-950/60',
    ctaBtnClass: 'bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-700 hover:to-rose-600 shadow-red-500/20 hover:shadow-red-500/40',
  },
  {
    subtitle: 'Handcrafted With Love',
    title: 'Exquisite Hand-Tied Bouquets',
    description: 'Premium red roses, carnations, and orchids beautifully wrapped in custom craft paper with elegant satin bows.',
    image: 'https://asset.bloomnation.com/c_pad,d_vendor:global:catalog:product:image.png,f_auto,fl_preserve_transparency,q_auto/v1769046603/vendor/1526/catalog/product/2/0/20180109110540_file_5a554ac4dd0bb.jpg',
    ctaText: 'Explore Bouquets',
    ctaLink: '#products',
    category: 'bouquets',
    overlayGradient: 'from-red-950/90 via-rose-900/80 to-slate-950/60',
    ctaBtnClass: 'bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-700 hover:to-rose-600 shadow-red-500/20 hover:shadow-red-500/40',
  },
  {
    subtitle: 'Luxury Gifting Made Easy',
    title: 'Celebration Gift Hampers',
    description: 'Perfect combinations of fresh roses, premium chocolates, gourmet snacks, and treats curated in gorgeous wicker baskets.',
    image: 'https://media.istockphoto.com/id/1194701182/photo/gift-hamper-bouquet-of-red-roses-bottle-of-champagne-on-black.jpg?s=612x612&w=0&k=20&c=2uVinKtX_KAYShymops4aT2QaB854r9bCrvwJ7Zsn40=',
    ctaText: 'Explore Hampers',
    ctaLink: '#products',
    category: 'hampers',
    overlayGradient: 'from-purple-950/90 via-indigo-950/85 to-pink-950/60',
    ctaBtnClass: 'bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 shadow-purple-500/20 hover:shadow-purple-500/40',
  },
  {
    subtitle: '100% Eggless & Baked Fresh',
    title: 'Bakery-Fresh Celebration Cakes',
    description: 'Celebrate birthdays and anniversaries with delicious black forest, red velvet, and chocolate truffle cakes baked fresh on order.',
    image: 'https://media.istockphoto.com/id/497959594/photo/fresh-cakes.jpg?s=612x612&w=0&k=20&c=T1vp7QPbg6BY3GE-qwg-i_SqVpstyHBMIwnGakdTTek=',
    ctaText: 'Explore Cakes',
    ctaLink: '#products',
    category: 'cakes',
    overlayGradient: 'from-amber-950/90 via-orange-950/80 to-slate-950/60',
    ctaBtnClass: 'bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 shadow-orange-500/20 hover:shadow-orange-500/40',
  },
  {
    subtitle: 'Special Surprises for Any Event',
    title: 'Thoughtful Curated Gifts',
    description: 'Delightful gift hampers, premium chocolates, custom message cards, and gorgeous combos to touch the hearts of your loved ones.',
    image: 'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_487/at%2Forganize-clean%2F2023%2FStock%2FCustom%20Stock%20Shoots%2F2023-11-gift-exchange%2Fhow-to-wrap-a-present-346',
    ctaText: 'Browse Gifts',
    ctaLink: '#products',
    category: 'hampers',
    overlayGradient: 'from-indigo-950/90 via-purple-950/80 to-rose-950/60',
    ctaBtnClass: 'bg-gradient-to-r from-indigo-600 to-purple-500 hover:from-indigo-700 hover:to-purple-600 shadow-indigo-500/20 hover:shadow-indigo-500/40',
  },
  {
    subtitle: 'Give the Gift of Life & Air',
    title: 'Lush Indoor Gift Plants',
    description: 'Bring positive energy and fresh air indoors with air-purifying Peace Lilies, Bonsai trees, and jade plants in elegant ceramic pots.',
    image: 'https://hips.hearstapps.com/hmg-prod/images/collection-of-beautiful-houseplants-on-wooden-table-royalty-free-image-1712685460.jpg?crop=1xw:0.84415xh;0,0.195xh',
    ctaText: 'Explore Plants',
    ctaLink: '#products',
    category: 'plants',
    overlayGradient: 'from-emerald-950/90 via-green-950/80 to-slate-950/60',
    ctaBtnClass: 'bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 shadow-green-500/20 hover:shadow-green-500/40',
  }
];

export default function Hero({ onSelectCategory }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleCtaClick = (e, target, category) => {
    e.preventDefault();
    if (category) {
      onSelectCategory(category);
    }
    const element = document.querySelector(target);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative w-full h-[520px] md:h-[620px] overflow-hidden bg-slate-950 border-b border-slate-900">
      {/* Slides Container */}
      <div className="w-full h-full relative">
        {slides.map((slide, idx) => {
          const isActive = idx === current;
          return (
            <div
              key={idx}
              className={`absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105 pointer-events-none'
              }`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Tinted Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.overlayGradient}`}></div>

              {/* Slide Content */}
              <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-full z-20">
                <div className={`max-w-2xl text-left space-y-4 md:space-y-6 transition-all duration-700 delay-300 transform ${
                  isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}>
                  
                  {/* Subtitle Badge */}
                  <div className="inline-flex items-center gap-2 rounded-full py-1.5 px-4 text-xs font-semibold uppercase tracking-wider bg-white/10 text-white border border-white/20 backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-lotus-pink animate-pulse"></span>
                    <span>{slide.subtitle}</span>
                  </div>

                  {/* Title */}
                  <h1 className="font-serif font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight">
                    {slide.title}
                  </h1>

                  {/* Description */}
                  <p className="text-slate-200 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl font-medium">
                    {slide.description}
                  </p>

                  {/* CTA Buttons */}
                  <div className="pt-2 flex flex-wrap gap-4 items-center">
                    <a
                      href={slide.ctaLink}
                      onClick={(e) => handleCtaClick(e, slide.ctaLink, slide.category)}
                      className={`flex items-center gap-2 text-white font-bold py-3.5 px-8 rounded-full shadow-lg transition-all hover:scale-105 cursor-pointer text-xs md:text-sm ${slide.ctaBtnClass}`}
                    >
                      <span>{slide.ctaText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>

                    <a
                      href="https://wa.me/919815493338?text=Hello%20Flower%20Studio!%20I%20am%20interested%20in%20fresh%20flower%20delivery%20in%20Chandigarh."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold py-3.5 px-6 rounded-full transition-all hover:scale-105 cursor-pointer text-xs md:text-sm backdrop-blur-sm"
                    >
                      <MessageSquare className="w-4 h-4 text-green-400 fill-green-400/20" />
                      <span>WhatsApp Inquiry</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Indicator Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2.5">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              idx === current ? 'bg-white w-7' : 'bg-white/40 hover:bg-white/60 w-2.5'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
}
