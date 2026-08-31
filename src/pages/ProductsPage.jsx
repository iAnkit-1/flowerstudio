import React, { useState, useMemo } from 'react';
import { useProductsContext } from '../context/ProductsContext';
import ProductCard from '../components/ProductCard';
import { Search, Sparkles, X, ArrowUpDown, RefreshCw, AlertCircle, MapPin, Tag } from 'lucide-react';

export default function ProductsPage({ onBuyNow }) {
  const {
    products,
    isLoading,
    isError,
    error,
    refetch,
    activeCategory,
    setActiveCategory,
    activeSubCategory,
    setActiveSubCategory,
    searchQuery,
    setSearchQuery,
    availableCategories,
    availableSubCategories,
    navigateToPage,
  } = useProductsContext();

  const [selectedTag, setSelectedTag] = useState('all');
  const [maxPrice, setMaxPrice] = useState(10000);
  const [sortBy, setSortBy] = useState('featured');

  // Extract Tags dynamically
  const availableTags = useMemo(() => {
    const set = new Set();
    products.forEach((p) => {
      if (Array.isArray(p.tags)) {
        p.tags.forEach((t) => set.add(t));
      }
    });
    return Array.from(set);
  }, [products]);

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (activeCategory !== 'all') {
      list = list.filter((p) => {
        const cat = p.category ? p.category.toLowerCase().trim() : '';
        const target = activeCategory.toLowerCase().trim();
        if (target === 'flower' || target === 'flowers' || target === 'bouquets') {
          return cat === 'flower' || cat === 'flowers' || cat === 'bouquets';
        }
        return cat === target;
      });
    }

    // Subcategory filter
    if (activeSubCategory !== 'all') {
      list = list.filter(
        (p) => p.subCategory && p.subCategory.toLowerCase().trim() === activeSubCategory.toLowerCase().trim()
      );
    }

    // Tag filter
    if (selectedTag !== 'all') {
      list = list.filter((p) => p.tags && p.tags.includes(selectedTag));
    }

    // Search filter
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
    <div className="py-10 bg-[#FFF9FA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Back to Home */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigateToPage('home')}
            className="text-xs font-extrabold text-lotus-pink hover:underline flex items-center gap-1 cursor-pointer"
          >
            ← Back to Home
          </button>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <MapPin className="w-3.5 h-3.5 text-lotus-green" />
            <span>Delivering in Chandigarh • Mohali • Panchkula</span>
          </div>
        </div>

        {/* Page Title Header */}
        <div className="max-w-2xl mx-auto space-y-2 mb-10 text-center">
          <span className="text-xs font-extrabold text-lotus-pink uppercase tracking-widest bg-pink-100/70 px-3.5 py-1 rounded-full border border-pink-200/60 inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-lotus-pink" />
            Full Gifting Catalog
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-slate-900 leading-tight">
            Our <span className="text-lotus-pink">Gifting Catalog</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Browse fresh stem flowers, hampers, artisanal cakes, and plants.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-5 rounded-3xl border border-slate-150 mb-10 space-y-4 shadow-sm">
          {/* Top Row: Search & Sort */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search roses, hampers, bonsai, cakes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:border-lotus-pink focus:ring-1 focus:ring-lotus-pink transition-all"
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

            {/* Sort & Refetch */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <button
                onClick={() => refetch()}
                className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-lotus-pink hover:border-pink-200 transition-all cursor-pointer"
                title="Refresh products"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </button>

              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-2 rounded-2xl text-xs text-slate-700">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-semibold text-slate-500">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent font-extrabold text-slate-800 focus:outline-none cursor-pointer"
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
                setActiveCategory('all');
                setActiveSubCategory('all');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex-shrink-0 ${
                activeCategory === 'all'
                  ? 'bg-lotus-pink text-white shadow-md shadow-pink-500/20'
                  : 'bg-slate-50 text-slate-600 hover:bg-pink-50 border border-slate-200'
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
                    setActiveCategory(cat);
                    setActiveSubCategory('all');
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex-shrink-0 capitalize ${
                    isActive
                      ? 'bg-lotus-pink text-white shadow-md shadow-pink-500/20'
                      : 'bg-slate-50 text-slate-600 hover:bg-pink-50 border border-slate-200'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>

          {/* Subcategory Filter Pills */}
          {availableSubCategories.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex-shrink-0 mr-1">
                Subcategory:
              </span>
              <button
                onClick={() => setActiveSubCategory('all')}
                className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex-shrink-0 ${
                  activeSubCategory === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
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
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {subCat}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="py-20 text-center space-y-4">
            <div className="w-12 h-12 border-4 border-lotus-pink border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-bold text-slate-600">Loading catalog from Flower Studio API...</p>
          </div>
        )}

        {/* Error state */}
        {isError && (
          <div className="py-12 bg-rose-50 border border-rose-100 rounded-3xl text-center space-y-3 max-w-lg mx-auto p-6">
            <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
            <h4 className="font-bold text-slate-800 text-lg">Failed to load catalog</h4>
            <p className="text-xs text-slate-500">{error?.message}</p>
            <button
              onClick={() => refetch()}
              className="bg-lotus-pink text-white font-bold px-5 py-2 rounded-xl text-xs hover:opacity-90 cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !isError && filteredProducts.length === 0 && (
          <div className="py-16 text-center space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mx-auto">
              <Search className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-slate-800 text-lg">No products match your filters</h4>
            <p className="text-xs text-slate-500">Try clearing filters or searching for something else.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
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

        {/* Products Grid: 4 Cards per row */}
        {!isLoading && !isError && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onBuyNow={onBuyNow} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
