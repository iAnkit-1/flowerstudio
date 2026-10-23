import { useQuery } from '@tanstack/react-query';

export const API_BASE_URL = 'https://api.flowerstudiobypushpraj.com/api';

export function formatProduct(item, idx = 0) {
  if (!item) return null;
  const mrp = Number(item.mrp || item.originalPrice || item.salePrice || item.price || 0);
  const salePrice = Number(item.salePrice || item.price || item.mrp || 0);
  const discountPercentage = Number(
    item.discountPercentage || (mrp > salePrice ? Math.round(((mrp - salePrice) / mrp) * 100) : 0)
  );

  let images = [];
  if (Array.isArray(item.images) && item.images.length > 0) {
    images = item.images.filter(img => img && typeof img === 'string' && img.trim().length > 0);
  } else if (item.imageUrl) {
    images = [item.imageUrl];
  } else if (item.image) {
    images = [item.image];
  }

  if (images.length === 0) {
    images = ['https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=800'];
  }

  const category = (item.category || 'flowers').toLowerCase().trim();
  const subCategory = (item.subCategory || '').toLowerCase().trim();

  return {
    id: item.id || `prod_${idx}`,
    hsnCode: item.hsnCode || '',
    barcode: item.barcode || '',
    sku: item.sku || '',
    name: item.title || item.name || 'Signature Creation',
    title: item.title || item.name || 'Signature Creation',
    description: item.description || 'Handcrafted floral creation by Flower Studio florists.',
    mrp: mrp,
    originalPrice: mrp > 0 ? mrp : salePrice,
    price: salePrice > 0 ? salePrice : mrp,
    salePrice: salePrice > 0 ? salePrice : mrp,
    discountPercentage: discountPercentage,
    rating: Number(item.ratings || item.rating || 4.8),
    reviewsCount: Number(item.reviewsCount || 24),
    category: category,
    subCategory: subCategory,
    availability: item.availability || 'available',
    inStock: (item.availability || 'available') !== 'out of stock' && Number(item.stock ?? 10) > 0,
    stock: Number(item.stock ?? 10),
    tags: Array.isArray(item.tags) ? item.tags : [],
    addons: item.addons || {},
    addOns: Array.isArray(item.addOns) ? item.addOns : [],
    occasions: Array.isArray(item.occasions) ? item.occasions : [],
    availableCombos: Array.isArray(item.availableCombos) ? item.availableCombos : [],
    similarItems: Array.isArray(item.similarItems) ? item.similarItems : [],
    image: images[0],
    images: images,
  };
}

/**
 * Fetch products from Backend API
 */
export async function fetchProducts() {
  const response = await fetch(`${API_BASE_URL}/products`);
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }
  const data = await response.json();
  const rawList = data.products || data || [];

  return rawList.map((item, idx) => formatProduct(item, idx));
}

/**
 * Fetch single product by ID
 */
export async function fetchProductById(productId) {
  if (!productId) return null;
  const response = await fetch(`${API_BASE_URL}/products/${productId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch product: ${response.statusText}`);
  }
  const data = await response.json();
  const rawProduct = data.product || data;
  return formatProduct(rawProduct);
}

/**
 * Custom TanStack Query Hook for loading products with automatic caching
 */
export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5, // 5 minutes fresh cache
  });
}

/**
 * Custom TanStack Query Hook for loading a single product
 */
export function useProduct(productId) {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProductById(productId),
    enabled: Boolean(productId),
    staleTime: 1000 * 60 * 5,
  });
}
