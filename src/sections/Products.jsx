import React, { useState, useMemo, useEffect } from 'react';
import { Search, Star, ShoppingCart, MessageSquare, X, Check, ArrowRight, ArrowUpDown, ChevronLeft, AlertCircle } from 'lucide-react';
import { products, categories } from '../data/mockData';

const sectionsConfig = [
  {
    id: 'flowers-bouquets',
    title: 'Best Selling Flowers & Bouquets',
    description: 'Handpicked fresh blossoms and wrapped floral arrangements.',
    categories: ['flowers', 'bouquets'],
    catId: 'flowers',
    viewAllLabel: 'Flowers & Bouquets'
  },
  {
    id: 'hampers',
    title: 'Hampers and Gifts',
    description: 'Curated gift collections and surprise baskets for your loved ones.',
    categories: ['hampers'],
    catId: 'hampers',
    viewAllLabel: 'Hampers & Gifts'
  },
  {
    id: 'plants',
    title: 'Plants For Every Vibe',
    description: 'Beautiful air-purifying plants and Bonsai to liven up any space.',
    categories: ['plants'],
    catId: 'plants',
    viewAllLabel: 'Plants'
  },
  {
    id: 'cakes',
    title: 'Bakery-Fresh Cakes',
    description: 'Deliciously soft, fresh-baked cakes for every special celebration.',
    categories: ['cakes'],
    catId: 'cakes',
    viewAllLabel: 'Cakes'
  },
  {
    id: 'pooja',
    title: 'Sacred Pooja Essentials',
    description: 'Fresh floral garlands and traditional offerings for festive prayers.',
    categories: ['pooja'],
    catId: 'pooja',
    viewAllLabel: 'Pooja Essentials'
  }
];

function ProductCard({ product, onAddToCart, isAdded, onOpenProduct }) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  useEffect(() => {
    if (images.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setActiveImageIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500);

    return () => clearInterval(interval);
  }, [images.length, isPaused]);

  return (
    <div
      className="group relative flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        setActiveImageIdx(0);
      }}
    >
      {/* Clickable Image Box */}
      <div className="relative pt-[100%] overflow-hidden bg-slate-100">
        {images.map((img, idx) => {
          const isActive = idx === activeImageIdx;
          return (
            <img
              key={idx}
              src={img}
              alt={`${product.name} - View ${idx + 1}`}
              onClick={() => onOpenProduct(product)}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out cursor-pointer ${
                isActive ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'
              }`}
              loading="lazy"
            />
          );
        })}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none z-20"></div>
        
        {/* Category Label */}
        <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-lotus-pink text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm border border-pink-50/20 z-20">
          {product.category}
        </span>

        {/* Stock status */}
        {!product.inStock && (
          <span className="absolute inset-0 bg-slate-900/60 flex items-center justify-center text-white font-bold text-sm tracking-wide z-20">
            Out of Stock
          </span>
        )}

        {/* Clickable image thumbnails visible at the bottom of the card image container */}
        {product.inStock && images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-20">
            <div className="flex gap-1.5 bg-black/45 backdrop-blur-sm px-2 py-1.5 rounded-full shadow-md">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIdx(idx);
                  }}
                  onMouseEnter={() => setActiveImageIdx(idx)}
                  className={`relative w-7 h-7 rounded-full overflow-hidden border transition-all cursor-pointer ${
                    idx === activeImageIdx
                      ? 'border-lotus-pink scale-110 shadow-sm'
                      : 'border-white/70 opacity-80 hover:opacity-100 hover:scale-105'
                  }`}
                  title={`View image ${idx + 1}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Info block */}
      <div className="flex-grow p-5 flex flex-col justify-between">
        {/* Clickable info detail area */}
        <div 
          onClick={() => onOpenProduct(product)}
          className="space-y-2 cursor-pointer"
        >
          {/* Rating details */}
          <div className="flex items-center gap-1">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 fill-current ${
                    i < Math.floor(product.rating) ? 'text-amber-400' : 'text-slate-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-slate-500">{product.rating}</span>
            <span className="text-[10px] text-slate-450">({product.reviewsCount})</span>
          </div>

          {/* Title */}
          <h3 className="font-sans font-bold text-slate-800 text-base leading-snug group-hover:text-lotus-pink transition-colors truncate">
            {product.name}
          </h3>

          {/* Description short block */}
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price and Cart controls */}
        <div className="pt-4 mt-4 border-t border-slate-50 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-450 uppercase font-semibold">Price</span>
            <span className="text-lg font-extrabold text-slate-800">₹{product.price}</span>
          </div>

          {product.inStock ? (
            <button
              onClick={() => onAddToCart(product)}
              disabled={isAdded}
              className={`relative flex items-center justify-center p-3 rounded-2xl cursor-pointer transition-all duration-300 border ${
                isAdded
                  ? 'bg-lotus-green text-white border-lotus-green shadow-md shadow-green-100'
                  : 'bg-lotus-pink-light/50 hover:bg-gradient-to-r hover:from-lotus-pink hover:to-lotus-pink-dark text-lotus-pink hover:text-white border-transparent hover:scale-105'
              }`}
              title="Add to Cart"
            >
              {isAdded ? (
                <Check className="w-5 h-5 animate-scaleIn" />
              ) : (
                <ShoppingCart className="w-5 h-5" />
              )}
            </button>
          ) : (
            <button
              onClick={() => onOpenProduct(product)}
              className="flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-lotus-pink border border-slate-200 hover:border-lotus-pink px-2.5 py-1.5 rounded-xl transition-colors cursor-pointer"
            >
              Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Products({ cart, onAddToCart, activeCategory, onSelectCategory }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [successAnimationId, setSuccessAnimationId] = useState(null);
  const [modalActiveImageIdx, setModalActiveImageIdx] = useState(0);

  // Checkout Form States inside Modal
  const [checkoutMode, setCheckoutMode] = useState(false);
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [custAddress, setCustAddress] = useState('');
  const [custSector, setCustSector] = useState('');
  const [custPincode, setCustPincode] = useState('');
  const [formError, setFormError] = useState('');

  const handleAddToCart = (product) => {
    onAddToCart(product);
    setSuccessAnimationId(product.id);
    setTimeout(() => {
      setSuccessAnimationId(null);
    }, 1500);
  };

  const handleCategoryPillClick = (catId) => {
    if (catId === 'all') {
      onSelectCategory('all');
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
      return;
    }

    if (activeCategory !== 'all') {
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
      return;
    }

    let targetId = '#products';
    if (catId === 'flowers' || catId === 'bouquets') {
      targetId = '#section-flowers-bouquets';
    } else if (catId === 'hampers') {
      targetId = '#section-hampers';
    } else if (catId === 'plants') {
      targetId = '#section-plants';
    } else if (catId === 'cakes') {
      targetId = '#section-cakes';
    } else if (catId === 'pooja') {
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
  };



  const handleOpenProduct = (product) => {
    setSelectedProduct(product);
    setModalActiveImageIdx(0);
    setCheckoutMode(false);
    setFormError('');
    setCustName('');
    setCustPhone('');
    setCustAddress('');
    setCustSector('');
    setCustPincode('');
  };

  const handleWhatsAppOrderSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    // Validations
    if (!custName.trim() || !custPhone.trim() || !custAddress.trim() || !custSector.trim() || !custPincode.trim()) {
      setFormError('All fields are required.');
      return;
    }

    if (!/^\d{10}$/.test(custPhone.trim())) {
      setFormError('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!/^160\d{3}$/.test(custPincode.trim())) {
      setFormError('We only deliver within Chandigarh (Pincode must start with 160).');
      return;
    }

    // Compile message for WhatsApp
    const message = `Hello Flower Studio! I would like to place an order:

*Product:* ${selectedProduct.name}
*Price:* ₹${selectedProduct.price}

*Delivery Details:*
*Name:* ${custName.trim()}
*Phone:* ${custPhone.trim()}
*Address:* ${custAddress.trim()}
*Sector:* ${custSector.trim()}
*Pincode:* ${custPincode.trim()}

*Payment Mode:* Cash on Delivery (COD)

Please confirm my order.`;

    const whatsappLink = `https://wa.me/919815493338?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
    
    // Close modal
    setSelectedProduct(null);
  };

  return (
    <section id="products" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto space-y-3 mb-12 text-center">
          <span className="text-xs font-bold text-lotus-pink uppercase tracking-widest">Fresh Collection</span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-slate-900 leading-tight">
            Our Signature <span className="text-lotus-pink">Creations</span>
          </h2>
          <p className="text-sm text-slate-500 max-w-lg mx-auto">
            Each piece is custom crafted by master florists and bakers using the freshest ingredients and blossoms.
          </p>
        </div>

        {/* Stacked Layout or Single Category Section */}
        <div className="space-y-20">
          {activeCategory !== 'all' && (
            <div className="mb-6 flex justify-between items-center bg-slate-55 p-4 rounded-2xl border border-slate-100">
              <span className="text-xs text-slate-500 font-semibold">
                Viewing isolated category.
              </span>
              <button
                onClick={() => onSelectCategory('all')}
                className="text-xs font-bold text-lotus-pink hover:text-lotus-pink-dark hover:underline flex items-center gap-1 cursor-pointer"
              >
                ← Show All Collections
              </button>
            </div>
          )}

          {sectionsConfig
              .filter(sec => activeCategory === 'all' || sec.categories.includes(activeCategory))
              .map((sec) => {
                // Filter products matching this section
                let sectionProducts = products.filter(p => {
                  if (activeCategory === 'all') {
                    return sec.categories.includes(p.category);
                  } else {
                    return p.category === activeCategory;
                  }
                });

                // Limit display to 4 items in stacked 'all' mode
                const showLimit = activeCategory === 'all' ? 4 : undefined;
                const visibleProducts = showLimit ? sectionProducts.slice(0, showLimit) : sectionProducts;

                if (sectionProducts.length === 0) return null;

                return (
                  <div key={sec.id} id={`section-${sec.id}`} className="scroll-mt-28 space-y-6">
                    {/* Section Header */}
                    <div className="border-b border-slate-100 pb-4">
                      <div className="space-y-1 text-left">
                        <h3 className="font-serif font-bold text-2xl text-slate-900 leading-tight">
                          {sec.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-500">
                          {sec.description}
                        </p>
                      </div>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                      {visibleProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onAddToCart={handleAddToCart}
                          isAdded={successAnimationId === product.id}
                          onOpenProduct={handleOpenProduct}
                        />
                      ))}
                    </div>

                    {/* Centered Pink View All Button */}
                    {activeCategory === 'all' && (
                      <div className="flex justify-center pt-8">
                        <button
                          onClick={() => {
                            onSelectCategory(sec.catId);
                            // Scroll to top of products catalog
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
                          }}
                          className="flex items-center gap-2 bg-gradient-to-r from-lotus-pink to-lotus-pink-dark hover:from-lotus-pink-dark hover:to-lotus-pink text-white font-bold py-3.5 px-8 rounded-full shadow-md shadow-pink-500/10 hover:shadow-pink-500/25 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer text-xs md:text-sm group/viewall"
                        >
                          <span>View All {sec.viewAllLabel}</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover/viewall:translate-x-1" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
      </div>

      {/* Product Details Modal Dialog */}
      {selectedProduct && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedProduct(null)}
          ></div>

          {/* Modal Container */}
          <div className="relative bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl z-10 border border-slate-100 animate-scaleIn">
            
            {/* Close button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/10 text-slate-600 hover:bg-slate-900/20 hover:text-slate-800 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Split Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              
              {/* Product Visual */}
              <div className="relative h-64 md:h-full min-h-[350px] bg-slate-100 flex flex-col justify-between p-4">
                {/* Main image container */}
                <div className="absolute inset-0">
                  <img
                    src={
                      selectedProduct.images && selectedProduct.images.length > 0
                        ? selectedProduct.images[modalActiveImageIdx]
                        : selectedProduct.image
                    }
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent"></div>
                </div>

                {/* Category Label */}
                <span className="absolute top-4 left-4 bg-gradient-to-r from-lotus-pink to-lotus-pink-dark text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md z-10">
                  {selectedProduct.category}
                </span>

                {/* Small thumbnails overlay for modal */}
                {selectedProduct.images && selectedProduct.images.length > 1 && (
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                    <div className="flex gap-2 bg-black/45 backdrop-blur-sm px-2.5 py-2 rounded-xl shadow-md border border-white/5">
                      {selectedProduct.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setModalActiveImageIdx(idx)}
                          className={`relative w-10 h-10 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                            idx === modalActiveImageIdx
                              ? 'border-lotus-pink scale-105 shadow-sm'
                              : 'border-white/50 opacity-80 hover:opacity-100 hover:scale-102'
                          }`}
                          title={`View angle ${idx + 1}`}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Details Content / Checkout Form */}
              <div className="p-6 md:p-8 flex flex-col justify-between min-h-[420px] max-h-[90vh] overflow-y-auto no-scrollbar">
                
                {!checkoutMode ? (
                  /* STEP 1: Product details specification view */
                  <div className="space-y-4 flex-grow flex flex-col justify-between">
                    <div className="space-y-4">
                      {/* Rating block */}
                      <div className="flex items-center gap-1.5">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 fill-current ${
                                i < Math.floor(selectedProduct.rating) ? 'text-amber-400' : 'text-slate-200'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-semibold text-slate-600">{selectedProduct.rating}</span>
                        <span className="text-xs text-slate-400">({selectedProduct.reviewsCount} reviews)</span>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif font-bold text-2xl text-slate-900 leading-snug">
                        {selectedProduct.name}
                      </h3>

                      {/* Pricing tag */}
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-slate-900">₹{selectedProduct.price}</span>
                        <span className="text-xs text-slate-400">inclusive of all taxes</span>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {selectedProduct.description}
                      </p>

                      {/* Bullet Spec Highlights */}
                      {selectedProduct.features && (
                        <div className="space-y-1.5 pt-2">
                          <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">Included Features:</span>
                          <ul className="grid grid-cols-1 gap-1.5 text-xs text-slate-600">
                            {selectedProduct.features.map((feature, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-lotus-pink"></span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Buy options bottom row */}
                    <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => {
                          handleAddToCart(selectedProduct);
                          setSelectedProduct(null);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 px-5 rounded-xl transition-all cursor-pointer text-sm"
                      >
                        <ShoppingCart className="w-4 h-4 text-lotus-pink" />
                        <span>Add To Cart</span>
                      </button>

                      <button
                        onClick={() => setCheckoutMode(true)}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-lotus-pink to-lotus-pink-dark text-white font-bold py-3 px-5 rounded-xl hover:opacity-95 shadow-md shadow-pink-100 hover:scale-[1.01] transition-all cursor-pointer text-sm"
                      >
                        <MessageSquare className="w-4.5 h-4.5 text-lotus-green" />
                        <span>WhatsApp Order</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* STEP 2: Checkout details Form */
                  <div className="space-y-4 flex-grow flex flex-col justify-between">
                    <div>
                      {/* Back header */}
                      <button
                        onClick={() => setCheckoutMode(false)}
                        className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-lotus-pink transition-colors font-bold mb-3 cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Back to details</span>
                      </button>

                      <h3 className="font-serif font-bold text-lg text-slate-900">Delivery Information</h3>
                      <p className="text-[11px] text-slate-450 mt-1">Provide your Chandigarh delivery details to place the order via WhatsApp.</p>
                      
                      {/* Form body */}
                      <form onSubmit={handleWhatsAppOrderSubmit} className="space-y-3 mt-4">
                        {/* Name */}
                        <div>
                          <label className="text-[10px] font-bold text-slate-550 uppercase tracking-wide block mb-1">Your Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="Full Name"
                            value={custName}
                            onChange={(e) => setCustName(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-lotus-pink text-xs bg-slate-50"
                          />
                        </div>

                        {/* Phone */}
                        <div>
                          <label className="text-[10px] font-bold text-slate-550 uppercase tracking-wide block mb-1">Mobile Number *</label>
                          <input
                            type="tel"
                            maxLength={10}
                            required
                            placeholder="10-Digit Mobile"
                            value={custPhone}
                            onChange={(e) => setCustPhone(e.target.value.replace(/\D/g, ''))}
                            className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-lotus-pink text-xs bg-slate-50"
                          />
                        </div>

                        {/* Sector & Address */}
                        <div className="grid grid-cols-3 gap-2">
                          <div className="col-span-2">
                            <label className="text-[10px] font-bold text-slate-550 uppercase tracking-wide block mb-1">Address *</label>
                            <input
                              type="text"
                              required
                              placeholder="House No, Street, Colony"
                              value={custAddress}
                              onChange={(e) => setCustAddress(e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-lotus-pink text-xs bg-slate-50"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-slate-550 uppercase tracking-wide block mb-1">Sector *</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. 29B"
                              value={custSector}
                              onChange={(e) => setCustSector(e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-lotus-pink text-xs bg-slate-50"
                            />
                          </div>
                        </div>

                        {/* Pincode & Payment */}
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] font-bold text-slate-550 uppercase tracking-wide block mb-1">Pincode *</label>
                            <input
                              type="text"
                              maxLength={6}
                              required
                              placeholder="e.g. 160029"
                              value={custPincode}
                              onChange={(e) => setCustPincode(e.target.value.replace(/\D/g, ''))}
                              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-lotus-pink text-xs bg-slate-50"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-bold text-slate-550 uppercase tracking-wide block mb-1">Payment Mode</label>
                            <div className="w-full px-3 py-2 border border-slate-250 bg-slate-100 rounded-xl text-xs font-bold text-slate-700 flex items-center">
                              Cash on Delivery (COD)
                            </div>
                          </div>
                        </div>

                        {/* Error box */}
                        {formError && (
                          <div className="bg-rose-50 text-rose-800 p-2.5 rounded-lg text-xs flex items-center gap-1.5 border border-rose-100 mt-1">
                            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
                            <span>{formError}</span>
                          </div>
                        )}

                        {/* Note about payments */}
                        <p className="text-[10px] text-slate-400 italic leading-normal pt-1 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                          💡 <strong>Note:</strong> Cash or UPI can be paid to delivery agent. You can also make online payment and send the screenshot here once order is confirmed.
                        </p>
                      </form>
                    </div>

                    {/* Checkout CTA */}
                    <div className="pt-4 border-t border-slate-100 flex gap-2">
                      <button
                        onClick={handleWhatsAppOrderSubmit}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-lotus-green-dark to-lotus-green text-white font-bold py-3.5 rounded-xl hover:opacity-95 shadow-md shadow-green-200 transition-all cursor-pointer text-sm"
                      >
                        <MessageSquare className="w-4.5 h-4.5 text-white" />
                        <span>Place Order via WhatsApp</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
