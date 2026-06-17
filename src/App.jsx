import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Categories from './sections/Categories';
import Products from './sections/Products';
import DeliveryInfo from './sections/DeliveryInfo';
import Testimonials from './sections/Testimonials';
import AppTeaser from './sections/AppTeaser';
import Footer from './components/Footer';
import GoldMembershipPopup from './components/GoldMembershipPopup';
import { initialTestimonials } from './data/mockData';

export default function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [goldPopupOpen, setGoldPopupOpen] = useState(false);

  useEffect(() => {
    // Show popup after 1.5 seconds if they haven't joined already in this session
    const hasJoined = localStorage.getItem('gold_member_joined');
    const hasDismissed = sessionStorage.getItem('gold_member_dismissed');
    
    if (!hasJoined && !hasDismissed) {
      const timer = setTimeout(() => {
        setGoldPopupOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Cart operations
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
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

  // Review operations
  const handleAddTestimonial = (newReview) => {
    setTestimonials((prev) => [newReview, ...prev]);
  };

  return (
    <div className="relative min-h-screen bg-slate-50 flex flex-col justify-between overflow-x-hidden selection:bg-lotus-pink/20 selection:text-lotus-pink">
      
      {/* Sticky Navigation and Cart drawer */}
      <Navbar
        cart={cart}
        onRemoveFromCart={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
      />

      {/* Main Sections */}
      <main className="flex-grow">
        
        {/* Widescreen Hero Slider */}
        <Hero onSelectCategory={setActiveCategory} />

        {/* Categories Grid */}
        <Categories
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        {/* Searchable Products Catalog */}
        <Products
          cart={cart}
          onAddToCart={handleAddToCart}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        {/* Local Pincode checker & delivery metrics */}
        <DeliveryInfo />

        {/* Testimonials dashboard and feedback forms */}
        <Testimonials
          testimonials={testimonials}
          onAddTestimonial={handleAddTestimonial}
        />

        {/* App promotion module */}
        <AppTeaser onTriggerGoldPopup={() => setGoldPopupOpen(true)} />

      </main>

      {/* Styled Footer details */}
      <Footer />

      {/* Floating Gold Membership early bird popup */}
      <GoldMembershipPopup isOpen={goldPopupOpen} setIsOpen={setGoldPopupOpen} />

      {/* Floating WhatsApp Quick Helpline */}
      <a
        href="https://wa.me/919815493338?text=Hello%20Flower%20Studio!%20I%20have%20a%20question%20about%20your%20flowers%20and%20deliveries."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40"
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
