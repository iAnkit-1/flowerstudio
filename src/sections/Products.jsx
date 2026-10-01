import React, { useState, useMemo } from 'react';
import { Search, Star, ShoppingCart, Sparkles, Filter, X, ArrowUpDown, ChevronRight, CheckCircle2, AlertCircle, RefreshCw, Smartphone } from 'lucide-react';
import { useProducts } from '../api/productsApi';

function ProductCard({ product, onOpenAppDownloadModal, onSelectProductDetails }) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <div className="group relative flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
      {/* Product Image Area */}
      <div
        className="relative pt-[100%] overflow-hidden bg-slate-100 cursor-pointer"
        onClick={() => onSelectProductDetails(product)}
      >
        <img
          src={images[activeImageIdx] || images[0]}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent pointer-events-none z-10" />

        {/* Category Pill Tag */}
        <span className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md text-lotus-pink text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm border border-pink-100 z-10">
          {product.category}
        </span>

        {/* Discount Badge */}
        {product.discountPercentage > 0 && (
          <span className="absolute top-3.5 right-3.5 bg-gradient-to-r from-lotus-pink to-lotus-pink-dark text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md z-10">
            {product.discountPercentage}% OFF
          </span>
        )}

        {/* Out of stock overlay */}
        {!product.inStock && (
          <span className="absolute inset-0 bg-slate-900/60 flex items-center justify-center text-white font-bold text-xs uppercase tracking-wider z-20">
            Out of Stock
          </span>
        )}

        {/* Image thumbnails dots if multiple */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-20">
            <div className="flex gap-1.5 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIdx(idx);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === activeImageIdx ? 'bg-lotus-pink w-4' : 'bg-white/70'
                  }`}
                  aria-label={`View image ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="flex-grow p-5 flex flex-col justify-between space-y-3">
        <div
          className="space-y-2 cursor-pointer"
          onClick={() => onSelectProductDetails(product)}
        >
          {/* Rating */}
          <div className="flex items-center gap-1.5">
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
            <span className="text-xs font-bold text-slate-700">{product.rating}</span>
            <span className="text-[10px] text-slate-400">({product.reviewsCount})</span>
          </div>

          {/* Title */}
          <h3 className="font-sans font-extrabold text-slate-900 text-base leading-snug group-hover:text-lotus-pink transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Subcategory / Tags badges */}
          <div className="flex flex-wrap gap-1 pt-1">
            {product.subCategory && (
              <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                #{product.subCategory}
              </span>
            )}
            {product.tags && product.tags.slice(0, 2).map((tag, tIdx) => (
              <span key={tIdx} className="text-[10px] font-semibold text-lotus-green bg-green-50 px-2 py-0.5 rounded-md border border-green-100">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Price & Action Button */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Price</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-slate-900">₹{product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-slate-400 line-through">₹{product.originalPrice}</span>
              )}
            </div>
          </div>

          <button
            onClick={() => onOpenAppDownloadModal(product)}
            className="flex items-center gap-1.5 bg-gradient-to-r from-lotus-pink to-lotus-pink-dark hover:from-lotus-pink-dark hover:to-lotus-pink text-white font-extrabold px-3.5 py-2.5 rounded-xl shadow-md shadow-pink-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer text-xs"
          >
            <Smartphone className="w-4 h-4" />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Products({ activeCategory, onSelectCategory, onOpenAppDownloadModal }) {
  const { data: products = [], isLoading, isError, error, refetch } = useProducts();

  const [activeSubCategory, setActiveSubCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [maxPrice, setMaxPrice] = useState(10000);
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-low', 'price-high', 'rating'
  const [selectedProductModal, setSelectedProductModal] = useState(null);

  // Extract Categories dynamically from API products
  const availableCategories = useMemo(() => {
    const set = new Set();
    products.forEach((p) => {
      if (p.category) set.add(p.category.toLowerCase().trim());
    });
    return Array.from(set);
  }, [products]);

  // Extract Subcategories dynamically based on selected Category
  const availableSubCategories = useMemo(() => {
    const set = new Set();
    products.forEach((p) => {
      if (activeCategory === 'all' || p.category === activeCategory) {
        if (p.subCategory) set.add(p.subCategory.toLowerCase().trim());
      }
    });
    return Array.from(set);
  }, [products, activeCategory]);

  // Extract Tags dynamically
  const availableTags = useMemo(() => {
    const set = new Set();
    products.forEach((p) => {
      if (Array.isArray(p.tags)) {
        p.tags.forEach(t => set.add(t));
      }
    });
    return Array.from(set);
  }, [products]);

  // Filtered & Sorted products list
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (activeCategory !== 'all') {
      list = list.filter((p) => p.category === activeCategory);
    }

    // Subcategory filter
    if (activeSubCategory !== 'all') {
      list = list.filter((p) => p.subCategory === activeSubCategory);
    }

    // Tag filter
    if (selectedTag !== 'all') {
      list = list.filter((p) => p.tags && p.tags.includes(selectedTag));
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subCategory.toLowerCase().includes(q)
      );
    }

    // Price filter
    list = list.filter((p) => p.price <= maxPrice);

    // Sorting
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [products, activeCategory, activeSubCategory, selectedTag, searchQuery, maxPrice, sortBy]);

  return (
    <section id="products" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto space-y-3 mb-10 text-center">
          <span className="text-xs font-extrabold text-lotus-pink uppercase tracking-widest bg-pink-50 px-3.5 py-1 rounded-full border border-pink-100 inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-lotus-pink" />
            Live Catalog From Backend API
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-slate-900 leading-tight">
            Explore <span className="text-lotus-pink">Creations</span>
          </h2>
          <p className="text-sm text-slate-500 max-w-lg mx-auto">
            Browse our full catalog of fresh flowers, luxury hampers, cakes, and gift plants. Filter by category, subcategory, or search keywords.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 mb-10 space-y-4 shadow-sm">
          {/* Top Row: Search input & Sort dropdown */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search roses, hampers, bonsai, cakes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:border-lotus-pink focus:ring-1 focus:ring-lotus-pink transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort options & Refetch */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <button
                onClick={() => refetch()}
                className="p-2.5 rounded-2xl bg-white border border-slate-200 text-slate-600 hover:text-lotus-pink hover:border-pink-200 transition-all cursor-pointer"
                title="Refresh products data"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </button>

              <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 rounded-2xl text-xs text-slate-700">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-semibold text-slate-500">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent font-bold text-slate-800 focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1 pb-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex-shrink-0 mr-1">
              Category:
            </span>
            <button
              onClick={() => {
                onSelectCategory('all');
                setActiveSubCategory('all');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex-shrink-0 ${
                activeCategory === 'all'
                  ? 'bg-lotus-pink text-white shadow-md shadow-pink-500/20'
                  : 'bg-white text-slate-600 hover:bg-pink-50 border border-slate-200'
              }`}
            >
              All ({products.length})
            </button>
            {availableCategories.map((cat) => {
              const count = products.filter((p) => p.category === cat).length;
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    onSelectCategory(cat);
                    setActiveSubCategory('all');
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex-shrink-0 capitalize ${
                    isActive
                      ? 'bg-lotus-pink text-white shadow-md shadow-pink-500/20'
                      : 'bg-white text-slate-600 hover:bg-pink-50 border border-slate-200'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>

          {/* Subcategory Filter Pills (If available) */}
          {availableSubCategories.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1 border-t border-slate-200/60">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex-shrink-0 mr-1">
                Subcategory:
              </span>
              <button
                onClick={() => setActiveSubCategory('all')}
                className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex-shrink-0 ${
                  activeSubCategory === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                All Subcategories
              </button>
              {availableSubCategories.map((subCat) => {
                const isActive = activeSubCategory === subCat;
                return (
                  <button
                    key={subCat}
                    onClick={() => setActiveSubCategory(subCat)}
                    className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex-shrink-0 capitalize ${
                      isActive
                        ? 'bg-slate-900 text-white'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {subCat}
                  </button>
                );
              })}
            </div>
          )}

          {/* Tag Filter Pills */}
          {availableTags.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex-shrink-0 mr-1">
                Tags:
              </span>
              <button
                onClick={() => setSelectedTag('all')}
                className={`px-2.5 py-0.5 rounded-md text-[10px] font-extrabold transition-all cursor-pointer flex-shrink-0 ${
                  selectedTag === 'all'
                    ? 'bg-lotus-green text-white'
                    : 'bg-white text-slate-600 hover:bg-green-50 border border-slate-200'
                }`}
              >
                All Tags
              </button>
              {availableTags.map((tag) => {
                const isActive = selectedTag === tag;
                return (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-2.5 py-0.5 rounded-md text-[10px] font-extrabold transition-all cursor-pointer flex-shrink-0 ${
                      isActive
                        ? 'bg-lotus-green text-white'
                        : 'bg-white text-slate-600 hover:bg-green-50 border border-slate-200'
                    }`}
                  >
                    #{tag}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="py-20 text-center space-y-4">
            <div className="w-12 h-12 border-4 border-lotus-pink border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-bold text-slate-600">Fetching live catalog from Flower Studio ...</p>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="py-12 bg-rose-50 border border-rose-100 rounded-3xl text-center space-y-3 max-w-lg mx-auto p-6">
            <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
            <h4 className="font-bold text-slate-800 text-lg">Failed to load products</h4>
            <p className="text-xs text-slate-500">{error?.message || 'Check your internet connection and try again.'}</p>
            <button
              onClick={() => refetch()}
              className="bg-lotus-pink text-white font-bold px-5 py-2 rounded-xl text-xs hover:opacity-90 transition-opacity cursor-pointer"
            >
              Retry Loading
            </button>
          </div>
        )}

        {/* Empty Filter State */}
        {!isLoading && !isError && filteredProducts.length === 0 && (
          <div className="py-16 text-center space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mx-auto">
              <Search className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-slate-800 text-lg">No products match your filters</h4>
            <p className="text-xs text-slate-500">Try adjusting your search query, price range, or category filter.</p>
            <button
              onClick={() => {
                onSelectCategory('all');
                setActiveSubCategory('all');
                setSelectedTag('all');
                setSearchQuery('');
              }}
              className="bg-slate-900 text-white font-bold px-5 py-2.5 rounded-xl text-xs hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && !isError && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenAppDownloadModal={onOpenAppDownloadModal}
                onSelectProductDetails={(prod) => setSelectedProductModal(prod)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Quick Details Dialog Modal */}
      {selectedProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedProductModal(null)}
          />

          <div className="relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl z-10 border border-slate-100 my-auto animate-scaleUp">
            <button
              onClick={() => setSelectedProductModal(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Product Visual */}
              <div className="relative h-64 md:h-full min-h-[300px] bg-slate-100">
                <img
                  src={selectedProductModal.image}
                  alt={selectedProductModal.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 bg-lotus-pink text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                  {selectedProductModal.category}
                </span>
              </div>

              {/* Product Details Content */}
              <div className="p-6 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-4 h-4 fill-current text-amber-400" />
                    <span className="text-sm font-bold text-slate-700">{selectedProductModal.rating}</span>
                    <span className="text-xs text-slate-400">({selectedProductModal.reviewsCount} reviews)</span>
                  </div>

                  <h3 className="font-serif font-bold text-2xl text-slate-900 leading-snug">
                    {selectedProductModal.name}
                  </h3>

                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-slate-900">₹{selectedProductModal.price}</span>
                    {selectedProductModal.originalPrice > selectedProductModal.price && (
                      <span className="text-sm text-slate-400 line-through">₹{selectedProductModal.originalPrice}</span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {selectedProductModal.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                    <p className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-lotus-green" /> Express Delivery in Chandigarh
                    </p>
                    <p className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-lotus-green" /> Verified Freshness Guaranteed
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const prod = selectedProductModal;
                    setSelectedProductModal(null);
                    onOpenAppDownloadModal(prod);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-lotus-pink to-lotus-pink-dark text-white font-extrabold py-3.5 rounded-2xl shadow-lg shadow-pink-500/20 hover:scale-[1.01] transition-all cursor-pointer text-sm"
                >
                  <Smartphone className="w-4.5 h-4.5" />
                  <span>Order via Android App</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
