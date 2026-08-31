import React, { useState } from 'react';
import { ProductsProvider, useProductsContext } from './context/ProductsContext';
import Navbar from './components/Navbar';
import CategoryHeaderGrid from './sections/CategoryHeaderGrid';
import BestsellersSection from './sections/BestsellersSection';
import CategoryProductsSection from './sections/CategoryProductsSection';
import ProductsPage from './pages/ProductsPage';
import DeliveryInfo from './sections/DeliveryInfo';
import Footer from './components/Footer';
import GoldMembershipPopup from './components/GoldMembershipPopup';
import AppDownloadModal from './components/AppDownloadModal';

function MainContent({ cart, setCart, cartOpen, setCartOpen, appDownloadModalOpen, setAppDownloadModalOpen, selectedProductForDownload, setSelectedProductForDownload }) {
  const { currentPage } = useProductsContext();
  const [goldPopupOpen, setGoldPopupOpen] = useState(false);

  const handleOpenAppDownloadModal = (product = null) => {
    setSelectedProductForDownload(product);
    setAppDownloadModalOpen(true);
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const handleUpdateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  return (
    <div className="relative min-h-screen bg-[#FFF9FA] flex flex-col justify-between overflow-x-hidden selection:bg-lotus-pink/20 selection:text-lotus-pink">
      {/* Navbar with Tricity Location Branding */}
      <Navbar
        cart={cart}
        onRemoveFromCart={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        onOpenAppDownloadModal={handleOpenAppDownloadModal}
      />

      {/* Main View Router: Home vs Products Page */}
      <main className="flex-grow">
        {currentPage === 'home' ? (
          <>
            {/* Top Shop By Category Grid */}
            <CategoryHeaderGrid />

            {/* Shop By Bestsellers Horizontal Carousel */}
            <BestsellersSection onBuyNow={handleOpenAppDownloadModal} />

            {/* Flowers Section ("Pick Their Favourite Flower") */}
            <CategoryProductsSection
              targetCategory="flower"
              title="Pick Their Favourite Flower"
              subtitle="Fresh hand-cut roses, lilies, and carnation stems wrapped with elegance."
              bannerBadge="Fresh Floral Blossoms"
              bannerTitle="Express Your Emotions With Fresh Roses"
              bannerSubtitle="Sourced fresh daily and delivered across Chandigarh, Mohali & Panchkula."
              bannerImage="https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=1200"
              gradientOverlay="from-rose-950/85 via-pink-950/50 to-transparent"
              onBuyNow={handleOpenAppDownloadModal}
            />

            {/* Hampers Section ("Hampers for Every Feeling") */}
            <CategoryProductsSection
              targetCategory="hamper"
              title="Hampers for Every Feeling"
              subtitle="Curated gift hampers filled with chocolates, snacks, and sweet surprises."
              bannerBadge="Luxury Gift Hampers"
              bannerTitle="Surprise Your Loved Ones With Premium Baskets"
              bannerSubtitle="Exquisite hampers for birthdays, anniversaries, and festive celebrations."
              bannerImage="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=1200"
              gradientOverlay="from-amber-950/90 via-rose-950/60 to-transparent"
              onBuyNow={handleOpenAppDownloadModal}
            />

            {/* Cakes Section ("Freshly Baked Cakes") */}
            <CategoryProductsSection
              targetCategory="cake"
              title="Freshly Baked Cakes"
              subtitle="100% Eggless, rich chocolate truffle, black forest, and red velvet cakes."
              bannerBadge="Artisanal Bakery"
              bannerTitle="Delectable Fresh Cakes For Every Special Moment"
              bannerSubtitle="Baked fresh on order with soft sponge and rich frosting."
              bannerImage="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1200"
              gradientOverlay="from-orange-950/90 via-amber-950/60 to-transparent"
              onBuyNow={handleOpenAppDownloadModal}
            />

            {/* Plants Section ("Plants for Every Vibe") */}
            <CategoryProductsSection
              targetCategory="plants"
              title="Plants for Every Vibe"
              subtitle="Lush indoor Peace Lilies, Ficus Bonsai trees, and air-purifying greenery."
              bannerBadge="Botanical Greenery"
              bannerTitle="Gift The Blessing Of Clean Air & Green Life"
              bannerSubtitle="Low-maintenance potted plants in designer ceramic pots."
              bannerImage="https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&q=80&w=1200"
              gradientOverlay="from-emerald-950/90 via-green-950/60 to-transparent"
              onBuyNow={handleOpenAppDownloadModal}
            />

            {/* Local Pincode checker & delivery metrics */}
            <DeliveryInfo />
          </>
        ) : (
          /* Dedicated /products catalog page */
          <ProductsPage onBuyNow={handleOpenAppDownloadModal} />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Gold Membership popup */}
      <GoldMembershipPopup isOpen={goldPopupOpen} setIsOpen={setGoldPopupOpen} />

      {/* Buy Now -> App Download Popup Modal */}
      <AppDownloadModal
        isOpen={appDownloadModalOpen}
        onClose={() => setAppDownloadModalOpen(false)}
        selectedProduct={selectedProductForDownload}
      />

      {/* Floating WhatsApp Quick Helpline */}
      <a
        href="https://wa.me/919815493338?text=Hello%20Flower%20Studio!%20I%20have%20a%20question%20about%20your%20gifting%20deliveries%20in%20Chandigarh."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 hover:scale-110 transition-transform shadow-xl rounded-full"
        title="Direct WhatsApp Support"
        aria-label="Direct WhatsApp Support Helpline"
      >
        <svg className="w-14 h-14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="11" fill="#fff" />
          <path fill="#25D366" d="M12.011 2c-5.502 0-9.96 4.458-9.96 9.96 0 1.954.563 3.775 1.54 5.314L2.146 22l4.83-1.397c1.486.89 3.223 1.406 5.021 1.406 5.502 0 9.96-4.458 9.96-9.96C21.97 6.458 17.512 2 12.011 2zm4.714 14.482c-.21.584-1.219 1.095-1.686 1.162-.466.067-.933.1-2.916-.718-2.532-1.044-4.142-3.645-4.265-3.812-.123-.167-.986-1.313-.986-2.504 0-1.19.625-1.778.847-2.017.221-.24.487-.3.649-.3.162 0 .325 0 .467.006.148.007.347-.053.541.413.195.467.668 1.628.728 1.746.06.118.093.255.012.414-.08.158-.12.255-.24.393-.12.138-.255.308-.363.413-.12.119-.245.248-.106.488.139.24.62 1.023 1.33 1.655.913.813 1.681 1.065 1.925 1.186.244.122.387.102.529-.059.142-.16.612-.714.775-.956.163-.243.325-.202.548-.121.222.08 1.412.666 1.655.787.244.122.406.183.467.284.06.102.06.584-.148 1.168z"/>
          <path fill="#ffffff" d="M16.725 16.482c-.21.584-1.219 1.095-1.686 1.162-.466.067-.933.1-2.916-.718-2.532-1.044-4.142-3.645-4.265-3.812-.123-.167-.986-1.313-.986-2.504 0-1.19.625-1.778.847-2.017.221-.24.487-.3.649-.3.162 0 .325 0 .467.006.148.007.347-.053.541.413.195.467.668 1.628.728 1.746.06.118.093.255.012.414-.08.158-.12.255-.24.393-.12.138-.255.308-.363.413-.12.119-.245.248-.106.488.139.24.62 1.023 1.33 1.655.913.813 1.681 1.065 1.925 1.186.244.122.387.102.529-.059.142-.16.612-.714.775-.956.163-.243.325-.202.548-.121.222.08 1.412.666 1.655.787.244.122.406.183.467.284.06.102.06.584-.148 1.168z"/>
        </svg>
      </a>
    </div>
  );
}

export default function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [appDownloadModalOpen, setAppDownloadModalOpen] = useState(false);
  const [selectedProductForDownload, setSelectedProductForDownload] = useState(null);

  return (
    <ProductsProvider>
      <MainContent
        cart={cart}
        setCart={setCart}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        appDownloadModalOpen={appDownloadModalOpen}
        setAppDownloadModalOpen={setAppDownloadModalOpen}
        selectedProductForDownload={selectedProductForDownload}
        setSelectedProductForDownload={setSelectedProductForDownload}
      />
    </ProductsProvider>
  );
}
