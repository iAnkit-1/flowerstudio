import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useProductsContext } from '../context/ProductsContext';
import { useProduct } from '../api/productsApi';
import ProductCard from '../components/ProductCard';
import { isProductAvailable, redirectToWhatsAppOrderRequest } from '../utils/whatsapp';
import {
  Tag,
  Sparkles,
  Truck,
  Info,
  Calendar,
  MapPin,
  Clock,
  ShieldCheck,
  Share2,
  Check,
  Plus,
  Minus,
  ShoppingCart,
  MessageCircle,
  Maximize2,
  X,
  ArrowLeft,
  AlertCircle,
  Flame,
  ChevronRight,
  ChevronLeft,
  Package,
  ArrowRight,
} from 'lucide-react';

export default function ProductDetailPage({ productId, onAddToCart, onBuyNow }) {
  const { products, navigateToPage, navigateToProduct } = useProductsContext();

  // Try finding product in existing context catalog, or fetch by ID via TanStack Query
  const contextProduct = useMemo(() => {
    if (!productId || !products.length) return null;
    return products.find((p) => String(p.id) === String(productId)) || null;
  }, [productId, products]);

  const { data: fetchedProduct, isLoading, isError, error } = useProduct(!contextProduct ? productId : null);

  const product = contextProduct || fetchedProduct;

  // Available images
  const images = useMemo(() => {
    if (!product) return [];
    if (Array.isArray(product.images) && product.images.length > 0) {
      return product.images.filter((img) => img && typeof img === 'string');
    }
    if (product.image) return [product.image];
    return ['https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=800'];
  }, [product]);

  // Selected image gallery state
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isAutoPlayPaused, setIsAutoPlayPaused] = useState(false);

  // Delivery preferences state
  const [deliveryDateOption, setDeliveryDateOption] = useState('today'); // 'today' | 'tomorrow' | 'later'
  const [customLaterDate, setCustomLaterDate] = useState('');
  const [pincode, setPincode] = useState('');
  const dateInputRef = useRef(null);

  // Expected Delivery Time Slots
  const deliveryTimeSlots = [
    { id: 'evening', label: '5:00 PM - 8:00 PM', tag: 'Standard Evening' },
    { id: 'afternoon', label: '1:00 PM - 5:00 PM', tag: 'Afternoon' },
    { id: 'morning', label: '9:00 AM - 1:00 PM', tag: 'Morning Slot' },
    { id: 'midnight', label: '11:30 PM - 12:15 AM', tag: 'Midnight Surprise' },
  ];
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  // Options & combos (e.g. cake weight or size variants)
  const [selectedCombo, setSelectedCombo] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);

  // Reset image index and state when product changes
  useEffect(() => {
    setSelectedImageIdx(0);
    setQuantity(1);
    setSelectedTimeSlot(null);
    setIsAutoPlayPaused(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [productId]);

  // Auto-play slideshow when there are multiple images (with smooth animation)
  useEffect(() => {
    if (images.length <= 1 || isLightboxOpen || isAutoPlayPaused) return;

    const intervalId = setInterval(() => {
      setSelectedImageIdx((prev) => (prev + 1) % images.length);
    }, 3800);

    return () => clearInterval(intervalId);
  }, [images.length, isLightboxOpen, isAutoPlayPaused]);

  // Lock body scroll and enable keyboard navigation (ESC, ArrowLeft, ArrowRight) when lightbox modal is open
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (e.key === 'ArrowLeft') {
        setSelectedImageIdx((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      } else if (e.key === 'ArrowRight') {
        setSelectedImageIdx((prev) => (prev < images.length - 1 ? prev + 1 : 0));
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLightboxOpen, images]);

  // Dynamic pricing with combos
  const basePrice = useMemo(() => {
    if (!product) return 0;
    if (selectedCombo && typeof selectedCombo.price === 'number') {
      return selectedCombo.price;
    }
    return product.price || 0;
  }, [product, selectedCombo]);

  const baseOriginalPrice = useMemo(() => {
    if (!product) return 0;
    if (selectedCombo && typeof selectedCombo.mrp === 'number') {
      return selectedCombo.mrp;
    }
    return product.originalPrice || basePrice;
  }, [product, selectedCombo, basePrice]);

  const discountPercentage = useMemo(() => {
    if (!product) return 0;
    if (baseOriginalPrice > basePrice) {
      return Math.round(((baseOriginalPrice - basePrice) / baseOriginalPrice) * 100);
    }
    return product.discountPercentage || 0;
  }, [product, baseOriginalPrice, basePrice]);

  // Dynamic social proof count strictly between 23 and 154
  const orderedCount = useMemo(() => {
    if (!product) return 78;
    const seed = String(product.id).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const min = 23;
    const max = 154;
    return min + (seed % (max - min + 1));
  }, [product]);

  // Compute Today and Tomorrow formatted dates
  const todayFormatted = useMemo(() => {
    const d = new Date();
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  }, []);

  const tomorrowFormatted = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  }, []);

  const todayDateIso = useMemo(() => {
    return new Date().toISOString().split('T')[0];
  }, []);

  const formattedLaterDate = useMemo(() => {
    if (!customLaterDate) return '';
    const parts = customLaterDate.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const d = new Date(year, month, day);
      return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    }
    return customLaterDate;
  }, [customLaterDate]);

  const activeDeliveryDateString = useMemo(() => {
    if (deliveryDateOption === 'today') return `Today (${todayFormatted})`;
    if (deliveryDateOption === 'tomorrow') return `Tomorrow (${tomorrowFormatted})`;
    return formattedLaterDate ? `Later Date (${formattedLaterDate})` : 'Preferred Date';
  }, [deliveryDateOption, todayFormatted, tomorrowFormatted, formattedLaterDate]);

  const expectedDeliveryTimeString = useMemo(() => {
    return selectedTimeSlot ? `${selectedTimeSlot.label} (${selectedTimeSlot.tag})` : '';
  }, [selectedTimeSlot]);

  const totalPrice = basePrice * quantity;

  // 1. Same category products: exactly 8 cards
  const sameCategoryProducts = useMemo(() => {
    if (!product || !products.length) return [];
    const targetCategory = (product.category || '').toLowerCase().trim();
    const matches = products.filter(
      (p) => p.id !== product.id && (p.category || '').toLowerCase().trim() === targetCategory
    );
    if (matches.length >= 8) {
      return matches.slice(0, 8);
    }
    const otherMatches = products.filter(
      (p) => p.id !== product.id && !matches.some((m) => m.id === p.id)
    );
    return [...matches, ...otherMatches].slice(0, 8);
  }, [product, products]);

  // 2. You may also like: exactly 8 cards across all categories
  const allCategoryProducts = useMemo(() => {
    if (!product || !products.length) return [];
    const others = products.filter((p) => p.id !== product.id);
    return others.slice(0, 8);
  }, [product, products]);

  // Native UI Share sheet handler (opens native sharing sheet on any platform)
  const handleNativeShare = async () => {
    const shareUrl = window.location.href;
    const shareTitle = product?.name || 'Flower Studio';
    const shareText = `Check out "${product?.name}" on Flower Studio! ₹${basePrice} with fresh delivery in Chandigarh, Mohali & Panchkula.`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch (err) {
        if (err.name === 'AbortError') return; // User closed the native share dialog
      }
    }

    // Fallback: Copy link to clipboard
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      } catch (clipErr) {
        console.error('Failed to copy to clipboard:', clipErr);
      }
    }
  };

  // Add to cart click handler
  const handleAddToCart = () => {
    if (!product) return;
    const itemWithOptions = {
      ...product,
      price: basePrice,
      originalPrice: baseOriginalPrice,
      selectedCombo,
      deliveryDate: activeDeliveryDateString,
      deliveryLocation: pincode,
      expectedDeliveryTime: expectedDeliveryTimeString,
    };
    if (onAddToCart) {
      onAddToCart(itemWithOptions, quantity);
    }
  };

  // Buy now click handler
  const handleBuyNow = () => {
    if (!product) return;
    const itemWithOptions = {
      ...product,
      price: basePrice,
      originalPrice: baseOriginalPrice,
      selectedCombo,
      deliveryDate: activeDeliveryDateString,
      deliveryLocation: pincode,
      expectedDeliveryTime: expectedDeliveryTimeString,
      quantity,
    };
    if (onBuyNow) {
      onBuyNow(itemWithOptions);
    } else if (onAddToCart) {
      onAddToCart(itemWithOptions, quantity);
    }
  };

  // Trigger WhatsApp order request with location, delivery date, and expected delivery time
  const handleWhatsAppRequest = () => {
    redirectToWhatsAppOrderRequest(product, {
      deliveryLocation: pincode || '160022, Chandigarh',
      deliveryDate: activeDeliveryDateString,
      expectedDeliveryTime: expectedDeliveryTimeString,
    });
  };

  // Loading state
  if (isLoading && !product) {
    return (
      <div className="min-h-screen bg-[#FFF9FA] py-16 flex flex-col items-center justify-center space-y-4">
        <div className="w-14 h-14 border-4 border-lotus-pink border-t-transparent rounded-full animate-spin"></div>
        <p className="font-serif font-bold text-slate-700 text-lg">Curating bouquet details...</p>
      </div>
    );
  }

  // Error / Not Found state
  if ((isError || !product) && !isLoading) {
    return (
      <div className="min-h-[70vh] bg-[#FFF9FA] flex flex-col items-center justify-center px-4 py-16 text-center space-y-5">
        <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto shadow-sm">
          <AlertCircle className="w-10 h-10" />
        </div>
        <div className="max-w-md space-y-2">
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">Product Not Found</h2>
          <p className="text-sm text-slate-500">
            {error?.message || "The floral creation you are looking for is currently unavailable or the link may be outdated."}
          </p>
        </div>
        <button
          onClick={() => navigateToPage('products', 'all')}
          className="flex items-center gap-2 bg-gradient-to-r from-lotus-pink to-lotus-pink-dark text-white font-bold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-all text-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse All Floral Collections</span>
        </button>
      </div>
    );
  }

  const available = isProductAvailable(product);
  const currentImage = images[selectedImageIdx] || images[0];

  return (
    <div className="bg-[#FFF9FA] min-h-screen pb-16 pt-3">
      {/* Top Breadcrumbs Row (Old share button removed as requested) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <nav className="flex items-center gap-1.5 flex-wrap font-medium text-xs sm:text-sm text-slate-500">
          <button
            onClick={() => navigateToPage('home')}
            className="hover:text-lotus-pink transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <button
            onClick={() => navigateToPage('products', product.category)}
            className="hover:text-lotus-pink transition-colors capitalize cursor-pointer"
          >
            {product.category || 'Collection'}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-800 truncate max-w-[240px] sm:max-w-md">
            {product.name}
          </span>
        </nav>
      </div>

      {/* Main Product Showcase Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-1">
        <div className="bg-white rounded-3xl p-4 sm:p-8 shadow-sm border border-pink-100/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* LEFT COLUMN: Thumbnails + Uncropped Main Image */}
            <div className="lg:col-span-6 flex flex-col space-y-4">
              <div className="flex flex-col-reverse sm:flex-row gap-4 items-start">
                
                {/* Thumbnails Rail on Left (Desktop) / Bottom (Mobile) */}
                {images.length > 1 && (
                  <div
                    className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto max-h-[500px] no-scrollbar py-1 w-full sm:w-20 flex-shrink-0"
                    onMouseEnter={() => setIsAutoPlayPaused(true)}
                    onMouseLeave={() => setIsAutoPlayPaused(false)}
                  >
                    {images.map((imgUrl, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImageIdx(idx)}
                        onMouseEnter={() => setSelectedImageIdx(idx)}
                        className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-[#FAF7F7] p-1.5 border-2 transition-all duration-300 flex items-center justify-center cursor-pointer flex-shrink-0 ${
                          selectedImageIdx === idx
                            ? 'border-stone-800 shadow-md ring-2 ring-stone-800/10 scale-102'
                            : 'border-slate-200 hover:border-stone-400 opacity-70 hover:opacity-100'
                        }`}
                        aria-label={`View photo ${idx + 1}`}
                      >
                        <img
                          src={imgUrl}
                          alt={`${product.name} thumbnail ${idx + 1}`}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Main Large Display Image (Full uncropped view with smooth auto-play cross-fade animation) */}
                <div
                  className="relative flex-grow w-full rounded-2xl bg-gradient-to-b from-[#FDFBFB] via-[#FAF7F7] to-[#F5F1F1] border border-stone-200/60 overflow-hidden flex items-center justify-center p-4 sm:p-6 min-h-[380px] sm:min-h-[520px] group shadow-inner"
                  onMouseEnter={() => setIsAutoPlayPaused(true)}
                  onMouseLeave={() => setIsAutoPlayPaused(false)}
                >
                  {/* Stacked Images for Smooth Cross-Fade Animation */}
                  {images.map((imgUrl, idx) => {
                    const isActive = selectedImageIdx === idx;
                    return (
                      <img
                        key={idx}
                        src={imgUrl}
                        alt={`${product.name} ${idx + 1}`}
                        className={`absolute inset-4 sm:inset-6 m-auto w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] h-[calc(100%-2rem)] sm:h-[calc(100%-3rem)] max-h-[500px] object-contain drop-shadow-md transition-all duration-700 ease-in-out cursor-zoom-in select-none ${
                          isActive
                            ? 'opacity-100 scale-100 z-10 pointer-events-auto'
                            : 'opacity-0 scale-95 z-0 pointer-events-none'
                        }`}
                        onClick={() => setIsLightboxOpen(true)}
                        loading={idx === 0 ? 'eager' : 'lazy'}
                      />
                    );
                  })}

                  {/* Left / Right Chevron Arrows on Main Showcase (if multiple images) */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImageIdx((prev) => (prev > 0 ? prev - 1 : images.length - 1));
                        }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/85 hover:bg-white text-slate-800 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer border border-stone-200/80 hover:scale-105 active:scale-95 z-20"
                        aria-label="Previous photo"
                      >
                        <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImageIdx((prev) => (prev < images.length - 1 ? prev + 1 : 0));
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/85 hover:bg-white text-slate-800 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer border border-stone-200/80 hover:scale-105 active:scale-95 z-20"
                        aria-label="Next photo"
                      >
                        <ChevronRight className="w-4 h-4 stroke-[2.2]" />
                      </button>

                      {/* Dots / Pagination indicator at bottom center */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-black/25 backdrop-blur-md py-1.5 px-3 rounded-full">
                        {images.map((_, dotIdx) => (
                          <button
                            key={dotIdx}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedImageIdx(dotIdx);
                            }}
                            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                              selectedImageIdx === dotIdx
                                ? 'w-5 bg-white shadow-xs'
                                : 'w-1.5 bg-white/50 hover:bg-white/80'
                            }`}
                            aria-label={`Jump to photo ${dotIdx + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {/* Top Left Discount Tag (matching #featured tag style) */}
                  {discountPercentage > 0 && (
                    <div className="absolute top-3 left-3 text-xs font-black text-lotus-green bg-green-50/95 backdrop-blur-md border border-green-200/90 px-2.5 py-1 rounded-lg shadow-xs uppercase tracking-wider flex items-center gap-1.5 z-20">
                      <Sparkles className="w-3.5 h-3.5 text-lotus-green" />
                      <span>{discountPercentage}% OFF</span>
                    </div>
                  )}

                  {/* Bottom Right Fullscreen Zoom Trigger */}
                  <button
                    onClick={() => setIsLightboxOpen(true)}
                    className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-slate-800 p-2.5 rounded-xl shadow-md hover:scale-110 transition-all cursor-pointer backdrop-blur-md border border-slate-200/70 z-20"
                    title="Expand high resolution image"
                    aria-label="Expand image"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* PRODUCT DESCRIPTION SECTION (Placed just below Crafted to delight) */}
              <div className="pt-2 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-lotus-pink" />
                    <span>Product Description</span>
                  </span>
                  {product.subCategory && (
                    <span className="text-[10px] font-bold text-lotus-pink bg-pink-50 border border-pink-100 px-2 py-0.5 rounded-md uppercase">
                      {product.subCategory}
                    </span>
                  )}
                </div>
                <div className="bg-stone-50/80 rounded-2xl p-4 border border-stone-100 text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {product.description || "Handcrafted creation by Flower Studio florists using fresh stems and premium materials."}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Product Information, Delivery Preference & Actions */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                
                {/* Title & Native Share Button Header Row (Rating replaced with Share button) */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <h1 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900 leading-tight">
                      {product.name}
                    </h1>
                    {/* Subcategory & Tags (Just like done on ProductCard) */}
                    <div className="flex flex-wrap items-center gap-2">
                      {product.subCategory && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-lotus-pink bg-pink-50 border border-pink-100/80 px-2.5 py-0.5 rounded-md capitalize">
                          <Tag className="w-3 h-3" />
                          <span>{product.subCategory}</span>
                        </span>
                      )}
                      {Array.isArray(product.tags) && product.tags.map((tag, i) => (
                        <span key={i} className="text-xs font-semibold text-lotus-green bg-green-50 border border-green-100/80 px-2.5 py-0.5 rounded-md">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Native Share Button (Replaced demo rating badge) */}
                  <button
                    onClick={handleNativeShare}
                    className="flex items-center gap-2 bg-pink-50/80 hover:bg-pink-100 text-lotus-pink border border-pink-200/80 px-4 py-2 rounded-full font-bold text-xs transition-all shadow-2xs hover:scale-105 active:scale-95 cursor-pointer flex-shrink-0"
                    title="Share this product"
                    aria-label="Share this product"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-lotus-green" /> : <Share2 className="w-4 h-4" />}
                    <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
                  </button>
                </div>

                {/* Free Delivery Tag */}
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200/60 font-black text-[11px] px-2.5 py-1 rounded-md uppercase tracking-wider">
                    <Truck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>24x7 Delivery</span>
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Chandigarh, Mohali & Panchkula</span>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 pt-1">
                  <span className="font-sans font-black text-3xl sm:text-4xl text-slate-900">
                    ₹{basePrice}
                  </span>
                  {baseOriginalPrice > basePrice && (
                    <span className="text-base sm:text-lg text-slate-400 font-semibold line-through">
                      ₹{baseOriginalPrice}
                    </span>
                  )}
                  {discountPercentage > 0 && (
                    <span className="text-xs font-extrabold text-lotus-green bg-green-50 border border-green-200/80 px-2 py-0.5 rounded-md">
                      {discountPercentage}% OFF
                    </span>
                  )}
                  <span className="text-slate-400 cursor-help" title="Inclusive of all taxes and regional flower care pack">
                    <Info className="w-4 h-4" />
                  </span>
                </div>

                {/* Social Proof: Strictly between 23 to 154 */}
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50/80 border border-amber-100 px-3 py-1.5 rounded-xl w-fit">
                  <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                  <span>Ordered {orderedCount}+ times in Past Month</span>
                </div>

                {/* Combos / Weight Variant Selector (if applicable) */}
                {Array.isArray(product.availableCombos) && product.availableCombos.length > 0 && (
                  <div className="pt-2 space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Select Size / Weight Variant:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.availableCombos.map((combo, idx) => {
                        const key = typeof combo === 'object' && combo !== null ? Object.keys(combo)[0] : `Option ${idx + 1}`;
                        const price = typeof combo === 'object' && combo !== null ? (combo[key] || combo.price) : 0;
                        const isSelected = selectedCombo?.key === key;

                        return (
                          <button
                            key={idx}
                            onClick={() => setSelectedCombo({ key, price, mrp: Math.round(price * 1.2) })}
                            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold border transition-all cursor-pointer flex items-center gap-2 ${
                              isSelected
                                ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                                : 'bg-white hover:bg-stone-50 text-slate-700 border-slate-200'
                            }`}
                          >
                            <span>{key}</span>
                            <span className="opacity-80">₹{price}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* DELIVERY PREFERENCE SECTION */}
                <div className="pt-3 pb-2 space-y-3.5 border-t border-slate-100">
                  <h3 className="text-sm font-black text-slate-900 tracking-tight">
                    Choose Delivery Preference
                  </h3>

                  {/* Free Slot Tag Banner */}
                  <div className="flex items-center gap-2 p-3 bg-emerald-50/90 border border-emerald-100 rounded-xl text-xs text-emerald-900 font-semibold">
                    <Truck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Delivery available in all Pincodes of Chandigarh, Mohali & Panchkula.</span>
                  </div>

                  {/* Delivery Location Input Group */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-lotus-pink" />
                      <span>Delivery Location</span>
                    </label>
                    <div className="flex items-center gap-2 bg-stone-50 border border-slate-200 rounded-2xl p-2.5 focus-within:border-lotus-pink focus-within:ring-2 focus-within:ring-pink-100 transition-all">
                      <div className="flex items-center gap-1 text-xs font-black text-slate-800 pr-2 border-r border-slate-200 flex-shrink-0">
                        <span role="img" aria-label="India">🇮🇳</span>
                        <span>IND</span>
                      </div>
                      <input
                        type="text"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="Enter your delivery address"
                        className="w-full bg-transparent text-xs font-bold text-slate-800 focus:outline-none"
                      />
                      {pincode && (
                        <button
                          onClick={() => setPincode('')}
                          className="text-slate-400 hover:text-slate-600 p-1"
                          aria-label="Clear location"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Choose Delivery Date Options (Today / Tomorrow / Later) */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-lotus-pink" />
                      <span>Choose delivery date</span>
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {/* Today Option */}
                      <button
                        onClick={() => setDeliveryDateOption('today')}
                        className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                          deliveryDateOption === 'today'
                            ? 'border-stone-900 bg-stone-50 shadow-sm ring-1 ring-stone-900'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <span className="text-xs font-black text-slate-900">Today</span>
                        <span className="text-[11px] font-semibold text-slate-500 mt-0.5">{todayFormatted}</span>
                      </button>

                      {/* Tomorrow Option */}
                      <button
                        onClick={() => setDeliveryDateOption('tomorrow')}
                        className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                          deliveryDateOption === 'tomorrow'
                            ? 'border-stone-900 bg-stone-50 shadow-sm ring-1 ring-stone-900'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <span className="text-xs font-black text-slate-900">Tomorrow</span>
                        <span className="text-[11px] font-semibold text-slate-500 mt-0.5">{tomorrowFormatted}</span>
                      </button>

                      {/* Later Date Option with Direct Calendar Trigger */}
                      <div className="relative">
                        <div
                          className={`w-full h-full p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center pointer-events-none ${
                            deliveryDateOption === 'later'
                              ? 'border-stone-900 bg-stone-50 shadow-sm ring-1 ring-stone-900'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-1 text-xs font-black text-slate-900">
                            <Calendar className="w-3.5 h-3.5 text-slate-600" />
                            <span>Later</span>
                          </div>
                          <span className="text-[11px] font-semibold text-slate-500 mt-0.5">
                            {formattedLaterDate || 'Pick Date'}
                          </span>
                        </div>
                        <input
                          ref={dateInputRef}
                          type="date"
                          value={customLaterDate}
                          min={todayDateIso}
                          onChange={(e) => {
                            if (e.target.value) {
                              setCustomLaterDate(e.target.value);
                              setDeliveryDateOption('later');
                            }
                          }}
                          onClick={(e) => {
                            setDeliveryDateOption('later');
                            try {
                              if (typeof e.currentTarget.showPicker === 'function') {
                                e.currentTarget.showPicker();
                              }
                            } catch (err) {
                              // Native browser picker fallback
                            }
                          }}
                          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                          aria-label="Choose delivery date"
                        />
                      </div>
                    </div>
                  </div>

                  {/* EXPECTED DELIVERY TIME SECTION (Added directly below Choose delivery date) */}
                  <div className="space-y-1.5 pt-1">
                    <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-lotus-pink" />
                        <span>Expected Delivery Time</span>
                      </span>
                      {selectedTimeSlot ? (
                        <span className="text-[11px] font-extrabold text-lotus-pink">
                          {selectedTimeSlot.label}
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold text-slate-400 italic">
                          Optional
                        </span>
                      )}
                    </label>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {deliveryTimeSlots.map((slot) => {
                        const isSelected = selectedTimeSlot?.id === slot.id;
                        return (
                          <button
                            key={slot.id}
                            onClick={() => setSelectedTimeSlot((prev) => (prev?.id === slot.id ? null : slot))}
                            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                              isSelected
                                ? 'border-stone-900 bg-stone-50 shadow-2xs ring-1 ring-stone-900'
                                : 'border-slate-200 bg-white hover:border-slate-300'
                            }`}
                          >
                            <span className="text-[11px] font-black text-slate-900 leading-tight">
                              {slot.label}
                            </span>
                            <span className="text-[10px] font-semibold text-slate-500 mt-1">
                              {slot.tag}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Earliest Delivery Available Banner */}
                  <div className="flex items-center gap-2.5 p-3.5 bg-emerald-50/70 border border-emerald-100/90 rounded-2xl text-xs text-slate-700 leading-snug">
                    <Truck className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                    <span>
                      Expected delivery on <strong className="text-slate-900 font-extrabold">{activeDeliveryDateString}</strong>{selectedTimeSlot ? <> by <strong className="text-slate-900 font-extrabold">{selectedTimeSlot.label}</strong></> : ''} to <strong className="text-slate-900 font-extrabold">{pincode || 'Tricity'}</strong>.
                    </span>
                  </div>
                </div>

                {/* Quantity Selector */}
                {available && (
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Quantity</span>
                    <div className="flex items-center border border-slate-200 rounded-xl bg-stone-50 p-1">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        disabled={quantity <= 1}
                        className="p-1.5 rounded-lg hover:bg-white text-slate-700 disabled:opacity-40 transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center font-black text-xs text-slate-900">{quantity}</span>
                      <button
                        onClick={() => setQuantity((q) => Math.min(product.stock || 10, q + 1))}
                        className="p-1.5 rounded-lg hover:bg-white text-slate-700 transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

              </div>

              {/* ACTION BUTTONS (Condition 3 Implementation) */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                {available ? (
                  /* AVAILABLE: Show Add To Cart & Buy Now */
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    {/* Add to Cart button */}
                    <button
                      onClick={handleAddToCart}
                      className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl border-2 border-stone-800 hover:bg-stone-900 hover:text-white text-stone-900 font-bold text-sm tracking-wide transition-all shadow-xs hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add To Cart</span>
                    </button>

                    {/* Buy Now button with #D90429 */}
                    <button
                      onClick={handleBuyNow}
                      className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl bg-[#D90429] hover:bg-[#B00320] text-white font-extrabold text-sm uppercase tracking-wider transition-all shadow-md shadow-red-900/20 hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Buy Now • ₹{totalPrice}</span>
                    </button>
                  </div>
                ) : (
                  /* UNAVAILABLE / OUT OF STOCK: Show Theme Green Request Order button and redirect to WhatsApp with details */
                  <div className="space-y-2">
                    <button
                      onClick={handleWhatsAppRequest}
                      className="w-full py-4 px-8 rounded-2xl bg-lotus-green hover:bg-lotus-green-dark text-white font-black text-sm sm:text-base uppercase tracking-wider transition-all shadow-lg shadow-green-700/25 hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2.5"
                    >
                      <MessageCircle className="w-5 h-5 fill-white text-lotus-green" />
                      <span>Request Order via WhatsApp</span>
                    </button>
                    <p className="text-[11px] text-center text-slate-500 font-medium">
                      Currently arranged on pre-order. Your delivery location, date, and preferred time slot will be sent directly on WhatsApp.
                    </p>
                  </div>
                )}

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-2 pt-2 text-center text-slate-500 text-[11px] font-semibold border-t border-slate-100">
                  <div className="flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-lotus-green" />
                    <span>100% Fresh Guarantee</span>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-lotus-pink" />
                    <span>On-time Delivery</span>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <Package className="w-3.5 h-3.5 text-amber-600" />
                    <span>Gift Packaging</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* 1. SIMILAR ITEMS YOU MAY LIKE: Same category as opened product (8 cards, 2 rows of 4, centered View All button) */}
      {sameCategoryProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
          <div className="mb-6 space-y-1">
            <span className="text-xs font-extrabold text-lotus-pink uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-lotus-pink" />
              Category Collection
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
              Similar Items You May Like
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Handpicked creations from our {product.category || 'fresh'} range in Chandigarh & Tricity.
            </p>
          </div>

          {/* 8 cards in 2 rows (4 per row on lg screen) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sameCategoryProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onBuyNow={() => navigateToProduct(p.id)}
              />
            ))}
          </div>

          {/* Centered View All Button for same category */}
          <div className="flex justify-center pt-8">
            <button
              onClick={() => navigateToPage('products', product.category)}
              className="flex items-center gap-2 bg-white hover:bg-pink-50/50 text-slate-800 hover:text-lotus-pink border-2 border-slate-200 hover:border-lotus-pink font-extrabold py-3 px-8 rounded-full shadow-xs hover:scale-105 transition-all text-xs sm:text-sm cursor-pointer capitalize group"
            >
              <span>View All {product.category || 'Category'} Creations</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </section>
      )}

      {/* 2. YOU MAY ALSO LIKE: 8 cards of ALL categories (8 cards, 2 rows of 4) */}
      {allCategoryProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 pt-10 border-t border-pink-100/60">
          <div className="mb-6 space-y-1">
            <span className="text-xs font-extrabold text-lotus-pink uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-lotus-pink" />
              Curated Highlights
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
              You May Also Like
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Explore our best-loved cakes, luxury hampers, vibrant plants, and festive blooms.
            </p>
          </div>

          {/* 8 cards in 2 rows across all categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allCategoryProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onBuyNow={() => navigateToProduct(p.id)}
              />
            ))}
          </div>

          {/* Centered View All Button for all categories */}
          <div className="flex justify-center pt-8">
            <button
              onClick={() => navigateToPage('products', 'all')}
              className="flex items-center gap-2 bg-gradient-to-r from-lotus-pink to-lotus-pink-dark hover:from-lotus-pink-dark hover:to-lotus-pink text-white font-extrabold py-3.5 px-8 rounded-full shadow-md shadow-pink-500/20 hover:scale-105 transition-all text-xs sm:text-sm cursor-pointer group"
            >
              <span>Explore All Collections</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </section>
      )}

      {/* LIGHTBOX / IMAGE GALLERY MODAL (Matching attached reference) */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 transition-all duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Modal Container Card */}
          <div
            className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 max-w-4xl lg:max-w-5xl w-full max-h-[92vh] overflow-y-auto no-scrollbar border border-stone-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col md:flex-row gap-5 lg:gap-8 items-start">
              
              {/* Left: Main Large View Image (Full uncropped view with smooth cross-fade animation) */}
              <div className="relative w-full md:flex-1 h-[420px] sm:h-[520px] md:h-[600px] lg:h-[660px] max-h-[80vh] rounded-2xl overflow-hidden bg-[#FAF7F7] flex items-center justify-center p-2 sm:p-4 group select-none">
                {images.map((imgUrl, idx) => {
                  const isActive = selectedImageIdx === idx;
                  return (
                    <img
                      key={idx}
                      src={imgUrl}
                      alt={`${product.name} ${idx + 1}`}
                      className={`absolute inset-2 sm:inset-4 m-auto w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] h-[calc(100%-1rem)] sm:h-[calc(100%-2rem)] max-h-full max-w-full object-contain drop-shadow-sm transition-all duration-500 ease-in-out select-none ${
                        isActive
                          ? 'opacity-100 scale-100 pointer-events-auto z-1'
                          : 'opacity-0 scale-95 pointer-events-none z-0'
                      }`}
                    />
                  );
                })}

                {/* Left / Right chevron navigation on large image */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImageIdx((prev) => (prev > 0 ? prev - 1 : images.length - 1));
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-white text-stone-800 flex items-center justify-center shadow-md transition-all cursor-pointer border border-stone-200/80 hover:scale-105 active:scale-95 z-10"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImageIdx((prev) => (prev < images.length - 1 ? prev + 1 : 0));
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-white text-stone-800 flex items-center justify-center shadow-md transition-all cursor-pointer border border-stone-200/80 hover:scale-105 active:scale-95 z-10"
                      aria-label="Next photo"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
                    </button>
                  </>
                )}
              </div>

              {/* Right: Circular Close button header + 3-column Thumbnails Grid */}
              <div className="w-full md:w-[280px] lg:w-[330px] flex flex-col justify-start flex-shrink-0">
                {/* Close Button Header */}
                <div className="flex justify-end pb-3 sm:pb-5">
                  <button
                    onClick={() => setIsLightboxOpen(false)}
                    className="w-8 h-8 rounded-full border border-stone-400 hover:border-stone-800 flex items-center justify-center text-stone-600 hover:text-stone-900 transition-colors cursor-pointer bg-white shadow-2xs hover:scale-105 active:scale-95"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4 stroke-[2.2]" />
                  </button>
                </div>

                {/* Thumbnails Grid (3 columns, uncropped thumbnails) */}
                <div className="grid grid-cols-3 gap-2.5 sm:gap-3 max-h-[460px] md:max-h-[580px] overflow-y-auto no-scrollbar p-0.5">
                  {images.map((imgUrl, idx) => {
                    const isSelected = selectedImageIdx === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedImageIdx(idx)}
                        onMouseEnter={() => setSelectedImageIdx(idx)}
                        className={`relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 bg-[#FAF7F7] p-1 flex items-center justify-center ${
                          isSelected
                            ? 'border-2 border-stone-800 shadow-xs ring-1 ring-stone-800/20 scale-[1.02]'
                            : 'border border-stone-200/70 hover:border-stone-400 opacity-80 hover:opacity-100 hover:scale-[1.01]'
                        }`}
                        aria-label={`View photo ${idx + 1}`}
                      >
                        <img
                          src={imgUrl}
                          alt={`${product.name} thumbnail ${idx + 1}`}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
