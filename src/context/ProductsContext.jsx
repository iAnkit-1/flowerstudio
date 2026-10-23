import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { useProducts } from '../api/productsApi';

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  // Single API call via TanStack Query
  const { data: products = [], isLoading, isError, error, refetch } = useProducts();

  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSubCategory, setActiveSubCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'products' | 'product-details'
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Sync route / pathname if changed (History API routing)
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;

      // Check if URL matches /product/:id or /products/:id
      const productMatch = path.match(/^\/product\/([^/]+)/) || (path.startsWith('/products/') && path.split('/')[2] ? path.match(/^\/products\/([^/]+)/) : null);

      if (productMatch && productMatch[1]) {
        setSelectedProductId(decodeURIComponent(productMatch[1]));
        setCurrentPage('product-details');
      } else if (path === '/products') {
        setSelectedProductId(null);
        setCurrentPage('products');
      } else {
        setSelectedProductId(null);
        setCurrentPage('home');
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigateToPage = (page, category = null) => {
    if (category !== null) {
      setActiveCategory(category);
      setActiveSubCategory('all');
    }
    setSelectedProductId(null);
    setCurrentPage(page);

    const targetPath = page === 'products' ? '/products' : '/';
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToProduct = (productId) => {
    if (!productId) return;
    setSelectedProductId(productId);
    setCurrentPage('product-details');

    const targetPath = `/product/${productId}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dynamically computed categories list from API products
  const availableCategories = useMemo(() => {
    const set = new Set();
    products.forEach((p) => {
      if (p.category) set.add(p.category.toLowerCase().trim());
    });
    return Array.from(set);
  }, [products]);

  // Dynamically computed subcategories list
  const availableSubCategories = useMemo(() => {
    const set = new Set();
    products.forEach((p) => {
      if (activeCategory === 'all' || p.category === activeCategory) {
        if (p.subCategory) set.add(p.subCategory.toLowerCase().trim());
      }
    });
    return Array.from(set);
  }, [products, activeCategory]);

  const value = {
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
    currentPage,
    setCurrentPage,
    selectedProductId,
    setSelectedProductId,
    navigateToPage,
    navigateToProduct,
    availableCategories,
    availableSubCategories,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProductsContext() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProductsContext must be used within a ProductsProvider');
  }
  return context;
}
