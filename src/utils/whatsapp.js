/**
 * Flower Studio WhatsApp & Availability Utilities
 */

// Primary WhatsApp Helpline & Order Line (Matches official contact & customer apps)
export const FLOWER_STUDIO_WHATSAPP_PHONE = '919335401435';

/**
 * Checks if product is in stock and available for direct Buy Now
 * Condition: stock > 0 && availability status is available
 */
export function isProductAvailable(product) {
  if (!product) return false;
  const stock = Number(product.stock ?? 0);
  const availability = String(product.availability || '').toLowerCase().trim();
  return stock > 0 && (availability === 'available' || availability === 'in stock');
}

/**
 * Redirects the user to WhatsApp with pre-filled product details, direct product URL,
 * Delivery Location, Choose Delivery Date, and Expected Delivery Time.
 */
export function redirectToWhatsAppOrderRequest(product, details = {}) {
  if (!product) return;

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://flowerstudiobypushpraj.com';
  const productUrl = `${origin}/product/${product.id}`;
  const productName = product.name || product.title || 'Handcrafted Floral Creation';
  const price = product.price ? `₹${product.price}` : '';
  const mrp = product.originalPrice && product.originalPrice > product.price ? `₹${product.originalPrice}` : '';
  const category = product.category ? product.category.toUpperCase() : 'FLOWER STUDIO CREATION';
  const subCategory = product.subCategory ? ` / ${product.subCategory}` : '';
  const currentStock = Number(product.stock ?? 0);
  const statusNote = currentStock <= 0 ? 'Out of stock in immediate inventory' : 'Special Order / By Request';

  const deliveryLocation = details.deliveryLocation || '160022, Chandigarh (Tricity)';
  const deliveryDate = details.deliveryDate || 'Earliest Available Date';
  const expectedDeliveryTime = details.expectedDeliveryTime || '';

  const message = [
    `🌸 *FLOWER STUDIO — ORDER REQUEST* 🌸`,
    ``,
    `Hello Flower Studio team! I would like to request an order for the following item:`,
    ``,
    `💐 *Item:* ${productName}`,
    `💰 *Price:* ${price}${mrp ? ` (MRP: ${mrp})` : ''}`,
    `🏷️ *Category:* ${category}${subCategory}`,
    `🆔 *Product ID:* ${product.id}`,
    `📌 *Status:* ${statusNote}`,
    `🔗 *Product URL:* ${productUrl}`,
    ``,
    `📍 *Delivery Location:* ${deliveryLocation}`,
    `📅 *Choose Delivery Date:* ${deliveryDate}`,
    `⏰ *Expected Delivery Time:* ${expectedDeliveryTime}`,
    ``,
    `Please confirm my order. Thank you!`
  ].join('\n');

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${FLOWER_STUDIO_WHATSAPP_PHONE}?text=${encodedMessage}`;

  if (typeof window !== 'undefined') {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  }
}
