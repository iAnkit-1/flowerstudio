import React, { useState, useMemo } from 'react';
import { useProductsContext } from '../context/ProductsContext';
import ProductCard from '../components/ProductCard';
import { Search, Sparkles, X, ArrowUpDown, RefreshCw, AlertCircle, MapPin, Tag, Filter } from 'lucide-react';

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
    <div className="pt-0 pb-10 bg-[#FFF9FA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sticky Filters Panel (Search Bar, Categories & Subcategories) */}
        <div className="sticky top-20 z-30 bg-[#FFF9FA]/95 backdrop-blur-md -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 pt-1 pb-3 border-b border-pink-100/35 mb-8 shadow-xs space-y-3">
          <div className="max-w-7xl mx-auto space-y-3">
            {/* Search Input */}
            <div className="relative w-full max-w-xl mx-auto">
              <Search className="w-5 h-5 absolute left-4.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search roses, hampers, cakes, plants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-3 bg-white border border-pink-100/40 rounded-full text-sm focus:outline-none focus:border-lotus-pink focus:ring-2 focus:ring-lotus-pink/10 shadow-sm transition-all font-sans font-medium text-slate-800"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-655 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Categories & Inline Subcategories Flex Row */}
            <div className="flex items-center justify-between gap-4">
              {/* Scrollable Categories List */}
              <div className="flex-1 flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    setActiveSubCategory('all');
                  }}
                  className={`px-5 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer flex-shrink-0 border ${
                    activeCategory === 'all'
                      ? 'bg-lotus-pink text-white border-transparent shadow-md shadow-pink-500/15'
                      : 'bg-white hover:bg-pink-50/45 text-slate-600 border-slate-200/80 hover:border-pink-200/60'
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
                      className={`px-5 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer flex-shrink-0 capitalize border ${
                        isActive
                          ? 'bg-lotus-pink text-white border-transparent shadow-md shadow-pink-500/15'
                          : 'bg-white hover:bg-pink-50/45 text-slate-600 border-slate-200/80 hover:border-pink-200/60'
                      }`}
                    >
                      {cat} ({count})
                    </button>
                  );
                })}
              </div>

              {/* Inline Subcategory Filter Dropdown */}
              {!isLoading && !isError && availableSubCategories.length > 0 && (
                <div className="flex-shrink-0 flex items-center gap-1.5 bg-white border border-slate-200/80 hover:border-pink-200/60 px-3.5 py-1.5 rounded-full text-xs text-slate-700 shadow-xs transition-all relative">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    value={activeSubCategory}
                    onChange={(e) => setActiveSubCategory(e.target.value)}
                    className="bg-transparent font-extrabold text-slate-800 focus:outline-none cursor-pointer pr-1 capitalize"
                  >
                    <option value="all">All</option>
                    {availableSubCategories.map((subCat) => (
                      <option key={subCat} value={subCat}>
                        {subCat}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
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
